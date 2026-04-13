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
    let currentProgress = 0;
    let targetProgress = 0;
    let isAnimating = false;

    const applyProgress = (progress) => {
      const trunkReveal = clamp((progress - 0.04) / 0.42, 0, 1);
      const branchOneReveal = clamp((progress - 0.2) / 0.2, 0, 1);
      const branchTwoReveal = clamp((progress - 0.34) / 0.2, 0, 1);
      const branchThreeReveal = clamp((progress - 0.48) / 0.22, 0, 1);
      const branchFourReveal = clamp((progress - 0.62) / 0.22, 0, 1);
      const fadeIn = clamp((progress - 0.02) / 0.22, 0, 1);
      const fadeOut = clamp((0.96 - progress) / 0.22, 0, 1);
      const opacity = Math.min(fadeIn, fadeOut);
      const trunkOpacity = opacity * 0.24;
      const branchesOpacity = opacity * 0.11;

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
      element.style.setProperty("--branch-opacity-trunk", trunkOpacity.toFixed(3));
      element.style.setProperty(
        "--branch-opacity-branches",
        branchesOpacity.toFixed(3),
      );
      element.style.setProperty(
        "--branch-lift-trunk",
        `${120 - progress * 90}px`,
      );
      element.style.setProperty(
        "--branch-drift-trunk",
        `${-1.5 + progress * 3}px`,
      );
    };

    const applyReducedMotionState = () => {
      element.style.setProperty("--branch-reveal-trunk", "1");
      element.style.setProperty("--branch-reveal-one", "1");
      element.style.setProperty("--branch-reveal-two", "1");
      element.style.setProperty("--branch-reveal-three", "1");
      element.style.setProperty("--branch-reveal-four", "1");
      element.style.setProperty("--branch-opacity-trunk", "0.1");
      element.style.setProperty("--branch-opacity-branches", "0.045");
      element.style.setProperty("--branch-lift-trunk", "0px");
      element.style.setProperty("--branch-drift-trunk", "0px");
    };

    const readProgress = () => {
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      return maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    const stopAnimation = () => {
      isAnimating = false;
      cancelAnimationFrame(frameId);
    };

    const animate = () => {
      currentProgress += (targetProgress - currentProgress) * 0.08;
      if (Math.abs(targetProgress - currentProgress) < 0.0015) {
        currentProgress = targetProgress;
      }

      applyProgress(clamp(currentProgress, 0, 1));

      if (Math.abs(targetProgress - currentProgress) < 0.0015) {
        stopAnimation();
        return;
      }

      frameId = window.requestAnimationFrame(animate);
    };

    const update = () => {
      if (reduceMotion.matches) {
        stopAnimation();
        applyReducedMotionState();
        return;
      }

      targetProgress = clamp(readProgress(), 0, 1);

      if (!isAnimating) {
        isAnimating = true;
        frameId = window.requestAnimationFrame(animate);
      }
    };

    const onScroll = () => {
      update();
    };

    currentProgress = clamp(readProgress(), 0, 1);
    targetProgress = currentProgress;

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      stopAnimation();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return ref;
}
