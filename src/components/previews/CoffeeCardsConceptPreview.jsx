import { landingPageCoffeeCards } from "../../data/content";

const conceptualCardOffsets = [
  "left-3 top-10 rotate-[-8deg] opacity-60 sm:left-6",
  "right-6 top-3 rotate-[8deg] opacity-72",
  "left-1/2 top-16 z-10 w-[min(100%,22rem)] -translate-x-1/2 rotate-[-2deg]",
];

export function CoffeeCardsConceptPreview() {
  const cards = landingPageCoffeeCards.slice(0, 3);

  return (
    <div className="relative min-h-[244px] overflow-hidden rounded-[32px] border border-[#435047] bg-[linear-gradient(180deg,rgba(19,25,21,0.97),rgba(15,20,17,0.9))] px-4 py-5 shadow-[0_28px_80px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(255,255,255,0.018)] sm:min-h-[286px] sm:px-6">
      <div className="pointer-events-none absolute left-1/2 top-8 h-28 w-40 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(205,161,110,0.22),transparent_70%)] blur-2xl" />
      <div className="pointer-events-none absolute inset-x-10 bottom-3 h-16 rounded-full bg-[radial-gradient(circle,rgba(124,167,118,0.12),transparent_72%)] blur-2xl" />

      {cards.map((card, index) => {
        const isFeatured = index === 2;

        return (
          <article
            key={card.label}
            className={[
              "absolute w-[calc(100%-1.5rem)] max-w-[18rem] rounded-[28px] border border-[#e5d0b5]/16 bg-[linear-gradient(180deg,rgba(52,38,29,0.94),rgba(28,20,15,0.97))] p-4 shadow-[0_22px_46px_rgba(0,0,0,0.28),inset_0_1px_0_rgba(229,208,181,0.03)] backdrop-blur-sm sm:p-5",
              conceptualCardOffsets[index],
              isFeatured
                ? "border-[#d0a16e]/28 shadow-[0_24px_52px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(229,208,181,0.04)] sm:max-w-[22rem]"
                : "",
            ].join(" ")}
          >
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.28em] text-[#d3b28b]">
              <span>{card.label}</span>
              <span>Reference</span>
            </div>
            <h3 className="mt-3 font-botanical-display text-[1.7rem] leading-[0.94] text-[#f7eee4] sm:text-[1.95rem]">
              {card.value}
            </h3>
            <p
              className={[
                "mt-2 font-botanical-body text-sm leading-6 text-white/74",
                isFeatured ? "max-w-[22ch]" : "max-w-[18ch] text-white/64",
              ].join(" ")}
            >
              {card.note}
            </p>
          </article>
        );
      })}
    </div>
  );
}
