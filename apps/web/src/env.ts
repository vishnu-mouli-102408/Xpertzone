import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

const env = createEnv({
  shared: {
    NODE_ENV: z
      .enum(["development", "production", "test"])
      .default("development"),
    VERCEL_URL: z.string().min(1).optional(),
    PORT: z.coerce.number().default(3000).optional(),
  },

  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    DATABASE_URL: z
      .string()
      .url({ message: "Invalid database URL" })
      .min(1, { message: "DATABASE_URL is required" }),
    CLERK_SECRET_KEY: z.string().min(1),
    SIGNING_SECRET: z.string().min(1),
    STRIPE_WEBHOOK_SECRET: z.string().min(1),
    RESEND_API_KEY: z.string().min(1),
    CACHE_EXPIRE: z.coerce.number().default(1800),
    REDIS_URL: z.string().min(1),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL: z.string().min(1),
    NEXT_PUBLIC_APP_URL: z.string(),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string().min(1),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string().min(1),
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME: z.string().min(1),
    NEXT_PUBLIC_CLOUDINARY_API_KEY: z.string().min(1),
    NEXT_PUBLIC_CLOUDINARY_API_SECRET: z.string().min(1),
    NEXT_PUBLIC_CLOUDINARY_URL: z.string().min(1),
    NEXT_PUBLIC_STRIPE_SECRET_KEY: z.string().min(1),
    NEXT_PUBLIC_PRO_PLAN_PRICE_ID: z.string().min(1),
    NEXT_PUBLIC_ENTERPRISE_PLAN_PRICE_ID: z.string().min(1),
    NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL: z.string().min(1),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    NEXT_PUBLIC_ENTERPRISE_PLAN_PRICE_ID:
      process.env.NEXT_PUBLIC_ENTERPRISE_PLAN_PRICE_ID,
    NEXT_PUBLIC_PRO_PLAN_PRICE_ID: process.env.NEXT_PUBLIC_PRO_PLAN_PRICE_ID,
    DATABASE_URL: process.env.DATABASE_URL,
    REDIS_URL: process.env.REDIS_URL,
    CACHE_EXPIRE: process.env.CACHE_EXPIRE,
    NEXT_PUBLIC_CLOUDINARY_API_KEY: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    NEXT_PUBLIC_CLOUDINARY_API_SECRET:
      process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
    NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME:
      process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    NEXT_PUBLIC_CLOUDINARY_URL: process.env.NEXT_PUBLIC_CLOUDINARY_URL,
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    VERCEL_URL: process.env.VERCEL_URL,
    SIGNING_SECRET: process.env.SIGNING_SECRET,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL:
      process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL:
      process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL,
    NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL:
      process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_STRIPE_SECRET_KEY: process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY,
    NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL:
      process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL,
  },

  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation:
    !!process.env.CI || process.env.npm_lifecycle_event === "lint",
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});

export default env;

export type Environment = typeof env;
