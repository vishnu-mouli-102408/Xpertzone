import { cn } from "../lib/utils";

interface GradientTextProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Array of colors for the gradient
   * @default ["#ffaa40", "#9c40ff", "#ffaa40"]
   */
  colors?: string[];
  /**
   * Animation duration in seconds
   * @default 8
   */
  animationSpeed?: number;
  /**
   * Show animated border
   * @default false
   */
  showBorder?: boolean;
}

export function GradientText({
  children,
  className,
  colors = ["#ffaa40", "#9c40ff", "#ffaa40"],
  animationSpeed = 8,
  showBorder = false,
  ...props
}: GradientTextProps) {
  const gradientStyle = {
    backgroundImage: `linear-gradient(to right, ${colors.join(", ")})`,
    animationDuration: `${animationSpeed}s`,
  };

  return (
    <div
      className={cn(
        "relative mx-auto flex max-w-fit flex-row items-center justify-center",
        "rounded-[1.25rem] font-medium transition-shadow duration-500",
        "cursor-pointer overflow-hidden",
        className
      )}
      {...props}
    >
      {showBorder && (
        <div
          className="animate-gradient pointer-events-none absolute inset-0 z-0 bg-cover"
          style={{
            ...gradientStyle,
            backgroundSize: "300% 100%",
          }}
        >
          <div
            className="bg-background absolute inset-0 z-[-1] rounded-[1.25rem]"
            style={{
              width: "calc(100% - 2px)",
              height: "calc(100% - 2px)",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        </div>
      )}
      <div
        className="animate-gradient relative z-2 inline-block bg-cover text-transparent"
        style={{
          ...gradientStyle,
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          backgroundSize: "300% 100%",
        }}
      >
        {children}
      </div>
    </div>
  );
}
