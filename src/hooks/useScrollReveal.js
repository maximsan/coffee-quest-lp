import { useCallback, useEffect, useRef, useState } from "react";

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

export function useScrollReveal() {
  const elementRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(
    () => window.matchMedia(reducedMotionQuery).matches,
  );
  const setRevealElement = useCallback((element) => {
    elementRef.current = element;
  }, []);

  useEffect(() => {
    const element = elementRef.current;

    if (!element || isRevealed) {
      return undefined;
    }

    if (!("IntersectionObserver" in window)) {
      const frameId = window.requestAnimationFrame(() => setIsRevealed(true));
      return () => window.cancelAnimationFrame(frameId);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        setIsRevealed(true);
        observer.disconnect();
      },
      {
        rootMargin: "0px 0px -10%",
        threshold: 0.08,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isRevealed]);

  return [setRevealElement, isRevealed];
}
