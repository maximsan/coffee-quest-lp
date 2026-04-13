export function ProgressPreview({ dark = false, theme = "default" }) {
  const forestDark = dark && theme === "forest";
  const stages = [
    { name: "Beans", status: "Done" },
    { name: "Roast", status: "Done" },
    { name: "Brewing", status: "Next" },
    { name: "Taste", status: "Next" },
  ];

  return (
    <div className="space-y-2.5">
      {stages.map((stage, index) => (
        <div
          key={stage.name}
          className={[
            "flex items-center gap-2.5 rounded-[18px] border px-3.5 py-2.5",
            forestDark
              ? "border-[#26312b] bg-[#121916]"
              : dark
                ? "border-white/8 bg-white/[0.03]"
                : "border-[#eadfd1] bg-[#f8f1e8]",
          ].join(" ")}
        >
          <div
            className={[
              "grid h-10 w-10 place-items-center rounded-2xl text-sm font-semibold",
              index < 2
                ? forestDark
                  ? "bg-[#7ca776] text-[#101612]"
                  : "bg-[#c88d59] text-[#2a1910]"
                : forestDark
                  ? "bg-[#1c2722] text-[#9cae9c]"
                  : dark
                    ? "bg-white/10 text-white/54"
                    : "bg-[#efe5d9] text-[#8a7766]",
            ].join(" ")}
          >
            {index + 1}
          </div>
          <h4
            className={
              dark
                ? "flex-1 text-base font-medium text-white"
                : "flex-1 text-base font-medium text-[#2d2118]"
            }
          >
            {stage.name}
          </h4>
          <div
            className={[
              "min-w-[3.25rem] text-right text-sm font-medium",
              forestDark
                ? stage.status === "Done"
                  ? "text-[#d0dccd]"
                  : "text-[#bccbb9]"
                : dark
                  ? stage.status === "Done"
                    ? "text-[#efc796]"
                    : "text-[#ece1d4]"
                  : "text-[#937d6f]",
            ].join(" ")}
          >
            {stage.status}
          </div>
        </div>
      ))}
    </div>
  );
}
