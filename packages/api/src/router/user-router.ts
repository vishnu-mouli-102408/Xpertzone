import { cache } from "@repo/cache";
import {
  INTERNAL_SERVER_ERROR,
  logger,
  NOT_ACCEPTABLE,
  NOT_FOUND,
  OK,
  type SearchExpertsResult,
} from "@repo/common";
import { db, type Prisma } from "@repo/db";
import { z } from "zod";

import { protectedProcedure } from "../trpc";

export const userRouter = {
  // Get user analytics
  getUserAnalytics: protectedProcedure
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
        const userId = ctx.user.id;
        const { filter: { type = "7days" } = {} } = input ?? {};
        if (!userId) {
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
          activeExperts,
          previousActiveExperts,
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
              userId,
              startedAt: { gte: startDate },
            },
          }),

          // Previous total calls
          db.call.count({
            where: {
              userId,
              startedAt: { gte: prevStartDate },
            },
          }),

          // Active experts (who had calls)
          db.call.groupBy({
            by: ["expertId"],
            where: {
              userId,
              startedAt: { gte: startDate },
            },
            _count: {
              expertId: true,
            },
          }),

          // Previous active experts
          db.call.groupBy({
            by: ["expertId"],
            where: {
              userId,
              startedAt: { gte: prevStartDate, lt: startDate },
            },
            _count: {
              expertId: true,
            },
          }),

          // Average call duration
          db.call.aggregate({
            _avg: { duration: true },
            where: {
              userId,
              startedAt: { gte: startDate },
            },
          }),

          // Previous average call duration
          db.call.aggregate({
            _avg: { duration: true },
            where: {
              userId,
              startedAt: { gte: prevStartDate, lt: startDate },
            },
          }),

          // SECTION 2: COMMUNICATION ACTIVITY (Calls per day)
          db.call.groupBy({
            by: ["startedAt", "callType"],
            where: {
              userId,
              startedAt: { gte: startDate },
            },
            _count: {
              id: true,
            },
          }),

          db.message.groupBy({
            by: ["sentAt"],
            where: {
              OR: [{ senderId: userId }, { receiverId: userId }],
              sentAt: { gte: startDate },
            },
            _count: {
              id: true,
            },
          }),

          // SECTION 3: UPCOMING CALLS
          db.scheduledCall.findMany({
            where: {
              userId,
              status: "CONFIRMED",
              scheduledAt: { gte: new Date() },
            },
            select: {
              id: true,
              scheduledAt: true,
              callType: true,
              duration: true,
              expert: {
                select: {
                  firstName: true,
                  lastName: true,
                  expertise: true,
                  profilePic: true,
                },
              },
            },
            orderBy: { scheduledAt: "asc" },
          }),

          // Previous upcoming calls
          db.scheduledCall.count({
            where: {
              userId,
              status: "CONFIRMED",
              scheduledAt: { gte: prevStartDate, lt: startDate },
            },
          }),

          // SECTION 4: RECENT CALL HISTORY
          db.call.findMany({
            where: {
              userId,
            },
            select: {
              id: true,
              startedAt: true,
              duration: true,
              status: true,
              callType: true,
              expert: {
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
        const totalActiveExperts =
          activeExperts.status === "fulfilled" ? activeExperts.value.length : 0;
        const prevTotalActiveExperts =
          previousActiveExperts.status === "fulfilled"
            ? previousActiveExperts.value.length
            : 0;
        const totalUpcomingCalls =
          upcomingCalls.status === "fulfilled" ? upcomingCalls.value.length : 0;
        const avgCallDurationValue =
          avgCallDuration.status === "fulfilled"
            ? (avgCallDuration.value._avg.duration ?? 0)
            : 0;
        const previousAvgCallDurationValue =
          previousAvgCallDuration.status === "fulfilled"
            ? (previousAvgCallDuration.value._avg.duration ?? 0)
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

        const expertPercentageChange =
          prevTotalActiveExperts === 0
            ? 0
            : ((totalActiveExperts - prevTotalActiveExperts) /
                prevTotalActiveExperts) *
              100;

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
            }).format(data.startedAt); // Convert to "Mon", "Tue", etc.

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
            { communicationActivity },
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
        logger.info({ callPercentageChange }, "CALL PERCENTAGE CHANGE");
        logger.info({ totalActiveExperts }, "TOTAL ACTIVE EXPERTS");
        logger.info({ expertPercentageChange }, "EXPERT PERCENTAGE CHANGE");
        logger.info({ avgCallDurationValue }, "AVG CALL DURATION VALUE");
        logger.info(
          { callDurationPercentageChange },
          "CALL DURATION PERCENTAGE CHANGE"
        );
        logger.info({ activityByDay }, "ACTIVITY BY DAY");
        logger.info({ activityArray }, "ACTIVITY ARRAY");
        logger.info({ totalUpcomingCalls }, "TOTAL UPCOMING CALLS");
        logger.info(
          { upcomingCallsPercentageChange },
          "UPCOMING CALLS PERCENTAGE CHANGE"
        );

        return {
          message: "User analytics fetched successfully",
          success: true,
          code: OK,
          data: {
            analytics: {
              totalCalls: {
                totalCalls:
                  totalCalls.status === "fulfilled" ? totalCalls.value : 0,
                callPercentageChange: callPercentageChange,
              },
              activeExperts: {
                totalActiveExperts,
                expertPercentageChange,
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
        logger.error("Error fetching user analytics", error);
        return {
          message: "Internal server error",
          success: false,
          data: null,
          code: INTERNAL_SERVER_ERROR,
        };
      }
    }),

  // Get all experts
  getAllExperts: protectedProcedure
    .input(
      z
        .object({
          cursor: z.string().optional(),
          limit: z.number().int().optional(),
          search: z.string().optional(),
        })
        .optional()
    )
    .query(async ({ input }) => {
      try {
        const { limit = 10, search = "", cursor } = input ?? {};

        logger.info({ limit, search, cursor }, "Query parameters");

        let whereCondition = {};
        if (search.trim() !== "") {
          whereCondition = {
            OR: [
              { firstName: { contains: search, mode: "insensitive" } },
              { lastName: { contains: search, mode: "insensitive" } },
              { expertise: { contains: search, mode: "insensitive" } },
              { username: { contains: search, mode: "insensitive" } },
              { email: { contains: search, mode: "insensitive" } },
            ],
          };
        }

        const [total, experts] = await Promise.all([
          db.user.count({ where: { ...whereCondition, role: "EXPERT" } }),
          db.user.findMany({
            where: {
              ...whereCondition,
              role: "EXPERT",
            },
            cursor: cursor ? { id: cursor } : undefined,
            take: limit + 1,
            orderBy: { createdAt: "desc" },
            include: {
              reviewsReceived: true,
            },
          }),
        ]);

        // logger.info(experts, "Experts Data");

        const hasNextPage = experts.length > limit;
        const nextCursor =
          hasNextPage && experts.length > 0
            ? experts[experts.length - 1]?.id
            : null;

        const expertsToReturn = hasNextPage ? experts.slice(0, -1) : experts;

        const expertsWithAvgRating = expertsToReturn.map((expert) => {
          const totalRatings = expert.reviewsReceived.reduce(
            (sum, review) => sum + review.rating,
            0
          );
          const avgRating =
            expert.reviewsReceived.length > 0
              ? totalRatings / expert.reviewsReceived.length
              : 0;
          return {
            ...expert,
            avgRating,
            totalReviews: expert.reviewsReceived.length,
          };
        });

        return {
          message: "Experts fetched successfully",
          success: true,
          data: {
            totalExperts: total,
            experts: expertsWithAvgRating,
            nextCursor,
            totalPages: Math.ceil(total / (limit || 10)),
          },
          code: OK,
        };
      } catch (error) {
        logger.error(error, "Error fetching experts");
        return {
          message: "Internal server error",
          success: false,
          data: null,
          code: INTERNAL_SERVER_ERROR,
        };
      }
    }),

  // Get expert by ID
  getExpertById: protectedProcedure
    .input(
      z.object({
        expertId: z.string(),
      })
    )
    .query(async ({ input }) => {
      try {
        const { expertId } = input;
        logger.info({ expertId }, "Expert ID");
        if (!expertId) {
          return {
            message: "Expert ID is required",
            success: false,
            data: null,
            code: NOT_FOUND,
          };
        }
        // Fetch expert by ID
        const expert = await db.user.findUnique({
          where: {
            id: expertId,
          },
        });

        logger.info(expert, "Expert Data");

        if (!expert) {
          return {
            message: "Expert not found",
            success: false,
            data: null,
            code: NOT_FOUND,
          };
        }

        // Fetch expert reviews and average rating
        const expertReviews = await db.review.findMany({
          where: {
            expertId: expertId,
          },
          select: {
            comment: true,
            createdAt: true,
            expertId: true,
            id: true,
            rating: true,
            userId: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                profilePic: true,
              },
            },
          },
        });

        logger.info(expertReviews, "Expert Reviews");

        // Only run aggregate query if there are reviews
        let rating = 0;
        if (expertReviews.length > 0) {
          const averageRating = await db.review.aggregate({
            where: { expertId: expertId },
            _avg: { rating: true },
          });
          rating = averageRating._avg.rating ?? 0;
          logger.info(averageRating, "Average");
        }

        return {
          message: "Expert fetched successfully",
          success: true,
          data: {
            expert,
            averageRating: rating,
            reviews: expertReviews,
          },
          code: OK,
        };
      } catch (error) {
        logger.error(error, "Error fetching expert by ID");
        return {
          message: "Internal server error",
          success: false,
          data: null,
          code: INTERNAL_SERVER_ERROR,
        };
      }
    }),

  // Get expert reviews
  getExpertReviews: protectedProcedure
    .input(
      z.object({
        expertId: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { expertId } = input;
      logger.info({ expertId }, "Expert ID");
      if (!expertId) {
        return {
          message: "Expert ID is required",
          success: false,
          data: null,
          code: NOT_FOUND,
        };
      }

      const expertReviews = await db.review.findMany({
        where: {
          expertId: expertId,
        },
      });

      return {
        message: "Expert reviews fetched successfully",
        success: true,
        data: expertReviews,
        code: OK,
      };
    }),

  // Write a review for an expert
  writeReviewForExpert: protectedProcedure
    .input(
      z.object({
        expertId: z.string(),
        rating: z.number().int().min(1).max(5),
        reviewText: z.string().max(500),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { expertId, rating, reviewText } = input;
      const userId = ctx.user.id;
      logger.info({ expertId, rating, reviewText }, "Review Data");
      if (!expertId || !rating || !reviewText) {
        return {
          message: "Expert ID, rating, and review text are required",
          success: false,
          data: null,
          code: NOT_FOUND,
        };
      }

      // Check if user has already reviewed the expert
      const existingReview = await db.review.findFirst({
        where: {
          expertId,
          userId,
        },
      });

      if (existingReview) {
        return {
          message: "You have already reviewed this expert",
          success: false,
          data: null,
          code: NOT_ACCEPTABLE,
        };
      }

      // Create a new review
      const newReview = await db.review.create({
        data: {
          rating,
          comment: reviewText,
          expertId,
          userId,
        },
      });

      await cache.evictAllByPrefix("search-results");

      return {
        message: "Review submitted successfully",
        success: true,
        data: newReview,
        code: OK,
      };
    }),

  // Search Experts
  searchExperts: protectedProcedure
    .input(
      z.object({
        query: z.string().optional(),
        expertise: z.string().optional(),
        skills: z.array(z.string()).optional(),
        // minRate: z.number().optional(),
        // maxRate: z.number().optional(),
        page: z.number().default(1),
        limit: z.number().default(10),
      })
    )
    .query(async ({ input }) => {
      try {
        const {
          limit,
          page,
          expertise,
          //  maxRate, minRate,
          query,
          skills,
        } = input;

        logger.info(input, "Search Experts Input");

        // Try to get from  cache first (faster)
        const cachedResults = await cache.get<SearchExpertsResult>(
          "search-results",
          [JSON.stringify(input)]
        );
        logger.info(cachedResults, "Cached Results");
        if (cachedResults) {
          logger.info(cachedResults, "Cache hit, returning cached results");
          return {
            message: "Experts fetched successfully",
            success: true,
            data: cachedResults,
            code: OK,
          };
        }

        console.log("Cached results not found, fetching from database");

        const where: Prisma.UserWhereInput = {
          role: "EXPERT",
        };

        if (query) {
          where.OR = [
            { firstName: { contains: query, mode: "insensitive" } },
            { lastName: { contains: query, mode: "insensitive" } },
            { expertise: { contains: query, mode: "insensitive" } },
            { username: { contains: query, mode: "insensitive" } },
            { email: { contains: query, mode: "insensitive" } },
          ];
        }

        if (expertise) {
          if (expertise.toLowerCase() === "all") {
            where.expertise = {
              not: null,
            };
          } else {
            where.expertise = {
              contains: expertise,
              mode: "insensitive",
            };
          }
        }

        if (skills && skills.length > 0) {
          where.skills = {
            hasSome: skills,
          };
        }

        // if (minRate || maxRate) {
        //   where.hourlyRate = {};

        //   if (minRate) {
        //     // Convert string hourlyRate to number for comparison
        //     where.hourlyRate.gte = minRate.toString();
        //   }

        //   if (maxRate) {
        //     where.hourlyRate.lte = maxRate.toString();
        //   }
        // }

        const offset = (page - 1) * limit;

        // console.log("WHERE", where);

        const [experts, totalCount] = await Promise.all([
          db.user
            .findMany({
              where,
              select: {
                id: true,
                firstName: true,
                lastName: true,
                expertise: true,
                bio: true,
                profilePic: true,
                hourlyRate: true,
                skills: true,
                yearsOfExperience: true,
                certifications: true,
                availability: true,
              },
              skip: offset,
              take: limit,
              orderBy: {
                updatedAt: "desc",
              },
            })
            .then(async (users) => {
              return Promise.all(
                users.map(async (user) => {
                  //   logger.info({ user }, "USER");

                  const avgRating = await db.review.aggregate({
                    where: { expertId: user.id },
                    _avg: { rating: true },
                  });

                  //   logger.info({ avgRating }, "Average Rating");

                  // Fetch count of reviews received
                  const reviewCount = await db.review.count({
                    where: { expertId: user.id },
                  });

                  //   logger.info({ reviewCount }, "Review Count");

                  return {
                    ...user,
                    averageRating: avgRating._avg.rating ?? 0, // Default 0 if no ratings
                    reviewCount, // Total reviews received
                  };
                })
              );
            }),
          db.user.count({ where }),
        ]);

        const result = {
          experts,
          totalCount: totalCount,
          currentPage: page,
          totalPages: Math.ceil(totalCount / limit),
          pageSize: limit,
        };

        logger.info({ totalCount }, "Search Experts Result Found");
        logger.info(experts, "Search Experts Result Found");

        // Store in memory cache
        await cache.set("search-results", [JSON.stringify(input)], result);

        return {
          success: true,
          message: "Experts fetched successfully",
          data: result,
          code: OK,
        };
      } catch (error) {
        logger.error(error, "Error fetching experts");
        return {
          message: "Internal server error",
          success: false,
          data: null,
          code: INTERNAL_SERVER_ERROR,
        };
      }
    }),

  // Upsert User Quota
  upsertUserQuota: protectedProcedure.mutation(async ({ ctx }) => {
    try {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      const { user } = ctx;

      const data = await db.quota.upsert({
        where: { userId: user.id, month: currentMonth, year: currentYear },
        update: { count: { increment: 1 } },
        create: {
          userId: user.id,
          month: currentMonth,
          year: currentYear,
          count: 1,
        },
      });

      return {
        message: "User quota upserted successfully",
        success: true,
        data: data,
        code: OK,
      };
    } catch (error) {
      logger.error(error, "Error upserting user quota");
      return {
        message: "Internal server error",
        success: false,
        data: null,
        code: INTERNAL_SERVER_ERROR,
      };
    }
  }),

  getUserQuota: protectedProcedure.query(async ({ ctx }) => {
    try {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();
      const { user } = ctx;

      let data = await db.quota.findFirst({
        where: { userId: user.id, month: currentMonth, year: currentYear },
      });

      data ??= await db.quota.create({
        data: {
          userId: user.id,
          month: currentMonth,
          year: currentYear,
          count: 0,
        },
      });

      logger.info(data, "User Quota Data");

      return {
        message: "User quota fetched successfully",
        success: true,
        data: data,
        code: OK,
      };
    } catch (error) {
      logger.error(error, "Error fetching user quota");
      return {
        message: "Internal server error",
        success: false,
        data: null,
        code: INTERNAL_SERVER_ERROR,
      };
    }
  }),
  getAllChats: protectedProcedure
    .input(
      z
        .object({
          cursor: z.string().optional(),
          limit: z.number().int().optional(),
        })
        .optional()
    )
    .query(async ({ input, ctx }) => {
      try {
        const { limit = 10, cursor } = input ?? {};

        // Step 1: Fetch all distinct chat partners
        const messages = await db.message.findMany({
          where: {
            OR: [{ senderId: ctx.user.id }, { receiverId: ctx.user.id }],
          },
          select: {
            senderId: true,
            receiverId: true,
            sentAt: true,
          },
        });

        // Step 2: Collect unique chat partner IDs
        const uniquePartnerMap = new Map<string, Date>();

        for (const msg of messages) {
          const otherUserId =
            msg.senderId === ctx.user.id ? msg.receiverId : msg.senderId;

          const existingDate = uniquePartnerMap.get(otherUserId);
          if (!existingDate || msg.sentAt > existingDate) {
            uniquePartnerMap.set(otherUserId, msg.sentAt);
          }
        }

        // Step 3: Convert to array and sort by latest date
        const sortedPartners = Array.from(uniquePartnerMap.entries()).sort(
          (a, b) => b[1].getTime() - a[1].getTime()
        );

        // Step 4: Apply cursor-based pagination
        const startIndex = cursor
          ? sortedPartners.findIndex(([id]) => id === cursor) + 1
          : 0;

        const paginatedPartners = sortedPartners.slice(
          startIndex,
          startIndex + limit + 1
        );
        const hasNextPage = paginatedPartners.length > limit;
        const finalPartners = hasNextPage
          ? paginatedPartners.slice(0, -1)
          : paginatedPartners;
        const nextCursor = hasNextPage
          ? (finalPartners?.[finalPartners.length - 1]?.[0] ?? null)
          : null;

        // Step 5: Fetch latest message for each partner
        const chats = await Promise.all(
          finalPartners.map(async ([partnerId]) => {
            const latestMessage = await db.message.findFirst({
              where: {
                OR: [
                  { senderId: ctx.user.id, receiverId: partnerId },
                  { senderId: partnerId, receiverId: ctx.user.id },
                ],
              },
              orderBy: { sentAt: "desc" },
              include: {
                sender: true,
                receiver: true,
              },
            });
            return latestMessage;
          })
        );

        logger.info(chats, "Fetched Chats");

        // console.log("CHATS", chats);

        return {
          message: "Chats fetched successfully",
          success: true,
          data: {
            totalChats: sortedPartners.length,
            chats,
            nextCursor,
            totalPages: Math.ceil(sortedPartners.length / limit),
          },
          code: OK,
        };
      } catch (error) {
        logger.error(error, "Error fetching chats");
        return {
          message: "Internal server error",
          success: false,
          data: null,
          code: INTERNAL_SERVER_ERROR,
        };
      }
    }),

  getChatsById: protectedProcedure
    .input(
      z.object({
        receiverId: z.string(),
        cursor: z.string().optional(),
        limit: z.number().int().optional(),
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        const { limit = 10, cursor } = input ?? {};
        const { receiverId } = input;

        logger.info(limit, cursor, receiverId, "Query parameters");

        if (!receiverId) {
          return {
            message: "Receiver ID is required",
            success: false,
            data: null,
            code: NOT_FOUND,
          };
        }

        const [total, chats] = await Promise.all([
          db.message.count({
            where: {
              senderId: ctx.user.id,
              receiverId,
            },
          }),
          db.message.findMany({
            where: {
              OR: [
                { senderId: ctx.user.id, receiverId },
                { senderId: receiverId, receiverId: ctx.user.id },
              ],
            },
            cursor: cursor ? { id: cursor } : undefined,
            take: limit + 1,
            orderBy: { sentAt: "desc" },
            include: {
              receiver: true,
            },
          }),
        ]);

        const hasNextPage = chats.length > limit;
        const nextCursor =
          hasNextPage && chats.length > 0 ? chats[chats.length - 1]?.id : null;

        const chatsToReturn = hasNextPage ? chats.slice(0, -1) : chats;

        return {
          message: "Chats fetched successfully",
          success: true,
          data: {
            totalChats: total,
            chats: chatsToReturn,
            nextCursor,
            totalPages: Math.ceil(total / (limit || 10)),
          },
          code: OK,
        };
      } catch (error) {
        logger.error(error, "Error fetching chats");
        return {
          message: "Internal server error",
          success: false,
          data: null,
          code: INTERNAL_SERVER_ERROR,
        };
      }
    }),
};
