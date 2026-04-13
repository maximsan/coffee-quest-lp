import { useEffect, useRef } from "react";

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export function useScrollBranchBackdrop() {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return undefined;
    }

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;

    const applyProgress = (progress) => {
      const trunkReveal = clamp((progress - 0.03) / 0.16, 0, 1);
      const branchOneReveal = clamp((progress - 0.16) / 0.12, 0, 1);
      const branchTwoReveal = clamp((progress - 0.28) / 0.12, 0, 1);
      const branchThreeReveal = clamp((progress - 0.4) / 0.12, 0, 1);
      const branchFourReveal = clamp((progress - 0.52) / 0.12, 0, 1);
      const fadeIn = clamp(progress / 0.14, 0, 1);
      const fadeOut = clamp((0.9 - progress) / 0.2, 0, 1);
      const opacity = Math.min(fadeIn, fadeOut) * 0.46;

      element.style.setProperty("--branch-reveal-trunk", trunkReveal.toFixed(3));
      element.style.setProperty("--branch-reveal-one", branchOneReveal.toFixed(3));
      element.style.setProperty("--branch-reveal-two", branchTwoReveal.toFixed(3));
      element.style.setProperty(
        "--branch-reveal-three",
        branchThreeReveal.toFixed(3),
      );
      element.style.setProperty(
        "--branch-reveal-four",
        branchFourReveal.toFixed(3),
      );
      element.style.setProperty("--branch-opacity", opacity.toFixed(3));
      element.style.setProperty(
        "--branch-lift-trunk",
        `${230 - progress * 280}px`,
      );
      element.style.setProperty(
        "--branch-drift-trunk",
        `${-4 + progress * 8}px`,
      );
    };

    const applyReducedMotionState = () => {
      element.style.setProperty("--branch-reveal-trunk", "1");
      element.style.setProperty("--branch-reveal-one", "1");
      element.style.setProperty("--branch-reveal-two", "1");
      element.style.setProperty("--branch-reveal-three", "1");
      element.style.setProperty("--branch-reveal-four", "1");
      element.style.setProperty("--branch-opacity", "0.12");
      element.style.setProperty("--branch-lift-trunk", "0px");
      element.style.setProperty("--branch-drift-trunk", "0px");
    };

    const update = () => {
      if (reduceMotion.matches) {
        applyReducedMotionState();
        return;
      }

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      applyProgress(clamp(progress, 0, 1));
    };

    const onScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return ref;
}
