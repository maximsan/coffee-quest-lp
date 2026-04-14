import { cx } from "../../utils/cx";
import { getThemeVariant } from "../../utils/theme";
import { CoffeeTreePreview } from "../tree/CoffeeTreePreview";

const TREE_STYLES = {
  forestDark: {
    shell: "border-[#2b3730] bg-[#101612]",
    label: "text-[11px] uppercase tracking-[0.24em] text-[#c4d4c0]",
    percent: "text-sm text-[#cadec7]",
  },
  dark: {
    shell: "border-white/10 bg-[#17110d]",
    label: "text-[11px] uppercase tracking-[0.24em] text-[#d7b98f]",
    percent: "text-sm text-[#f3cea0]",
  },
  light: {
    shell: "border-[#e7dacb] bg-[#fbf6ef]",
    label: "text-[11px] uppercase tracking-[0.24em] text-[#8f7460]",
    percent: "text-sm text-[#9c6b40]",
  },
};

export function TreePreview({
  dark = false,
  theme = "default",
  title = "Beginner grove",
}) {
  const variant = getThemeVariant(dark, theme);
  const styles = TREE_STYLES[variant];

  return (
    <div
      className={cx(
        "overflow-hidden rounded-[24px] border p-5",
        styles.shell,
      )}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className={styles.label}>Coffee tree</p>
          <h4
            className={
              dark ? "mt-1 text-lg text-white" : "mt-1 text-lg text-[#2d2118]"
            }
          >
            {title}
          </h4>
        </div>
        <div className={styles.percent}>62%</div>
      </div>
      <CoffeeTreePreview />
    </div>
  );
}
