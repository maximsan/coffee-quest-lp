import { cx } from "../../utils/cx";
import { getThemeVariant } from "../../utils/theme";

const PHONE_STYLES = {
  forestDark: {
    shell: "border-[#2c3831] bg-[#0f1511]",
    inner: "border-[#27332d] bg-[#141c18]",
    label: "text-[11px] uppercase tracking-[0.24em] text-[#c0d0bc]",
  },
  dark: {
    shell: "border-white/10 bg-[#0f0a07]",
    inner: "border-white/8 bg-[#1a120d]",
    label: "text-[11px] uppercase tracking-[0.24em] text-[#d4b488]",
  },
  light: {
    shell: "border-[#decfbe] bg-[#f7efe4]",
    inner: "border-[#e7dacb] bg-[#fffdf8]",
    label: "text-[11px] uppercase tracking-[0.24em] text-[#967762]",
  },
};

export function PhoneMockup({
  dark = false,
  accent = "#c88d59",
  title = "Daily lesson",
  subtitle = "Roast basics",
  theme = "default",
  children,
}) {
  const variant = getThemeVariant(dark, theme);
  const styles = PHONE_STYLES[variant];

  return (
    <div
      className={cx(
        "relative w-[280px] rounded-[36px] border p-3 shadow-[0_30px_70px_rgba(40,20,10,0.18)]",
        styles.shell,
      )}
    >
      <div
        className="absolute left-1/2 top-3 h-1.5 w-16 -translate-x-1/2 rounded-full opacity-80"
        style={{ backgroundColor: accent }}
      />
      <div className={cx("rounded-[28px] border px-4 pb-4 pt-6", styles.inner)}>
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className={styles.label}>{title}</p>
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
