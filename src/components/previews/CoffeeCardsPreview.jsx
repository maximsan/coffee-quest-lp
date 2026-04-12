import { cards } from "../../data/content";

export function CoffeeCardsPreview({ dark = false, theme = "default" }) {
  const forestDark = dark && theme === "forest";

  return (
    <div className="grid gap-3">
      {cards.map((card) => (
        <article
          key={card.label}
          className={[
            "rounded-[22px] border p-4",
            forestDark
              ? "border-[#2b3730] bg-[#101612] text-[#eef3eb]"
              : dark
                ? "border-white/10 bg-[#1a120d] text-white"
                : "border-[#dfd2c2] bg-[#fffaf4] text-[#2d2118]",
          ].join(" ")}
        >
          <div
            className={[
              "mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.24em]",
              forestDark ? "text-[#9eb999]" : "text-[#aa7a50]",
            ].join(" ")}
          >
            <span>{card.label}</span>
            <span>Card</span>
          </div>
          <h4 className="text-lg font-semibold">{card.value}</h4>
          <p
            className={
              forestDark
                ? "mt-2 text-sm text-[#bfcdbd]"
                : dark
                  ? "mt-2 text-sm text-white/64"
                  : "mt-2 text-sm text-[#7b6759]"
            }
          >
            {card.note}
          </p>
        </article>
      ))}
    </div>
  );
}
