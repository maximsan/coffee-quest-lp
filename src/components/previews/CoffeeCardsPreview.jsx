import { landingPageCoffeeCards } from "../../data/landingPageContent";
import { cx } from "../../utils/cx";
import { getThemeVariant } from "../../utils/theme";

const CARD_STYLES = {
  forestDark: {
    card: "border-[#2b3730] bg-[#101612] text-[#eef3eb]",
    label: "text-[#9eb999]",
    note: "mt-2 text-sm text-[#bfcdbd]",
  },
  dark: {
    card: "border-white/10 bg-[#1a120d] text-white",
    label: "text-[#aa7a50]",
    note: "mt-2 text-sm text-white/64",
  },
  light: {
    card: "border-[#dfd2c2] bg-[#fffaf4] text-[#2d2118]",
    label: "text-[#aa7a50]",
    note: "mt-2 text-sm text-[#7b6759]",
  },
};

export function CoffeeCardsPreview({ dark = false, theme = "default" }) {
  const variant = getThemeVariant(dark, theme);
  const styles = CARD_STYLES[variant];

  return (
    <div className="grid gap-3">
      {landingPageCoffeeCards.map((card) => (
        <article
          key={card.label}
          className={cx("rounded-[22px] border p-4", styles.card)}
        >
          <div
            className={cx(
              "mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.24em]",
              styles.label,
            )}
          >
            <span>{card.label}</span>
            <span>Card</span>
          </div>
          <h4 className="text-lg font-semibold">{card.value}</h4>
          <p className={styles.note}>{card.note}</p>
        </article>
      ))}
    </div>
  );
}
