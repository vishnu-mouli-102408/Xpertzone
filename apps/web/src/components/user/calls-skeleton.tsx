import { Card, CardContent } from "@repo/ui/components/card";
import { Skeleton } from "@repo/ui/components/skeleton";
import * as motion from "motion/react-client";

const CallsSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <Card className="h-full overflow-hidden border border-white/10 bg-black text-white transition-all duration-300 hover:border-white/20">
        <CardContent className="p-4">
          <div className="flex h-full flex-col gap-3">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <Skeleton className="h-6 w-32 bg-white/10" />
                <Skeleton className="h-5 w-20 rounded-md bg-white/10" />
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-4 rounded-full bg-white/10" />
                  <Skeleton className="h-4 w-24 bg-white/10" />
                </div>
                <div className="flex items-center gap-1">
                  <Skeleton className="h-4 w-4 rounded-full bg-white/10" />
                  <Skeleton className="h-4 w-32 bg-white/10" />
                </div>
              </div>
            </div>

            <div className="mt-auto flex gap-2">
              <Skeleton className="h-9 flex-1 rounded-md bg-white/10" />
              <Skeleton className="h-9 flex-1 rounded-md bg-white/10" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CallsSkeleton;
