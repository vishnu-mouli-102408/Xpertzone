import { cache } from "@repo/cache";
import { INTERNAL_SERVER_ERROR, logger, NOT_FOUND, OK } from "@repo/common";
import { db } from "@repo/db";
import type { TRPCRouterRecord } from "@trpc/server";
import z from "zod";

import { PrismaClientKnownRequestError } from "../../../db/generated/client/runtime/library";
import { protectedProcedure } from "../trpc";

const UserSchema = z.object({
  email: z.string().email().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  phone: z.string().nullable().optional(),
  gender: z.string().nullable().optional(),
  username: z.string().optional(),
  bio: z.string().nullable().optional(),
  profilePic: z.string().nullable().optional(),
  expertise: z.string().nullable().optional(),
  certifications: z.string().nullable().optional(),
  yearsOfExperience: z.string().nullable().optional(),
  availability: z.string().nullable().optional(),
  hourlyRate: z.string().nullable().optional(),
  interests: z.string().nullable().optional(),
  preferences: z.string().nullable().optional(),
  skills: z
    .array(z.string())
    .default([])
    .refine((skills) => skills.length <= 5, {
      message: "You can add up to 5 skills only",
    })
    .optional(),
});

export const authRouter = {
  getUserDetails: protectedProcedure.query(async ({ ctx }) => {
    const user = await db.user.findFirst({
      where: {
        email: ctx.user.email,
      },
    });
    if (!user) {
      return {
        message: "User not found",
        success: false,
        data: null,
        code: NOT_FOUND,
      };
    }
    return {
      message: "User found",
      success: true,
      data: user,
      code: OK,
    };
  }),
  updateUserDetails: protectedProcedure
    .input(UserSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        logger.info({ input }, "Updating user details");

        // Check if the user exists
        const updatedUser = await db.user.update({
          where: {
            email: ctx.user.email,
            // externalId: ctx.user.id,
          },
          data: input,
        });

        await cache.evict("search-results", []);

        logger.info({ updatedUser }, "User updated successfully");
        return {
          message: "User Updated",
          success: true,
          data: updatedUser,
          code: OK,
        };
      } catch (error) {
        logger.error({ error }, "Error updating user details");
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === "P2025"
        ) {
          return {
            message: "User not found",
            success: false,
            data: null,
            code: NOT_FOUND,
          };
        }
        return {
          message: "Internal Server Error",
          success: false,
          error: error,
          code: INTERNAL_SERVER_ERROR,
        };
      }
    }),
} satisfies TRPCRouterRecord;
