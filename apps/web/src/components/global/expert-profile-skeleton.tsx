import { Skeleton } from "@repo/ui/components/skeleton";

const ExpertProfileSkeleton = () => {
  return (
    <div className="container py-8">
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Left column skeleton */}
          <div className="w-full md:w-1/3">
            <Skeleton className="mb-4 h-72 w-full rounded-xl" />
            <Skeleton className="mb-3 h-12 w-full rounded-lg" />
            <div className="mb-4 grid grid-cols-3 gap-2">
              <Skeleton className="h-10 rounded-md" />
              <Skeleton className="h-10 rounded-md" />
              <Skeleton className="h-10 rounded-md" />
            </div>
            <Skeleton className="h-24 w-full rounded-lg" />
          </div>

          {/* Right column skeleton */}
          <div className="w-full md:w-2/3">
            <Skeleton className="mb-2 h-10 w-48 rounded-md" />
            <Skeleton className="mb-6 h-6 w-36 rounded-md" />

            <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-3">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))}
            </div>

            <Skeleton className="mb-3 h-8 w-32 rounded-md" />
            <Skeleton className="mb-6 h-24 w-full rounded-lg" />

            <Skeleton className="mb-3 h-8 w-32 rounded-md" />
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-12 rounded-lg" />
              ))}
            </div>

            <Skeleton className="mb-3 h-8 w-32 rounded-md" />
            <Skeleton className="h-36 w-full rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertProfileSkeleton;
