"use client";

import { forwardRef, useCallback, useEffect, useRef, useState } from "react";

import { cn } from "../lib/utils";

interface HoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const HoverButton = forwardRef<HTMLButtonElement, HoverButtonProps>(
  ({ className, children, ...props }, _ref) => {
    const buttonRef = useRef<HTMLButtonElement>(null);
    const [isListening, setIsListening] = useState(false);
    const [circles, setCircles] = useState<
      {
        id: number;
        x: number;
        y: number;
        color: string;
        fadeState: "in" | "out" | null;
      }[]
    >([]);
    const lastAddedRef = useRef(0);

    const createCircle = useCallback((x: number, y: number) => {
      const buttonWidth = buttonRef.current?.offsetWidth ?? 0;
      const xPos = x / buttonWidth;
      const color = `linear-gradient(to right, var(--circle-start) ${xPos * 100}%, var(--circle-end) ${
        xPos * 100
      }%)`;

      setCircles((prev) => [
        ...prev,
        { id: Date.now(), x, y, color, fadeState: null },
      ]);
    }, []);

    const handlePointerMove = useCallback(
      (event: React.PointerEvent<HTMLButtonElement>) => {
        if (!isListening) return;

        const currentTime = Date.now();
        if (currentTime - lastAddedRef.current > 100) {
          lastAddedRef.current = currentTime;
          const rect = event.currentTarget.getBoundingClientRect();
          const x = event.clientX - rect.left;
          const y = event.clientY - rect.top;
          createCircle(x, y);
        }
      },
      [isListening, createCircle]
    );

    const handlePointerEnter = useCallback(() => {
      setIsListening(true);
    }, []);

    const handlePointerLeave = useCallback(() => {
      setIsListening(false);
    }, []);

    useEffect(() => {
      circles.forEach((circle) => {
        if (!circle.fadeState) {
          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) =>
                c.id === circle.id ? { ...c, fadeState: "in" } : c
              )
            );
          }, 0);

          setTimeout(() => {
            setCircles((prev) =>
              prev.map((c) =>
                c.id === circle.id ? { ...c, fadeState: "out" } : c
              )
            );
          }, 1000);

          setTimeout(() => {
            setCircles((prev) => prev.filter((c) => c.id !== circle.id));
          }, 2200);
        }
      });
    }, [circles]);

    return (
      <button
        ref={buttonRef}
        className={cn(
          "relative isolate rounded-3xl px-8 py-3",
          "text-foreground text-base font-medium leading-6",
          "bg-[rgba(43,55,80,0.1)] backdrop-blur-lg",
          "cursor-pointer overflow-hidden",
          "before:absolute before:inset-0 before:content-['']",
          "before:pointer-events-none before:rounded-[inherit]",
          "before:z-[1]",
          "before:shadow-[inset_0_0_0_1px_rgba(170,202,255,0.2),inset_0_0_16px_0_rgba(170,202,255,0.1),inset_0_-3px_12px_0_rgba(170,202,255,0.15),0_1px_3px_0_rgba(0,0,0,0.50),0_4px_12px_0_rgba(0,0,0,0.45)]",
          "before:mix-blend-multiply before:transition-transform before:duration-300",
          "active:before:scale-[0.975]",
          "hover:before:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.3),inset_0_0_16px_0_rgba(255,255,255,0.2),inset_0_-3px_12px_0_rgba(255,255,255,0.25),0_2px_5px_0_rgba(255,255,255,0.4),0_6px_14px_0_rgba(255,255,255,0.35)]",
          "active:scale-[0.98] active:brightness-100",
          "hover:scale-[1.02] hover:bg-opacity-40 hover:brightness-125",
          "transition-all duration-300 ease-out",
          className
        )}
        onPointerMove={handlePointerMove}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
        {...props}
        style={
          {
            "--circle-start": "var(--tw-gradient-from, #a0d9f8)",
            "--circle-end": "var(--tw-gradient-to, #3a5bbf)",
          } as React.CSSProperties
        }
      >
        {circles.map(({ id, x, y, color, fadeState }) => (
          <div
            key={id}
            className={cn(
              "absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full",
              "pointer-events-none z-[-1] blur-lg transition-opacity duration-300",
              fadeState === "in" && "opacity-75",
              fadeState === "out" && "opacity-0 duration-[1.2s]",
              !fadeState && "opacity-0"
            )}
            style={{
              left: x,
              top: y,
              background: color,
            }}
          />
        ))}
        {children}
      </button>
    );
  }
);

HoverButton.displayName = "HoverButton";

export { HoverButton };
