import { audiences } from "../../data/content";

export function AudienceList({ dark = false, theme = "default" }) {
  const forestDark = dark && theme === "forest";

  return (
    <div className="grid gap-3">
      {audiences.map((item) => (
        <div
          key={item}
          className={[
            "rounded-[24px] border p-5 text-center",
            forestDark
              ? "border-[#2e3a33] bg-[#111714] text-[#e2ebe0]"
              : dark
                ? "border-white/10 bg-white/6 text-white/78"
                : "border-[#eadfd2] bg-white/80 text-[#655244]",
          ].join(" ")}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
