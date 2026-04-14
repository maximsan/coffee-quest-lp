import { cx } from "../../utils/cx";

export function SiteFooter({ dark = false }) {
  return (
    <footer
      className={cx(
        "flex flex-col items-center justify-between gap-3 px-6 py-4 text-center text-sm sm:flex-row sm:py-6 sm:text-left",
        dark ? "text-white/60" : "text-[#7a6659]",
      )}
    >
      <p>
        Coffee Quest. Learn coffee step by step in a few minutes a day.
      </p>
      <p>Launching soon. Early access for curious beginners.</p>
    </footer>
  );
}
