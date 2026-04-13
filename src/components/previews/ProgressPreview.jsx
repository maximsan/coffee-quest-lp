export function ProgressPreview({ dark = false, theme = "default", compact = false }) {
  const forestDark = dark && theme === "forest";
  const stages = [
    { name: "Beans", status: "Done" },
    { name: "Roast", status: "Done" },
    { name: "Brewing", status: "Next" },
    { name: "Taste", status: "Next" },
  ];

  return (
    <div className={compact ? "space-y-2" : "space-y-2.5"}>
      {stages.map((stage, index) => (
        <div
          key={stage.name}
          className={[
            compact
              ? "flex items-center gap-2.5 rounded-[16px] border px-3 py-2"
              : "flex items-center gap-2.5 rounded-[18px] border px-3.5 py-2.5",
            forestDark
              ? "border-[#2d3932] bg-[#141b18]"
              : dark
                ? "border-white/8 bg-white/[0.03]"
                : "border-[#eadfd1] bg-[#f8f1e8]",
          ].join(" ")}
        >
          <div
            className={[
              compact
                ? "grid h-9 w-9 place-items-center rounded-[14px] text-[13px] font-semibold"
                : "grid h-10 w-10 place-items-center rounded-2xl text-sm font-semibold",
              index < 2
                ? forestDark
                  ? "bg-[#7ca776] text-[#101612]"
                  : "bg-[#c88d59] text-[#2a1910]"
                : forestDark
                  ? "bg-[#1f2b25] text-[#a7b7a5]"
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
                ? compact
                  ? "flex-1 text-[15px] font-medium text-white"
                  : "flex-1 text-base font-medium text-white"
                : compact
                  ? "flex-1 text-[15px] font-medium text-[#2d2118]"
                  : "flex-1 text-base font-medium text-[#2d2118]"
            }
          >
            {stage.name}
          </h4>
          <div
            className={[
              compact
                ? "min-w-[2.8rem] text-right text-[13px] font-medium"
                : "min-w-[3.25rem] text-right text-sm font-medium",
              forestDark
                ? stage.status === "Done"
                  ? "text-[#d9e3d6]"
                  : "text-[#c7d2c4]"
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
