import { Skeleton } from "@repo/ui/components/skeleton";

const OverviewSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-40 bg-[#171616]" />
        <Skeleton className="h-10 w-32 bg-[#171616]" />
      </div>

      {/* Analytics Cards skeleton */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="rounded-xl border border-white/5 bg-[#17191f] p-5 shadow-lg"
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-[#333333]" />
                <Skeleton className="h-8 w-16 bg-[#333333]" />
                <Skeleton className="h-3 w-28 bg-[#333333]" />
              </div>
              <Skeleton className="h-10 w-10 rounded-lg bg-[#333333]" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts and Tables skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Chart skeleton */}
        <div className="rounded-xl border border-white/5 bg-[#14161a] p-5 shadow-lg lg:col-span-2">
          <div className="mb-6 flex flex-col justify-between space-y-2 sm:flex-row sm:items-center sm:space-y-0">
            <Skeleton className="h-6 w-48 bg-[#333333]" />
            <div className="flex gap-3">
              <Skeleton className="h-4 w-16 bg-[#333333]" />
              <Skeleton className="h-4 w-16 bg-[#333333]" />
              <Skeleton className="h-4 w-16 bg-[#333333]" />
            </div>
          </div>
          <Skeleton className="h-[250px] w-full bg-[#222222]" />
        </div>

        {/* Upcoming Calls skeleton */}
        <div className="rounded-xl border border-white/5 bg-[#14161a] p-5 shadow-lg">
          <Skeleton className="mb-4 h-6 w-36 bg-[#333333]" />
          <div className="space-y-4">
            {[...Array(3)].map((_, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 rounded-lg border border-white/5 bg-[#14161a] p-3"
              >
                <Skeleton className="h-10 w-10 rounded-full bg-[#403E43]" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-28 bg-[#403E43]" />
                  <div className="mt-1 flex items-center space-x-2">
                    <Skeleton className="h-3 w-20 bg-[#403E43]" />
                    <Skeleton className="h-3 w-16 bg-[#403E43]" />
                  </div>
                </div>
                <Skeleton className="h-4 w-4 bg-[#403E43]" />
              </div>
            ))}
            <Skeleton className="mx-auto mt-2 h-4 w-32 bg-[#333333]" />
          </div>
        </div>
      </div>

      {/* Recent Call History skeleton */}
      <div className="rounded-xl border border-white/5 bg-[#14161a] p-5 shadow-lg">
        <Skeleton className="mb-4 h-6 w-36 bg-[#333333]" />
        <div className="-mx-4 overflow-x-auto sm:mx-0">
          <div className="inline-block min-w-full p-4 align-middle sm:p-0">
            <div className="min-w-full">
              {/* Table header skeleton */}
              <div className="flex justify-between border-b border-white/10 pb-3">
                <Skeleton className="h-4 w-24 bg-[#333333]" />
                <Skeleton className="h-4 w-16 bg-[#333333]" />
                <Skeleton className="hidden h-4 w-28 bg-[#333333] sm:block" />
                <Skeleton className="hidden h-4 w-16 bg-[#333333] md:block" />
                <Skeleton className="h-4 w-16 bg-[#333333]" />
              </div>

              {/* Table body skeleton */}
              <div className="divide-y divide-white/10">
                {[...Array(5)].map((_, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-3"
                  >
                    <Skeleton className="h-4 w-32 bg-[#333333]" />
                    <div className="flex items-center">
                      <Skeleton className="mr-1 h-4 w-4 bg-[#333333]" />
                      <Skeleton className="hidden h-4 w-12 bg-[#333333] sm:block" />
                    </div>
                    <Skeleton className="hidden h-4 w-24 bg-[#333333] sm:block" />
                    <Skeleton className="hidden h-4 w-16 bg-[#333333] md:block" />
                    <Skeleton className="h-5 w-20 rounded-full bg-[#333333]" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Skeleton className="mx-auto mt-4 h-4 w-32 bg-[#333333]" />
      </div>
    </div>
  );
};

export default OverviewSkeleton;
