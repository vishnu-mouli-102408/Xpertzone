import {
  EMAIL_QUEUE_NAME,
  getRedisClient,
  INTERNAL_SERVER_ERROR,
  logger,
  NOT_ACCEPTABLE,
  NOT_FOUND,
  OK,
} from "@repo/common";
import { CallStatus, CallType, db, type Plan } from "@repo/db";
import { format } from "date-fns";
import z from "zod";

import { protectedProcedure } from "../trpc";

// Helper function to get quota limits based on plan
const getQuotaLimits = (plan: Plan) => {
  switch (plan) {
    case "FREE":
      return 50;
    case "PRO":
      return 150;
    default:
      return 50;
  }
};

export const callRouter = {
  scheduleCall: protectedProcedure
    .input(
      z.object({
        expertId: z.string(),
        callType: z.nativeEnum(CallType),
        scheduledAt: z.date(), // initially stored in startedAt
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const redis = getRedisClient();
        const { expertId, callType, scheduledAt } = input;

        // Check if the scheduled time is in the future
        if (scheduledAt <= new Date()) {
          return {
            message: "Cannot schedule call in the past",
            success: false,
            data: null,
            code: NOT_ACCEPTABLE,
          };
        }

        // Get user's current plan and quota
        const user = await db.user.findUnique({
          where: { id: ctx.user.id },
          include: {
            Quota: {
              where: {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
              },
            },
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

        // Get quota limits based on plan
        const quotaLimit = getQuotaLimits(user.plan ?? "FREE");

        // Get current quota usage
        const currentQuota = user.Quota[0]?.count ?? 0;

        console.log("currentQuota", currentQuota);
        console.log("quotaLimit", quotaLimit);

        // Check if user has exceeded their quota
        if (currentQuota >= quotaLimit) {
          return {
            message: `You have reached your monthly call limit of ${quotaLimit} calls. Please upgrade your plan for more calls.`,
            success: false,
            data: null,
            code: NOT_ACCEPTABLE,
          };
        }

        // Calculate one hour before and after the scheduled time
        const oneHourBefore = new Date(scheduledAt.getTime() - 60 * 60 * 1000);
        const oneHourAfter = new Date(scheduledAt.getTime() + 60 * 60 * 1000);

        // Check for existing calls in the time slot
        const existingCalls = await db.call.findMany({
          where: {
            expertId,
            startedAt: {
              gte: oneHourBefore,
              lte: oneHourAfter,
            },
            status: {
              in: ["SCHEDULED", "ONGOING"],
            },
          },
        });

        if (existingCalls.length > 0) {
          return {
            message:
              "Time slot is not available. Please choose a different time with at least 1 hour gap between calls.",
            success: false,
            data: null,
            code: NOT_ACCEPTABLE,
          };
        }

        // Create the call if time slot is available
        const call = await db.call.create({
          data: {
            userId: ctx.user.id,
            expertId,
            callType,
            roomId: crypto.randomUUID(),
            startedAt: scheduledAt,
            endedAt: new Date(scheduledAt.getTime() + 60 * 60 * 1000),
            status: "SCHEDULED",
          },
        });

        // Update or create quota record
        await db.quota.upsert({
          where: {
            userId_year_month: {
              userId: ctx.user.id,
              year: new Date().getFullYear(),
              month: new Date().getMonth() + 1,
            },
          },
          create: {
            userId: ctx.user.id,
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            count: 1,
          },
          update: {
            count: {
              increment: 1,
            },
          },
        });

        const expert = await db.user.findUnique({
          where: {
            id: expertId,
          },
        });

        await redis.lpush(
          EMAIL_QUEUE_NAME,
          JSON.stringify({
            userName: `${ctx.user.firstName} ${ctx.user.lastName}`,
            expertName: `${expert?.firstName} ${expert?.lastName}`,
            date: format(scheduledAt, "dd MMMM yyyy"), // 11 May 2025
            time: format(scheduledAt, "HH:mm"), // 10:00 AM
            duration: "One hour",
            callLink: `${process.env.NEXT_PUBLIC_APP_URL}/room/${call.roomId}`,
            userEmail: ctx.user.email,
            expertEmail: expert?.email,
            subject: "Schedule Call",
            type: "schedule-call",
          })
        );

        return {
          message: "Call scheduled successfully",
          success: true,
          code: OK,
          data: call,
        };
      } catch (error) {
        logger.error(error, "Error scheduling call");
        return {
          message: "Internal server error",
          success: false,
          data: null,
          code: INTERNAL_SERVER_ERROR,
        };
      }
    }),
  startCall: protectedProcedure
    .input(
      z.object({
        callId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { callId } = input;
        const call = await db.call.update({
          where: { id: callId },
          data: { status: "ONGOING" },
        });

        return {
          message: "Call started successfully",
          success: true,
          code: OK,
          data: call,
        };
      } catch (error) {
        logger.error(error, "Error starting call");
        return {
          message: "Internal server error",
          success: false,
          data: null,
          code: INTERNAL_SERVER_ERROR,
        };
      }
    }),
  endCall: protectedProcedure
    .input(
      z.object({
        callId: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { callId } = input;
        const call = await db.call.findUnique({
          where: { id: callId },
        });
        if (!call?.startedAt) {
          return {
            message: "Call not found",
            success: false,
            data: null,
            code: NOT_FOUND,
          };
        }
        const endedAt = new Date();
        const duration = endedAt.getTime() - call.startedAt.getTime();
        const callDuration = duration / 60000;
        await db.call.update({
          where: { id: callId },
          data: { endedAt, status: "COMPLETED" },
        });
        return {
          message: "Call ended successfully",
          success: true,
          data: {
            callDuration,
            call,
          },
          code: OK,
        };
      } catch (error) {
        logger.error(error, "Error ending call");
        return {
          message: "Internal server error",
          success: false,
          data: null,
          code: INTERNAL_SERVER_ERROR,
        };
      }
    }),
  updateStatus: protectedProcedure
    .input(
      z.object({
        callId: z.string(),
        status: z.nativeEnum(CallStatus),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const { callId, status } = input;
        const call = await db.call.update({
          where: { id: callId },
          data: { status },
        });
        return {
          message: "Call status updated successfully",
          success: true,
          data: call,
          code: OK,
        };
      } catch (error) {
        logger.error(error, "Error updating call status");
        return {
          message: "Internal server error",
          success: false,
          data: null,
          code: INTERNAL_SERVER_ERROR,
        };
      }
    }),
  getAllUserCalls: protectedProcedure
    .input(
      z.object({
        status: z.enum(["UPCOMING", "COMPLETED"]),
        type: z.nativeEnum(CallType).optional(),
        cursor: z.string().optional(),
        limit: z.number().int().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const { status, type, cursor, limit = 10 } = input;
        const [total, calls] = await Promise.all([
          db.call.count({
            where: {
              userId: ctx.user.id,
              ...(status === "UPCOMING"
                ? {
                    status: CallStatus.SCHEDULED,
                    endedAt: { gte: new Date() },
                  }
                : {
                    OR: [
                      { status: CallStatus.COMPLETED },
                      {
                        status: CallStatus.SCHEDULED,
                        endedAt: { lt: new Date() },
                      },
                    ],
                  }),
              ...(type && { callType: type }),
            },
          }),
          db.call.findMany({
            where: {
              userId: ctx.user.id,
              ...(status === "UPCOMING"
                ? {
                    status: CallStatus.SCHEDULED,
                    endedAt: { gte: new Date() },
                  }
                : {
                    OR: [
                      { status: CallStatus.COMPLETED },
                      {
                        status: CallStatus.SCHEDULED,
                        endedAt: { lt: new Date() },
                      },
                    ],
                  }),
              ...(type && { callType: type }),
            },
            cursor: cursor ? { id: cursor } : undefined,
            take: limit + 1,
            orderBy: { startedAt: "desc" },
            include: {
              expert: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  profilePic: true,
                  expertise: true,
                },
              },
            },
          }),
        ]);

        const hasNextPage = calls.length > limit;
        const nextCursor =
          hasNextPage && calls.length > 0 ? calls[calls.length - 1]?.id : null;

        const callsToReturn = hasNextPage ? calls.slice(0, -1) : calls;
        return {
          message: "Calls fetched successfully",
          success: true,
          data: {
            totalCalls: total,
            calls: callsToReturn,
            nextCursor,
            totalPages: Math.ceil(total / (limit || 10)),
          },
          code: OK,
        };
      } catch (error) {
        logger.error(error, "Error fetching calls");
        return {
          message: "Internal server error",
          success: false,
          data: null,
          code: INTERNAL_SERVER_ERROR,
        };
      }
    }),
  getAllExpertCalls: protectedProcedure
    .input(
      z.object({
        status: z.enum(["UPCOMING", "COMPLETED"]),
        type: z.nativeEnum(CallType).optional(),
        cursor: z.string().optional(),
        limit: z.number().int().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      try {
        const { status, type, cursor, limit = 10 } = input;
        const [total, calls] = await Promise.all([
          db.call.count({
            where: {
              expertId: ctx.user.id,
              ...(status === "UPCOMING"
                ? {
                    status: CallStatus.SCHEDULED,
                    endedAt: { gte: new Date() },
                  }
                : {
                    OR: [
                      { status: CallStatus.COMPLETED },
                      {
                        status: CallStatus.SCHEDULED,
                        endedAt: { lt: new Date() },
                      },
                    ],
                  }),
              ...(type && { callType: type }),
            },
          }),
          db.call.findMany({
            where: {
              expertId: ctx.user.id,
              ...(status === "UPCOMING"
                ? {
                    status: CallStatus.SCHEDULED,
                    endedAt: { gte: new Date() },
                  }
                : {
                    OR: [
                      { status: CallStatus.COMPLETED },
                      {
                        status: CallStatus.SCHEDULED,
                        endedAt: { lt: new Date() },
                      },
                    ],
                  }),
              ...(type && { callType: type }),
            },
            cursor: cursor ? { id: cursor } : undefined,
            take: limit + 1,
            orderBy: { startedAt: "desc" },
            include: {
              user: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  profilePic: true,
                  expertise: true,
                },
              },
            },
          }),
        ]);

        const hasNextPage = calls.length > limit;
        const nextCursor =
          hasNextPage && calls.length > 0 ? calls[calls.length - 1]?.id : null;

        const callsToReturn = hasNextPage ? calls.slice(0, -1) : calls;
        return {
          message: "Calls fetched successfully",
          success: true,
          data: {
            totalCalls: total,
            calls: callsToReturn,
            nextCursor,
            totalPages: Math.ceil(total / (limit || 10)),
          },
          code: OK,
        };
      } catch (error) {
        logger.error(error, "Error fetching calls");
        return {
          message: "Internal server error",
          success: false,
          data: null,
          code: INTERNAL_SERVER_ERROR,
        };
      }
    }),
  getCallById: protectedProcedure
    .input(z.object({ roomId: z.string() }))
    .query(async ({ input }) => {
      try {
        const { roomId } = input;
        const call = await db.call.findFirst({
          where: {
            roomId,
          },
          include: {
            expert: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profilePic: true,
              },
            },
            user: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profilePic: true,
              },
            },
          },
        });
        if (!call) {
          return {
            message: "Call not found",
            success: false,
            data: null,
            code: NOT_FOUND,
          };
        }
        return {
          message: "Call fetched successfully",
          success: true,
          data: call,
          code: OK,
        };
      } catch (error) {
        logger.error(error, "Error fetching calls");
        return {
          message: "Internal server error",
          success: false,
          data: null,
          code: INTERNAL_SERVER_ERROR,
        };
      }
    }),
};
