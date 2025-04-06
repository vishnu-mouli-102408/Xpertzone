import type { Metadata } from "next";
import { SignIn } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your account",
};

function Page() {
  return (
    <div className="flex min-h-screen w-full flex-1 items-center justify-center">
      <SignIn forceRedirectUrl={"/"} />
    </div>
  );
}

export default Page;
