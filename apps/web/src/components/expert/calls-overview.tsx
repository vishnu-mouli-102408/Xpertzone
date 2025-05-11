import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@repo/ui/components/tabs";
import * as motion from "motion/react-client";

import ExpertPastCalls from "./past-calls";
import ExpertUpcomingCalls from "./upcoming-calls";

const ExpertCallsOverview = () => {
  return (
    <div className="w-full space-y-6 p-4">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h1 className="mb-2 text-3xl font-bold text-white">Calls</h1>
        <p className="mb-6 text-gray-400">
          Manage your upcoming or ongoing video calls and past calls
        </p>
      </motion.div>

      <Tabs defaultValue="upcoming" className="w-full">
        <TabsList className="grid h-11 w-full max-w-md cursor-pointer grid-cols-2 border border-white/10 bg-black">
          <TabsTrigger
            value="upcoming"
            className="cursor-pointer data-[state=active]:bg-white/10 data-[state=active]:text-white"
          >
            Upcoming Calls
          </TabsTrigger>
          <TabsTrigger
            value="past"
            className="cursor-pointer data-[state=active]:bg-white/10 data-[state=active]:text-white"
          >
            Past Calls
          </TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-6" asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ExpertUpcomingCalls />
          </motion.div>
        </TabsContent>
        <TabsContent value="past" className="mt-6" asChild>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ExpertPastCalls />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ExpertCallsOverview;
