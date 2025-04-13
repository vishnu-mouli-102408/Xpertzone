import type { Metadata } from "next";
import { ExploreExperts } from "@/src/components";

export const metadata: Metadata = {
  title: "Explore Experts",
  description: "This is the layout for the explore experts pages.",
  icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

const Page = () => {
  return (
    <div className="mx-auto min-h-[calc(100vh-64px)] w-full bg-black/50 p-6">
      <ExploreExperts />
    </div>
  );
};

export default Page;
