import appRouter from "@/src/server";
import { handle } from "hono/vercel";

// needed for cloudflare deployement
// export const runtime = "edge";

// This route catches all incoming API requests and lets your appRouter handle them.
export const GET = handle(appRouter.handler);
export const POST = handle(appRouter.handler);
