import { type ReactNode } from "react";
import { Footer, Navbar } from "@/src/components";

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};

export default layout;
