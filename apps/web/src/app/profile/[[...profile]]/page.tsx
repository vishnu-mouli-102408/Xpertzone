import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { UserProfile } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { LoadingSpinner } from "@repo/ui/components/loading-spinner";

export const metadata: Metadata = {
  title: "Profile",
  description: "This is the layout for the profile pages.",
  icons: [{ rel: "icon", url: "/favicon/favicon.ico" }],
};

const Profile = async () => {
  const { userId } = await auth();
  const isAuth = !!userId;

  if (!isAuth) {
    redirect("/sign-in");
  }

  return (
    <div className="my-8 flex flex-col items-center justify-center">
      <UserProfile
        fallback={<LoadingSpinner />}
        appearance={{
          elements: {
            footer: {
              display: "none",
            },
          },
          layout: {
            unsafe_disableDevelopmentModeWarnings: true,
          },
        }}
      />
    </div>
  );
};

export default Profile;
