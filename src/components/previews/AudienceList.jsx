import { landingPageAudiences } from "../../data/content";
import { cx } from "../../utils/cx";
import { getThemeVariant } from "../../utils/theme";

const CARD_STYLES = {
  forestDark: "border-[#2e3a33] bg-[#111714] text-[#e2ebe0]",
  dark: "border-white/10 bg-white/6 text-white/78",
  light: "border-[#eadfd2] bg-white/80 text-[#655244]",
};

export function AudienceList({ dark = false, theme = "default" }) {
  const variant = getThemeVariant(dark, theme);

  return (
    <div className="grid gap-3">
      {landingPageAudiences.map((item) => (
        <div
          key={item}
          className={cx(
            "rounded-[24px] border p-5 text-center",
            CARD_STYLES[variant],
          )}
        >
          {item}
        </div>
      ))}
    </div>
  );
}
