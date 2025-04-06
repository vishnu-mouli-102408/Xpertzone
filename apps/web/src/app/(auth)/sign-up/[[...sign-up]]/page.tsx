import type { Metadata } from "next";
import { SignUp } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Sign up for an account",
};

function Page() {
  return (
    <div className="mt-14 flex min-h-screen w-full flex-1 items-center justify-center">
      <SignUp
        fallbackRedirectUrl={"/onboarding"}
        forceRedirectUrl={"/onboarding"}
      />
    </div>
  );
}

export default Page;
