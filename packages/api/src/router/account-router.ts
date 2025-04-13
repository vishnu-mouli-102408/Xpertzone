import {
  BAD_REQUEST,
  cloudinary,
  INTERNAL_SERVER_ERROR,
  logger,
  type UploadApiResponse,
} from "@repo/common";
import z, { OK } from "zod";

import { protectedProcedure } from "../trpc";

export const accountRouter = {
  uploadFileToCloudinary: protectedProcedure
    .input(z.object({ imageBase64: z.string() }))
    .mutation(async ({ input }) => {
      try {
        const { imageBase64 } = input;

        const matches = /^data:(image\/\w+);base64,(.+)$/.exec(imageBase64);
        if (!matches || matches.length !== 3) {
          return {
            message: "Invalid base64 image format",
            success: false,
            code: BAD_REQUEST,
          };
        }
        const _mimeType = matches[1]; // e.g., image/png
        const base64Data = matches[2]; // actual base64 content
        if (!base64Data) {
          throw new Error("Base64 data is undefined");
        }
        const buffer = Buffer.from(base64Data, "base64");

        const result = await new Promise<UploadApiResponse>(
          (resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "expert-link" },
              (error, result) => {
                if (error) {
                  logger.error(error, "Error uploading to Cloudinary:");
                  reject(
                    new Error(
                      error.message || "Error uploading file to Cloudinary"
                    )
                  );
                } else {
                  if (result) {
                    resolve(result);
                  } else {
                    reject(
                      new Error("Unknown error occurred while uploading file")
                    );
                  }
                }
              }
            );
            uploadStream.end(buffer);
          }
        );
        return {
          message: "File uploaded",
          success: true,
          data: result,
          code: OK,
        };
      } catch (error) {
        console.log(error, "Error uploading:");
        logger.error(error, "Error uploading:");
        return {
          message: "Upload failed",
          success: false,
          code: INTERNAL_SERVER_ERROR,
        };
      }
    }),
};
