import { v2 as cloudinary, type ConfigOptions } from "cloudinary";

import { env } from "./env";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
} satisfies ConfigOptions);

export * from "cloudinary";
export { cloudinary };
