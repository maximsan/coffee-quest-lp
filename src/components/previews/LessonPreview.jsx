import { landingPageLessonBullets } from "../../data/landingPageContent";

export function LessonPreview({
  dark = false,
  theme = "default",
  items = landingPageLessonBullets,
}) {
  const forestDark = dark && theme === "forest";

  return (
    <div className="space-y-3">
      {items.map((bullet) => (
        <div
          key={bullet}
          className={[
            "rounded-[18px] border px-4 py-3 text-sm",
            forestDark
              ? "border-[#2d3832] bg-[#111714] text-[#ebf2e9]"
              : dark
                ? "border-white/10 bg-white/7 text-[#f2e8dc]"
                : "border-[#eadfd1] bg-[#f8f1e8] text-[#634f42]",
          ].join(" ")}
        >
          {bullet}
        </div>
      ))}
      <div className="mt-4 flex items-center justify-between">
        <span
          className={
            forestDark
              ? "text-sm text-[#bfcebc]"
              : dark
                ? "text-sm text-[#d8c2a2]"
                : "text-sm text-[#8b7463]"
          }
        >
          3 min lesson
        </span>
        <div
          className={[
            "h-2 w-28 overflow-hidden rounded-full border",
            forestDark
              ? "border-[#314037] bg-[#1a241f]"
              : dark
                ? "border-white/8 bg-[#2a1f18]"
                : "border-[#e3d6c8] bg-[#eadfce]",
          ].join(" ")}
        >
          <div
            className="h-full w-2/3 rounded-full"
            style={{ backgroundColor: forestDark ? "#7ca776" : "#c88d59" }}
          />
        </div>
      </div>
    </div>
  );
}
