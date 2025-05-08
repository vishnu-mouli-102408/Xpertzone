import { INTERNAL_SERVER_ERROR, logger, NOT_FOUND, OK } from "@repo/common";
import { CallStatus, CallType, db } from "@repo/db";
import z from "zod";

import { protectedProcedure } from "../trpc";

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
        const { expertId, callType, scheduledAt } = input;
        const call = await db.call.create({
          data: {
            userId: ctx.user.id,
            expertId,
            callType,
            startedAt: scheduledAt,
            status: "SCHEDULED",
          },
        });

        return {
          message: "Call scheduled successfully",
          success: true,
          code: OK,
          data: call,
        };
      } catch (error) {
        logger.error("Error scheduling call", error);
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
        logger.error("Error starting call", error);
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
        logger.error("Error ending call", error);
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
        logger.error("Error updating call status", error);
        return {
          message: "Internal server error",
          success: false,
          data: null,
          code: INTERNAL_SERVER_ERROR,
        };
      }
    }),
};
