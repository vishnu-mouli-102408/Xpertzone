import { INTERNAL_SERVER_ERROR, logger, NOT_FOUND, OK } from "@repo/common";
import { db } from "@repo/db";
import { z } from "zod";

import { protectedProcedure } from "../trpc";

export const expertRouter = {
  // Get Expert Analytics
  getExpertAnalytics: protectedProcedure
    .input(
      z
        .object({
          filter: z
            .object({
              type: z
                .enum(["7days", "30days", "90days", "thisyear"])
                .optional()
                .nullable(),
            })
            .optional(),
        })
        .optional()
    )
    .query(async ({ ctx, input }) => {
      try {
        const expertId = ctx.user.id;
        const { filter: { type = "7days" } = {} } = input ?? {};
        if (!expertId) {
          return {
            message: "User not found",
            success: false,
            data: null,
            code: NOT_FOUND,
          };
        }

        const dateRanges = {
          "7days": 7,
          "30days": 30,
          "90days": 90,
          thisyear: 365,
        };

        const days = dateRanges[type ?? "7days"] || 7;
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - days);

        logger.info({ startDate }, "START DATE");

        const prevStartDate = new Date(startDate);
        prevStartDate.setDate(prevStartDate.getDate() - days);

        logger.info({ prevStartDate }, "PREV START DATE");

        // Execute all database queries in parallel using Promise.all
        const [
          totalCalls,
          previousTotalCalls,
          avgRating,
          totalReviewsCount,
          avgCallDuration,
          previousAvgCallDuration,
          communicationActivity,
          messagesActivity,
          upcomingCalls,
          previousUpcomingCalls,
          recentCalls,
        ] = await Promise.allSettled([
          // SECTION 1: CALL ANALYTICS
          // Total calls
          db.call.count({
            where: {
              expertId,
              startedAt: { gte: startDate },
            },
          }),

          // Previous total calls
          db.call.count({
            where: {
              expertId,
              startedAt: { gte: prevStartDate },
            },
          }),

          // Average Reviews
          db.review.aggregate({
            _avg: { rating: true },
            where: {
              expertId,
              createdAt: { gte: startDate },
            },
          }),

          // Total Reviews Count
          db.review.count({
            where: {
              expertId,
              createdAt: { gte: startDate },
            },
          }),

          // Average call duration
          db.call.findMany({
            where: {
              expertId,
              status: "COMPLETED",
              startedAt: { gte: startDate },
              endedAt: { not: null },
            },
            select: {
              startedAt: true,
              endedAt: true,
              status: true,
              callType: true,
            },
          }),

          // Previous average call duration
          db.call.findMany({
            where: {
              expertId,
              status: "COMPLETED",
              startedAt: { gte: prevStartDate, lt: startDate },
              endedAt: { not: null },
            },
            select: {
              startedAt: true,
              endedAt: true,
              status: true,
              callType: true,
            },
          }),

          // SECTION 2: COMMUNICATION ACTIVITY (Calls per day)
          db.call.groupBy({
            by: ["startedAt", "callType"],
            where: {
              expertId,
              startedAt: { gte: startDate },
            },
            _count: {
              id: true,
            },
          }),

          db.message.groupBy({
            by: ["sentAt"],
            where: {
              OR: [{ senderId: expertId }, { receiverId: expertId }],
              sentAt: { gte: startDate },
            },
            _count: {
              id: true,
            },
          }),

          // SECTION 3: UPCOMING CALLS
          db.call.findMany({
            where: {
              expertId,
              status: "SCHEDULED",
              startedAt: { gte: new Date() },
            },
            select: {
              id: true,
              startedAt: true,
              endedAt: true,
              callType: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                  expertise: true,
                  profilePic: true,
                },
              },
            },
            orderBy: { startedAt: "asc" },
          }),

          // Previous upcoming calls
          db.call.count({
            where: {
              expertId,
              status: "SCHEDULED",
              startedAt: { gte: prevStartDate, lt: startDate },
            },
          }),

          // SECTION 4: RECENT CALL HISTORY
          db.call.findMany({
            where: {
              expertId,
            },
            select: {
              id: true,
              startedAt: true,
              endedAt: true,
              status: true,
              callType: true,
              user: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
            orderBy: { startedAt: "desc" },
            take: 5,
          }),
        ]);

        // Log results
        logger.info({ totalCalls }, "TOTAL CALLS");
        logger.info({ previousTotalCalls }, "PREVIOUS TOTAL CALLS");

        // Calculate derived metrics
        const totalUpcomingCalls =
          upcomingCalls.status === "fulfilled" ? upcomingCalls.value.length : 0;
        const avgCallDurationValue =
          avgCallDuration.status === "fulfilled"
            ? avgCallDuration.value.reduce((acc, call) => {
                if (
                  call.startedAt &&
                  call.endedAt &&
                  call.status === "COMPLETED"
                ) {
                  return (
                    acc + (call.endedAt.getTime() - call.startedAt.getTime())
                  );
                }
                return acc;
              }, 0) /
              (avgCallDuration.value.length || 1) /
              60000 // Convert milliseconds to minutes
            : 0;
        const previousAvgCallDurationValue =
          previousAvgCallDuration.status === "fulfilled"
            ? previousAvgCallDuration.value.reduce((acc, call) => {
                if (
                  call.startedAt &&
                  call.endedAt &&
                  call.status === "COMPLETED"
                ) {
                  return (
                    acc + (call.endedAt.getTime() - call.startedAt.getTime())
                  );
                }
                return acc;
              }, 0) /
              (previousAvgCallDuration.value.length || 1) /
              60000 // Convert milliseconds to minutes
            : 0;

        const callPercentageChange =
          previousTotalCalls.status === "fulfilled" &&
          totalCalls.status === "fulfilled"
            ? previousTotalCalls.value === 0
              ? 0
              : ((totalCalls.value - previousTotalCalls.value) /
                  previousTotalCalls.value) *
                100
            : 0;

        const callDurationPercentageChange =
          previousAvgCallDurationValue === 0
            ? 0
            : (((avgCallDurationValue || 0) -
                (previousAvgCallDurationValue || 0)) /
                (previousAvgCallDurationValue || 0)) *
              100;

        const upcomingCallsPercentageChange =
          previousUpcomingCalls.status === "fulfilled"
            ? previousUpcomingCalls.value === 0
              ? 0
              : ((totalUpcomingCalls - previousUpcomingCalls.value) /
                  previousUpcomingCalls.value) *
                100
            : 0;

        // Format activity by day
        const activityByDay: Record<
          string,
          { audio_calls: number; video_calls: number; text_messages: number }
        > = {};

        // 🟢 Process communication (audio/video calls)
        if (communicationActivity.status === "fulfilled") {
          communicationActivity.value.forEach((data) => {
            // if (!data.startedAt) return; // Ensure date exists
            const day = new Intl.DateTimeFormat("en-US", {
              weekday: "short",
            }).format(data.startedAt ?? new Date()); // Handle null case

            activityByDay[day] ??= {
              video_calls: 0,
              audio_calls: 0,
              text_messages: 0,
            };

            if (data.callType === "AUDIO")
              activityByDay[day].audio_calls += data._count.id;
            if (data.callType === "VIDEO")
              activityByDay[day].video_calls += data._count.id;
          });
        } else {
          logger.error(
            communicationActivity,
            "Error fetching communication activity"
          );
        }

        // 🟢 Process messages
        if (messagesActivity.status === "fulfilled") {
          messagesActivity.value.forEach((data) => {
            // if (!data.sentAt) return; // Ensure date exists
            const day = new Intl.DateTimeFormat("en-US", {
              weekday: "short",
            }).format(data.sentAt); // Convert to "Mon", "Tue", etc.

            activityByDay[day] ??= {
              video_calls: 0,
              audio_calls: 0,
              text_messages: 0,
            };

            activityByDay[day].text_messages += data._count.id;
          });
        } else {
          logger.error(
            { messagesActivity },
            "Error fetching messages activity"
          );
        }

        // 🟢 Convert object to array with required format
        const activityArray = Object.keys(activityByDay).map((day) => ({
          day, // "Mon", "Tue", etc.
          ...activityByDay[day],
        }));

        // Log additional information
        logger.info(callPercentageChange, "CALL PERCENTAGE CHANGE");
        logger.info(avgRating, "AVERAGE RATING");
        logger.info(totalReviewsCount, "TOTAL REVIEWS COUNT");
        logger.info(avgCallDurationValue, "AVG CALL DURATION VALUE");
        logger.info(
          callDurationPercentageChange,
          "CALL DURATION PERCENTAGE CHANGE"
        );
        logger.info(activityByDay, "ACTIVITY BY DAY");
        logger.info(activityArray, "ACTIVITY ARRAY");
        logger.info(totalUpcomingCalls, "TOTAL UPCOMING CALLS");
        logger.info(
          upcomingCallsPercentageChange,
          "UPCOMING CALLS PERCENTAGE CHANGE"
        );

        return {
          message: "Expert analytics fetched successfully",
          success: true,
          code: OK,
          data: {
            analytics: {
              totalCalls: {
                totalCalls:
                  totalCalls.status === "fulfilled" ? totalCalls.value : 0,
                callPercentageChange: callPercentageChange,
              },
              ratings: {
                avgRating:
                  avgRating.status === "fulfilled"
                    ? avgRating.value._avg.rating
                    : 0,
                totalReviewsCount:
                  totalReviewsCount.status === "fulfilled"
                    ? totalReviewsCount.value
                    : 0,
              },
              averageCallDuration: {
                avgCallDurationValue,
                callDurationPercentageChange,
              },
              upcomingCalls: {
                totalUpcomingCalls,
                upcomingCallsPercentageChange,
              },
            },
            activityArray,
            upcomingCalls:
              upcomingCalls.status === "fulfilled" ? upcomingCalls.value : [],
            recentCalls:
              recentCalls.status === "fulfilled" ? recentCalls.value : [],
          },
        };
      } catch (error) {
        logger.error("Error fetching expert analytics", error);
        return {
          message: "Internal server error",
          success: false,
          data: null,
          code: INTERNAL_SERVER_ERROR,
        };
      }
    }),
};
