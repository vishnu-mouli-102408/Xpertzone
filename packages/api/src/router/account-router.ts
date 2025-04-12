/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  cloudinary,
  INTERNAL_SERVER_ERROR,
  logger,
  NOT_FOUND,
  type UploadApiResponse,
} from "@repo/common";
import z, { OK } from "zod";

import { protectedProcedure } from "../trpc";

export const accountRouter = {
  uploadFileToCloudinary: protectedProcedure
    .input(z.instanceof(FormData))
    .mutation(async ({ input }) => {
      try {
        const formData = input;
        const file = formData.get("file") as File | null;
        if (!file) {
          return {
            message: "File Not Found",
            success: false,
            code: NOT_FOUND,
          };
        }
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const result = await new Promise<UploadApiResponse>(
          (resolve, reject) => {
            const uploadStream = cloudinary.uploader.upload_stream(
              { folder: "expert-link" },
              (error, result) => {
                if (error) {
                  reject(
                    new Error(
                      error instanceof Error ? error.message : String(error)
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
        logger.error("Error uploading to Cloudinary:", error);
        return {
          message: "Upload failed",
          success: false,
          code: INTERNAL_SERVER_ERROR,
        };
      }
    }),
};
