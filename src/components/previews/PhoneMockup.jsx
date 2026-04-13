export function PhoneMockup({
  dark = false,
  accent = "#c88d59",
  title = "Daily lesson",
  subtitle = "Roast basics",
  theme = "default",
  children,
}) {
  const forestDark = dark && theme === "forest";

  return (
    <div
      className={[
        "relative w-[280px] rounded-[36px] border p-3 shadow-[0_30px_70px_rgba(40,20,10,0.18)]",
        forestDark
          ? "border-[#2c3831] bg-[#0f1511]"
          : dark
            ? "border-white/10 bg-[#0f0a07]"
            : "border-[#decfbe] bg-[#f7efe4]",
      ].join(" ")}
    >
      <div
        className="absolute left-1/2 top-3 h-1.5 w-16 -translate-x-1/2 rounded-full opacity-80"
        style={{ backgroundColor: accent }}
      />
      <div
        className={[
          "rounded-[28px] border px-4 pb-4 pt-6",
          forestDark
            ? "border-[#27332d] bg-[#141c18]"
            : dark
              ? "border-white/8 bg-[#1a120d]"
              : "border-[#e7dacb] bg-[#fffdf8]",
        ].join(" ")}
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p
              className={
                forestDark
                  ? "text-[11px] uppercase tracking-[0.24em] text-[#c0d0bc]"
                  : dark
                    ? "text-[11px] uppercase tracking-[0.24em] text-[#d4b488]"
                    : "text-[11px] uppercase tracking-[0.24em] text-[#967762]"
              }
            >
              {title}
            </p>
            <h3
              className={
                dark
                  ? "mt-1 text-lg font-semibold text-white"
                  : "mt-1 text-lg font-semibold text-[#2b2018]"
              }
            >
              {subtitle}
            </h3>
          </div>
          <div
            className="h-10 w-10 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${accent}, rgba(255,255,255,0.15))`,
            }}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
