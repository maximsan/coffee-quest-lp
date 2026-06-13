import { useEffect, useRef, useState } from "react";

/**
 * Autoplaying video that defers its network download until it nears the
 * viewport. Renders only the poster up front (cheap), then attaches the
 * `<source>` elements and starts playback once an IntersectionObserver fires —
 * keeping large below-the-fold clips out of the initial page load.
 *
 * The `<video>` element is always present (not conditionally mounted) so test
 * harnesses can still query/pause it; only the sources are deferred.
 *
 * @param {object} props
 * @param {Array<{ src: string, type: string }>} props.sources - `<source>` entries, most-preferred first.
 * @param {string} props.poster - Image shown until the video loads.
 * @param {string} [props.className]
 * @param {string} [props.ariaLabel]
 */
export function LazyVideo({ sources, poster, className, ariaLabel }) {
  const videoRef = useRef(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (shouldLoad) return;
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [shouldLoad]);

  useEffect(() => {
    // Sources were just attached — (re)load so the autoPlay attribute can fire.
    if (shouldLoad) videoRef.current?.load();
  }, [shouldLoad]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      poster={poster}
      className={className}
      aria-label={ariaLabel}
    >
      {shouldLoad
        ? sources.map((source) => (
            <source key={source.src} src={source.src} type={source.type} />
          ))
        : null}
    </video>
  );
}
