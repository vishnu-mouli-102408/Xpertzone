import AnimationContainer from "@repo/ui/components/animation-container";
import * as motion from "motion/react-client";

import SettingsForm from "./settings-form";

const Settings = () => {
  //   const user = await currentUser();

  return (
    <div className="px-6 py-12 sm:px-8 md:px-12">
      <AnimationContainer className="mx-auto max-w-4xl">
        <header className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="mb-2 flex items-center gap-3"
          >
            <div className="h-1.5 w-12 rounded-full bg-white/30" />
            <span className="text-sm font-medium uppercase tracking-wider text-zinc-400">
              Account
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="mb-3 text-4xl font-bold text-white"
          >
            Settings
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            className="max-w-xl text-zinc-400"
          >
            Manage your account settings and preferences
          </motion.p>
        </header>

        <main className="neo-blur rounded-2xl p-8">
          <SettingsForm />
        </main>
      </AnimationContainer>
    </div>
  );
};

export default Settings;
