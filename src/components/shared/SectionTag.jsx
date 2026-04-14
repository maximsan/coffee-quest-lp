import { cx } from "../../utils/cx";
import { getThemeVariant } from "../../utils/theme";

const TAG_STYLES = {
  forestDark: "border border-[#314037] bg-[#131a17]/90 text-[#d7e3d4]",
  dark: "border border-white/10 bg-white/8 text-[#e9c79a]",
  light: "border border-[#d8c6b3] bg-[#f8f0e8] text-[#8a5d37]",
};

export function SectionTag({ children, dark = false, theme = "default" }) {
  const variant = getThemeVariant(dark, theme);

  return (
    <span
      className={cx(
        "inline-flex w-fit rounded-full px-3 py-1 text-center text-[11px] font-semibold uppercase tracking-[0.26em]",
        TAG_STYLES[variant],
      )}
    >
      {children}
    </span>
  );
}
