export function SiteFooter({ dark = false }) {
  return (
    <footer
      className={[
        "flex flex-col items-center justify-between gap-3 px-6 py-8 text-center text-sm sm:flex-row sm:text-left",
        dark ? "text-white/60" : "text-[#7a6659]",
      ].join(" ")}
    >
      <p>
        Coffee Quest. Learn coffee step by step in a few minutes a day.
      </p>
      <p>Launching soon. Early access for curious beginners.</p>
    </footer>
  );
}
