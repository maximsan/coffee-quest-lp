import { CoffeeTreePreview } from "../tree/CoffeeTreePreview";

export function TreePreview({
  dark = false,
  theme = "default",
  title = "Beginner grove",
}) {
  const forestDark = dark && theme === "forest";

  return (
    <div
      className={[
        "overflow-hidden rounded-[24px] border p-5",
        forestDark
          ? "border-[#2b3730] bg-[#101612]"
          : dark
            ? "border-white/10 bg-[#17110d]"
            : "border-[#e7dacb] bg-[#fbf6ef]",
      ].join(" ")}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p
            className={
              forestDark
                ? "text-[11px] uppercase tracking-[0.24em] text-[#c4d4c0]"
                : dark
                  ? "text-[11px] uppercase tracking-[0.24em] text-[#d7b98f]"
                  : "text-[11px] uppercase tracking-[0.24em] text-[#8f7460]"
            }
          >
            Coffee tree
          </p>
          <h4
            className={
              dark ? "mt-1 text-lg text-white" : "mt-1 text-lg text-[#2d2118]"
            }
          >
            {title}
          </h4>
        </div>
        <div
          className={
            forestDark
              ? "text-sm text-[#cadec7]"
              : dark
                ? "text-sm text-[#f3cea0]"
                : "text-sm text-[#9c6b40]"
          }
        >
          62%
        </div>
      </div>
      <CoffeeTreePreview />
    </div>
  );
}
