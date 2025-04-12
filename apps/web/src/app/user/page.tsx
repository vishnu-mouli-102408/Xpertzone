import type { Metadata } from "next";

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
      <h1>Hello</h1>
    </div>
  );
}

export default Page;
