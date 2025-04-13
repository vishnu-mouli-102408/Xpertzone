import type { Metadata } from "next";
import { Settings } from "@/src/components";

export const metadata: Metadata = {
  title: "Settings",
  description: "This is the settings page for user.",
  icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

const SettingsPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-64px)] flex-col bg-gradient-to-b from-zinc-900 to-black">
      <Settings />
    </div>
  );
};

export default SettingsPage;
