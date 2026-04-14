import { cx } from "../../utils/cx";
import { getThemeVariant } from "../../utils/theme";

const PROGRESS_STYLES = {
  forestDark: {
    row: "border-[#2d3932] bg-[#141b18]",
    completedBadge: "bg-[#7ca776] text-[#101612]",
    pendingBadge: "bg-[#1f2b25] text-[#a7b7a5]",
    name: { base: "text-white", compact: "text-white" },
    statusDone: "text-[#d9e3d6]",
    statusNext: "text-[#c7d2c4]",
  },
  dark: {
    row: "border-white/8 bg-white/[0.03]",
    completedBadge: "bg-[#c88d59] text-[#2a1910]",
    pendingBadge: "bg-white/10 text-white/54",
    name: { base: "text-white", compact: "text-white" },
    statusDone: "text-[#efc796]",
    statusNext: "text-[#ece1d4]",
  },
  light: {
    row: "border-[#eadfd1] bg-[#f8f1e8]",
    completedBadge: "bg-[#c88d59] text-[#2a1910]",
    pendingBadge: "bg-[#efe5d9] text-[#8a7766]",
    name: { base: "text-[#2d2118]", compact: "text-[#2d2118]" },
    statusDone: "text-[#937d6f]",
    statusNext: "text-[#937d6f]",
  },
};

const stages = [
  { name: "Beans", status: "Done" },
  { name: "Roast", status: "Done" },
  { name: "Brewing", status: "Next" },
  { name: "Taste", status: "Next" },
];

export function ProgressPreview({ dark = false, theme = "default", compact = false }) {
  const variant = getThemeVariant(dark, theme);
  const styles = PROGRESS_STYLES[variant];

  return (
    <div className={compact ? "space-y-2" : "space-y-2.5"}>
      {stages.map((stage, index) => {
        const isCompleted = index < 2;

        return (
          <div
            key={stage.name}
            className={cx(
              compact
                ? "flex items-center gap-2.5 rounded-[16px] border px-3 py-2"
                : "flex items-center gap-2.5 rounded-[18px] border px-3.5 py-2.5",
              styles.row,
            )}
          >
            <div
              className={cx(
                compact
                  ? "grid h-9 w-9 place-items-center rounded-[14px] text-[13px] font-semibold"
                  : "grid h-10 w-10 place-items-center rounded-2xl text-sm font-semibold",
                isCompleted ? styles.completedBadge : styles.pendingBadge,
              )}
            >
              {index + 1}
            </div>
            <h4
              className={cx(
                "flex-1 font-medium",
                compact ? "text-[15px]" : "text-base",
                compact ? styles.name.compact : styles.name.base,
              )}
            >
              {stage.name}
            </h4>
            <div
              className={cx(
                "text-right font-medium",
                compact ? "min-w-[2.8rem] text-[13px]" : "min-w-[3.25rem] text-sm",
                stage.status === "Done" ? styles.statusDone : styles.statusNext,
              )}
            >
              {stage.status}
            </div>
          </div>
        );
      })}
    </div>
  );
}
