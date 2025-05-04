"use client";

import { useEffect, useRef } from "react";

interface UseInfiniteScrollOptions {
  callbackAction: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
  threshold?: number; // optional threshold (default = 1.0)
  rootMargin?: string; // optional root margin (default = "0px")
}

export function useInfiniteScroll({
  callbackAction,
  hasMore = true,
  isLoading = false,
  threshold = 1.0,
  rootMargin = "0px",
}: UseInfiniteScrollOptions) {
  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;
        if (entry.isIntersecting) {
          callbackAction();
        }
      },
      {
        root: null,
        rootMargin,
        threshold,
      }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [callbackAction, hasMore, isLoading, threshold, rootMargin]);

  return observerRef;
}
