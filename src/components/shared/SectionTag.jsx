export function SectionTag({ children, dark = false, theme = "default" }) {
  const forestDark = dark && theme === "forest";

  return (
    <span
      className={[
        "text-center",
        "inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em]",
        forestDark
          ? "border border-[#314037] bg-[#131a17]/90 text-[#d7e3d4]"
          : dark
            ? "border border-white/10 bg-white/8 text-[#e9c79a]"
            : "border border-[#d8c6b3] bg-[#f8f0e8] text-[#8a5d37]",
      ].join(" ")}
    >
      {children}
    </span>
  );
}
