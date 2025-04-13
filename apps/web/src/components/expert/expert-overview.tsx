"use client";

import { useState } from "react";
import { useTRPC } from "@/src/trpc/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@repo/ui/components/select";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  Phone,
  Sparkles,
  Star,
  TrendingUp,
  Video,
} from "lucide-react";
import { motion } from "motion/react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { fadeInUp, staggerContainer } from "src/lib/framer-animations";

import { User } from "../animations/user";
import OverviewSkeleton from "../user/overview-skeleton";

type Filter = "7days" | "30days" | "90days" | "thisyear";

const ExpertOverview = () => {
  const [filter, setFilter] = useState<Filter>("7days");
  const trpc = useTRPC();

  const { data, isPending } = useQuery(
    trpc.expert.getExpertAnalytics.queryOptions({
      filter: { type: filter },
    })
  );

  const recentCalls = data?.data?.recentCalls?.map((item) => ({
    id: item?.id,
    expert: `${item?.user?.firstName} ${item?.user?.lastName}`,
    type: item?.callType,
    date: format(item?.startedAt, "MMM dd, h:mm a"),
    duration: `${item?.duration} min`,
    status: item?.status,
  }));

  const upcomingCalls = data?.data?.upcomingCalls?.map((item) => ({
    id: item?.id,
    expert: `${item?.user?.firstName} ${item?.user?.lastName}`,
    type: item?.callType,
    date: format(item?.scheduledAt, "MMM dd, h:mm a"),
    duration: `${item?.duration} min`,
  }));

  const chatActivityData = data?.data?.activityArray?.map((item) => ({
    day: item.day,
    video: item.video_calls,
    messages: item.text_messages,
    audio: item.audio_calls,
  }));

  const analyticsData = [
    {
      title: "Total Calls",
      value: data?.data?.analytics?.totalCalls?.totalCalls ?? "0",
      icon: Phone,
      change: `${data?.data?.analytics?.totalCalls?.callPercentageChange || 0 >= 0 ? "+" : ""}${data?.data?.analytics?.totalCalls?.callPercentageChange ?? "N/A"}%`,
      color: "bg-[#6366f133]",
    },
    {
      title: "Avg. Reviews",
      value: data?.data?.analytics?.ratings?.avgRating ?? "0",
      icon: Sparkles,
      change: `${data?.data?.analytics?.ratings?.totalReviewsCount || 0 >= 0 ? "+" : ""}${data?.data?.analytics?.ratings?.totalReviewsCount ?? "N/A"}%`,
      color: "bg-[#10b98133]",
    },
    {
      title: "Avg. Call Duration",
      value:
        data?.data?.analytics?.averageCallDuration?.avgCallDurationValue ?? "0",
      icon: Clock,
      change: `${data?.data?.analytics?.averageCallDuration?.callDurationPercentageChange || 0 >= 0 ? "+" : ""}${data?.data?.analytics?.averageCallDuration?.callDurationPercentageChange ?? "N/A"}%`,
      color: "bg-[#f59e0b33]",
    },
    {
      title: "Upcoming Calls",
      value: data?.data?.analytics?.upcomingCalls?.totalUpcomingCalls ?? "0",
      icon: Calendar,
      change: `${data?.data?.analytics?.upcomingCalls?.upcomingCallsPercentageChange || 0 >= 0 ? "+" : ""}${data?.data?.analytics?.upcomingCalls?.upcomingCallsPercentageChange ?? "N/A"}%`,
      color: "bg-[#f43f5e33]",
    },
  ];

  if (isPending) {
    return <OverviewSkeleton />;
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <motion.h1
          variants={fadeInUp}
          className="text-xl font-bold text-white md:text-2xl"
        >
          Dashboard Overview
        </motion.h1>
        <motion.div variants={fadeInUp}>
          <Select
            onValueChange={(value) => setFilter(value as Filter)}
            value={filter}
          >
            <SelectTrigger className="cursor-pointer rounded-xl border-white/10 bg-white/5 px-4 text-gray-300 transition-all duration-300">
              <SelectValue placeholder="Select Filter" />
            </SelectTrigger>
            <SelectContent className="cursor-pointer bg-black">
              <SelectItem
                value="7days"
                className="cursor-pointer transition-colors duration-300 hover:bg-gray-500/40"
              >
                Last 7 days
              </SelectItem>
              <SelectItem
                value="30days"
                className="cursor-pointer transition-colors duration-300 hover:bg-gray-500/40"
              >
                Last 30 days
              </SelectItem>
              <SelectItem
                value="90days"
                className="cursor-pointer transition-colors duration-300 hover:bg-gray-500/40"
              >
                Last 90 days
              </SelectItem>
              <SelectItem
                value="thisyear"
                className="cursor-pointer transition-colors duration-300 hover:bg-gray-500/40"
              >
                This Year
              </SelectItem>
            </SelectContent>
          </Select>
        </motion.div>
      </div>

      {/* Analytics Cards */}
      <motion.div
        variants={fadeInUp}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {analyticsData.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer rounded-xl border border-white/10 bg-gradient-to-br from-[#222222] to-[#1A1F2C] p-5 shadow-lg backdrop-blur-[30px] transition-all duration-300 ease-in-out hover:scale-[1.01] hover:border-white/20 hover:shadow-[inset_0px_0px_16px_0px_#FFFFFF20]"
          >
            <div className="flex items-center justify-between md:items-start">
              <div>
                <p className="text-sm text-gray-400">{item.title}</p>
                <h3 className="mt-1 text-2xl font-bold text-white">
                  {item.value}
                </h3>
                {item?.title === "Avg. Reviews" ? (
                  <div
                    className={`mt-2 flex items-center ${item.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                  >
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star
                        className="size-4"
                        fill={index < Number(item.value) ? "#10B981" : "#333"}
                        key={`Reviews${index}`}
                      />
                    ))}
                  </div>
                ) : (
                  <div
                    className={`mt-2 flex items-center ${item.change.startsWith("+") ? "text-green-400" : "text-red-400"}`}
                  >
                    <TrendingUp className="mr-1 h-3.5 w-3.5" />
                    <span className="text-xs">
                      {item.change} from last week
                    </span>
                  </div>
                )}
              </div>
              <div className={`${item.color} rounded-lg bg-opacity-20 p-2`}>
                <item.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Charts and Tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Updated Chat Activity Chart */}
        <motion.div
          variants={fadeInUp}
          className="cursor-pointer rounded-xl border border-white/10 bg-gradient-to-br from-[#171717] to-[#0e1118] p-4 shadow-lg backdrop-blur-[30px] transition-all duration-300 ease-in-out hover:scale-[1.003] hover:border-white/20 hover:shadow-[inset_0px_0px_16px_0px_#FFFFFF10] md:p-5 lg:col-span-2"
        >
          <div className="mb-6 flex flex-col items-center justify-between gap-2 md:flex-row">
            <h2 className="text-lg font-semibold text-white">
              Communication Activity
            </h2>
            <div className="flex space-x-3">
              <div className="flex items-center">
                <span className="mr-1.5 h-3 w-3 rounded-full bg-indigo-500"></span>
                <span className="text-xs text-gray-400">Calls</span>
              </div>
              <div className="flex items-center">
                <span className="mr-1.5 h-3 w-3 rounded-full bg-emerald-500"></span>
                <span className="text-xs text-gray-400">Messages</span>
              </div>
              <div className="flex items-center">
                <span className="mr-1.5 h-3 w-3 rounded-full bg-amber-500"></span>
                <span className="text-xs text-gray-400">Meetings</span>
              </div>
            </div>
          </div>
          <div className="-ml-8 h-64">
            {chatActivityData?.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={chatActivityData}
                  margin={{ top: 10, right: 10, left: 0, bottom: 5 }}
                >
                  <defs>
                    <linearGradient id="colorCalls" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#8B5CF6"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorMessages"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#10B981"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                    <linearGradient
                      id="colorMeetings"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                      <stop
                        offset="95%"
                        stopColor="#F59E0B"
                        stopOpacity={0.1}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#333"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
                    stroke="#666"
                    tick={{ fill: "#888", fontSize: 12 }}
                  />
                  <YAxis stroke="#666" tick={{ fill: "#888", fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2129",
                      borderColor: "#333",
                      color: "white",
                      borderRadius: "8px",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                    }}
                    itemStyle={{ color: "white" }}
                    labelStyle={{ color: "gray" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="calls"
                    stroke="#8B5CF6"
                    fillOpacity={1}
                    fill="url(#colorCalls)"
                  />
                  <Area
                    type="monotone"
                    dataKey="messages"
                    stroke="#10B981"
                    fillOpacity={0.8}
                    fill="url(#colorMessages)"
                  />
                  <Area
                    type="monotone"
                    dataKey="meetings"
                    stroke="#F59E0B"
                    fillOpacity={0.6}
                    fill="url(#colorMeetings)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full w-full items-center justify-center text-xl text-white">
                No data available
              </div>
            )}
          </div>
        </motion.div>

        {/* Upcoming Calls */}
        <motion.div
          variants={fadeInUp}
          className="cursor-pointer rounded-xl border border-white/10 bg-gradient-to-br from-[#151414] to-[#0b0d13] p-5 shadow-lg backdrop-blur-[30px] transition-all duration-300 ease-in-out hover:scale-[1.004] hover:border-white/20 hover:shadow-[inset_0px_0px_16px_0px_#FFFFFF10]"
        >
          <h2 className="mb-4 text-lg font-semibold text-white">
            Upcoming Calls
          </h2>
          <div className="space-y-4">
            {upcomingCalls?.length ? (
              upcomingCalls.map((call) => (
                <div
                  key={call.id}
                  className="flex items-center space-x-3 rounded-lg border border-white/5 bg-[#2A2F3C] p-3"
                >
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-[#403E43]">
                    <User className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-white">
                      {call.expert}
                    </p>
                    <div className="mt-1 flex items-center text-xs text-gray-400">
                      <span className="mr-2">{call.date}</span>
                      <span className="mr-2">•</span>
                      <span>{call.duration}</span>
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    {call.type === "VIDEO" ? (
                      <Video className="text-primary h-4 w-4" />
                    ) : (
                      <Phone className="text-primary h-4 w-4" />
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="h-50 flex flex-1 flex-col items-center justify-center">
                <h1 className="text-center text-xl text-white">
                  No upcoming calls
                </h1>
              </div>
            )}
            {upcomingCalls && upcomingCalls?.length > 0 && (
              <button className="text-primary hover:text-primary/80 mt-2 w-full cursor-pointer text-center text-sm">
                View All Upcoming Calls
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Recent Call History */}
      <motion.div
        variants={fadeInUp}
        className="cursor-pointer rounded-xl border border-white/10 bg-gradient-to-br from-[#191919] to-[#11151d] p-5 shadow-lg backdrop-blur-[30px] transition-all duration-300 ease-in-out hover:scale-[1.002] hover:border-white/20 hover:shadow-[inset_0px_0px_16px_0px_#FFFFFF10]"
      >
        <h2 className="mb-4 text-lg font-semibold text-white">
          Recent Call History
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="border-b border-white/10 text-left text-xs text-gray-400">
                <th className="pb-3 pr-2 font-medium">Expert</th>
                <th className="px-2 pb-3 font-medium">Type</th>
                <th className="px-2 pb-3 font-medium">Date & Time</th>
                <th className="px-2 pb-3 font-medium">Duration</th>
                <th className="pb-3 pl-2 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {recentCalls?.length ? (
                recentCalls.map((call) => (
                  <tr key={call.id} className="text-sm">
                    <td className="py-3 pr-2 text-white">{call.expert}</td>
                    <td className="px-2 py-3 text-gray-300">
                      {call.type === "VIDEO" ? (
                        <div className="flex items-center">
                          <Video className="mr-1 h-4 w-4 text-indigo-400" />
                          <span>Video</span>
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <Phone className="mr-1 h-4 w-4 text-emerald-400" />
                          <span>Audio</span>
                        </div>
                      )}
                    </td>
                    <td className="px-2 py-3 text-gray-300">{call.date}</td>
                    <td className="px-2 py-3 text-gray-300">{call.duration}</td>
                    <td className="py-3 pl-2">
                      <span
                        className={`rounded-full px-2 py-1 text-xs ${
                          call.status === "COMPLETED"
                            ? "bg-green-500/20 text-green-400"
                            : call.status === "MISSED"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {call.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr className="text-sm">
                  <td
                    colSpan={5}
                    className="py-4 text-center text-xl text-white"
                  >
                    No recent calls
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {recentCalls && recentCalls?.length > 0 && (
          <div className="mt-4 text-center">
            <button className="text-primary hover:text-primary/80 cursor-pointer text-sm">
              View Full Call History
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ExpertOverview;
