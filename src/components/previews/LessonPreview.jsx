import { landingPageLessonBullets } from "../../data/content";
import { cx } from "../../utils/cx";
import { getThemeVariant } from "../../utils/theme";

const LESSON_STYLES = {
  forestDark: {
    bullet: "border-[#2d3832] bg-[#111714] text-[#ebf2e9]",
    label: "text-sm text-[#bfcebc]",
    bar: "border-[#314037] bg-[#1a241f]",
    barFill: "#7ca776",
  },
  dark: {
    bullet: "border-white/10 bg-white/7 text-[#f2e8dc]",
    label: "text-sm text-[#d8c2a2]",
    bar: "border-white/8 bg-[#2a1f18]",
    barFill: "#c88d59",
  },
  light: {
    bullet: "border-[#eadfd1] bg-[#f8f1e8] text-[#634f42]",
    label: "text-sm text-[#8b7463]",
    bar: "border-[#e3d6c8] bg-[#eadfce]",
    barFill: "#c88d59",
  },
};

export function LessonPreview({
  dark = false,
  theme = "default",
  items = landingPageLessonBullets,
}) {
  const variant = getThemeVariant(dark, theme);
  const styles = LESSON_STYLES[variant];

  return (
    <div className="space-y-3">
      {items.map((bullet) => (
        <div
          key={bullet}
          className={cx(
            "rounded-[18px] border px-4 py-3 text-sm",
            styles.bullet,
          )}
        >
          {bullet}
        </div>
      ))}
      <div className="mt-4 flex items-center justify-between">
        <span className={styles.label}>3 min lesson</span>
        <div
          className={cx(
            "h-2 w-28 overflow-hidden rounded-full border",
            styles.bar,
          )}
        >
          <div
            className="h-full w-2/3 rounded-full"
            style={{ backgroundColor: styles.barFill }}
          />
        </div>
      </div>
    </div>
  );
}
