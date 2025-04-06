import { currentUser } from "@clerk/nextjs/server";
import { db } from "@repo/db";
// import { getAuth } from "@hono/clerk-auth"; // needed for cloudflare deployement
import { HTTPException } from "hono/http-exception";
import { jstack } from "jstack";

import type { Environment } from "../env";
import { logger } from "../lib/logger";

export interface Env {
  Bindings: Environment;
}

export const j = jstack.init<Env>();

/**
 * Public (unauthenticated) procedures
 *
 * This is the base piece you use to build new queries and mutations on your API.
 */

const authMiddleware = j.middleware(async ({ c, next }) => {
  const auth = await currentUser();
  //   const auth = getAuth(c); // needed for cloudflare deployement

  // needed for cloudflare deployement
  //   if (!auth || !auth.userId) {
  //     throw new HTTPException(401, { message: "Unauthorized" });
  //   }

  if (!auth) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  const user = await db.user.findUnique({
    // where: { externalId: auth.userId }, needed for cloudflare deployement
    where: { externalId: auth.id },
  });

  if (!user) {
    throw new HTTPException(401, { message: "Unauthorized" });
  }

  return next({ user });
});

const loggerMiddleware = j.middleware(async ({ c, next }) => {
  const start = Date.now();
  await next();
  const duration = Date.now() - start;

  logger.info({
    method: c.req.method,
    url: c.req.url,
    status: c.res.status,
    duration: `${duration}ms`,
  });
});

export const publicProcedure = j.procedure.use(loggerMiddleware);
export const privateProcedure = publicProcedure.use(authMiddleware);
