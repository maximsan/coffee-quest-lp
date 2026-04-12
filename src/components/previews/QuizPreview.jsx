export function QuizPreview({ dark = false, theme = "default" }) {
  const forestDark = dark && theme === "forest";
  const options = ["Brighter acidity", "More sweetness", "Less aroma"];

  return (
    <div className="space-y-3">
      <div
        className={
          forestDark
            ? "rounded-[20px] bg-[#121916] p-4 text-[#edf3eb]"
            : dark
              ? "rounded-[20px] bg-white/6 p-4 text-white"
              : "rounded-[20px] bg-[#f4ece2] p-4 text-[#2f241a]"
        }
      >
        Lighter roasts usually make origin flavors easier to notice because they
        keep more of the bean&apos;s original character.
      </div>
      {options.map((option, index) => (
        <div
          key={option}
          className={[
            "flex items-center gap-3 rounded-[18px] border px-4 py-3 text-sm",
            index === 0
              ? forestDark
                ? "border-[#567a58] bg-[#16211b] text-[#deebdc]"
                : dark
                  ? "border-[#d7a975] bg-[#22160e] text-[#f8e0c4]"
                  : "border-[#cf9b63] bg-[#fff5e8] text-[#724621]"
              : forestDark
                ? "border-[#2d3832] bg-[#111714] text-[#cfdbcd]"
                : dark
                  ? "border-white/10 bg-white/5 text-white/68"
                  : "border-[#eadfd1] bg-white text-[#6f5b4d]",
          ].join(" ")}
        >
          <span
            className={[
              "grid h-6 w-6 place-items-center rounded-full text-[11px] font-semibold",
              index === 0
                ? forestDark
                  ? "bg-[#7ca776] text-[#0f1511]"
                  : "bg-[#c88d59] text-[#20140e]"
                : forestDark
                  ? "bg-[#223029] text-[#d4e0d2]"
                  : dark
                    ? "bg-white/10 text-white/70"
                    : "bg-[#f3ebe2] text-[#7a6455]",
            ].join(" ")}
          >
            {index + 1}
          </span>
          {option}
        </div>
      ))}
    </div>
  );
}
