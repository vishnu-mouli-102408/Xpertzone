import React from "react";

import { cn } from "../lib/utils";

interface Props {
  className?: string;
  children: React.ReactNode;
}

const MaxWidthWrapper = ({ className, children }: Props) => {
  return (
    <section
      className={cn(
        "mx-auto h-full w-full px-4 lg:max-w-screen-xl lg:px-16",
        className
      )}
    >
      {children}
    </section>
  );
};

export default MaxWidthWrapper;
