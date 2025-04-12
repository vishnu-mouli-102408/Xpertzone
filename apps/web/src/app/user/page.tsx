import type { Metadata } from "next";
import { UserOverview } from "@/src/components";

export const metadata: Metadata = {
  title: {
    default: "User Layout",
    template: "%s | User",
  },
  description: "Tjis is the layout for the user pages.",
  icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

function Page() {
  return (
    <div className="mx-auto min-h-[calc(100vh-64px)] bg-black/50 p-6">
      <UserOverview />
    </div>
  );
}

export default Page;
