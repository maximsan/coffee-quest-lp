import coffeeTreeGrowthVideo from "../../assets/Flowerpot_seed_to.mp4";
import coffeeTreeGrowthPoster from "../../assets/coffee-tree-poster.webp";
import { landingPageValueProps } from "../../data/content";
import { cx } from "../../utils/cx";
import { CoffeeCardsConceptPreview } from "../previews/CoffeeCardsConceptPreview";
import { AudienceList } from "../previews/AudienceList";
import { ProgressPreview } from "../previews/ProgressPreview";
import { SectionTag } from "../shared/SectionTag";

export function LandingPageSections() {
  const featuredValue = landingPageValueProps.find((item) => item.featured);
  const supportingValues = landingPageValueProps.filter(
    (item) => !item.featured,
  );
  const accentValueTitle = "Progress you can see";

  return (
    <div data-testid="landing-value-sections" className="grid gap-6">
      <div
        data-testid="landing-why-it-sticks"
        className="rise-in overflow-hidden rounded-[36px] border border-[#304236] bg-[linear-gradient(135deg,rgba(124,167,118,0.12),rgba(255,255,255,0.03))] p-7 sm:p-8 lg:p-9"
      >
        <div className="mx-auto max-w-175 text-center">
          <SectionTag dark>WHY IT STICKS</SectionTag>
          <h2 className="mt-5 font-botanical-display text-[clamp(2.6rem,5vw,4.2rem)] leading-[0.94] text-[#f6ede3]">
            Everything stays clear, practical, and easy to come back to
          </h2>
        </div>
        <div className="mx-auto mt-9 grid max-w-270 gap-4 lg:grid-cols-[minmax(0,0.88fr)_minmax(320px,0.96fr)_minmax(0,0.88fr)] lg:items-start lg:gap-5">
          <div className="grid gap-4">
            {supportingValues.slice(0, 2).map((feature) => (
              <article
                key={feature.title}
                className={cx(
                  "rounded-[28px] border bg-[#111714]/90 text-left shadow-[0_18px_44px_rgba(0,0,0,0.16)]",
                  feature.title === accentValueTitle ?
                    "border-[#cda16e]/18 bg-[linear-gradient(180deg,rgba(205,161,110,0.1),rgba(17,23,20,0.92))] px-5 py-5 shadow-[0_22px_54px_rgba(205,161,110,0.1)]"
                  : "border-white/10 px-5 py-4.5",
                )}
              >
                <h3 className="font-botanical-display text-[1.72rem] leading-[0.98] text-[#f6efe6]">
                  {feature.title}
                </h3>
                <p className="mt-2.5 max-w-[27ch] font-botanical-body text-[14px] leading-6 text-white/66">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>

          <div className="order-first lg:order-0">
            <div className="relative overflow-hidden rounded-4xl border border-[#4f684d] bg-[linear-gradient(180deg,rgba(20,27,23,0.94),rgba(18,25,21,0.78))] p-5 shadow-[0_28px_70px_rgba(0,0,0,0.22)]">
              <div className="pointer-events-none absolute inset-x-12 top-6 h-24 rounded-full bg-[radial-gradient(circle,rgba(205,161,110,0.22),transparent_68%)] blur-2xl" />
              <div className="overflow-hidden rounded-[27px] border border-[#516a51] bg-[#18201c] shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  poster={coffeeTreeGrowthPoster}
                  className="block h-69 w-full object-cover sm:h-79"
                  aria-label="Coffee tree growth animation"
                >
                  <source src={coffeeTreeGrowthVideo} type="video/mp4" />
                </video>
              </div>
              {featuredValue ?
                <article className="relative mt-5 rounded-[26px] border border-[#cda16e]/20 bg-[linear-gradient(180deg,rgba(205,161,110,0.12),rgba(17,23,20,0.86))] px-5 py-4.5 text-left shadow-[0_16px_38px_rgba(205,161,110,0.1)]">
                  <h3 className="font-botanical-display text-[1.82rem] leading-[0.98] text-[#f6efe6]">
                    {featuredValue.title}
                  </h3>
                  <p className="mt-2.5 max-w-[28ch] font-botanical-body text-[14px] leading-6 text-white/69">
                    {featuredValue.description}
                  </p>
                </article>
              : null}
            </div>
          </div>

          <div className="grid gap-4">
            {supportingValues.slice(2).map((feature) => (
              <article
                key={feature.title}
                className={cx(
                  "rounded-[28px] border bg-[#111714]/90 text-left shadow-[0_18px_44px_rgba(0,0,0,0.16)]",
                  feature.title === accentValueTitle ?
                    "border-[#cda16e]/18 bg-[linear-gradient(180deg,rgba(205,161,110,0.1),rgba(17,23,20,0.92))] px-5 py-5 shadow-[0_22px_54px_rgba(205,161,110,0.1)]"
                  : "border-white/10 px-5 py-4.5",
                )}
              >
                <h3 className="font-botanical-display text-[1.72rem] leading-[0.98] text-[#f6efe6]">
                  {feature.title}
                </h3>
                <p className="mt-2.5 max-w-[27ch] font-botanical-body text-[14px] leading-6 text-white/66">
                  {feature.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <div
        data-testid="landing-who-its-for"
        className="rise-in rounded-[36px] border border-white/10 bg-white/5 p-7"
      >
        <div className="mx-auto max-w-190 text-center">
          <SectionTag dark>Who it&apos;s for</SectionTag>
          <h2 className="mt-5 font-botanical-display text-4xl leading-none text-[#f6ede3] sm:text-5xl">
            Curious people who want daily momentum, not a coffee lecture.
          </h2>
        </div>
        <div className="mx-auto mt-6 max-w-190">
          <AudienceList dark />
        </div>
      </div>

      <div
        data-testid="landing-progress-and-recall"
        className="rise-in rounded-[36px] border border-white/10 bg-[#101512] p-7"
      >
        <div className="mx-auto max-w-175 text-center">
          <SectionTag dark>PROGRESS AND RECALL</SectionTag>
          <h2 className="mx-auto mt-5 max-w-[13.5ch] font-botanical-display text-[2.35rem] leading-[0.96] text-[#f6ede3] sm:text-[2.95rem]">
            Quick references and visible growth stay close at hand.
          </h2>
          <p className="mx-auto mt-4 max-w-152 font-botanical-body text-[15px] leading-[1.8] text-white/60 sm:text-[15px]">
            Coffee Cards keep key ideas easy to revisit, while progress stays
            visible in a quieter, secondary role.
          </p>
        </div>
        <div className="mx-auto mt-10 grid w-full max-w-280 gap-5 xl:grid-cols-2">
          <article className="relative flex h-full flex-col overflow-hidden rounded-4xl border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.065),rgba(255,255,255,0.026))] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.025)] lg:p-6">
            <div className="pointer-events-none absolute left-8 top-6 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(205,161,110,0.16),transparent_70%)] blur-2xl" />
            <div className="relative">
              <p className="font-botanical-body text-[11px] uppercase tracking-[0.28em] text-[#c8b18d]">
                COFFEE CARDS
              </p>
              <h3 className="mt-3 max-w-[13.5ch] font-botanical-display text-[1.82rem] leading-[0.98] text-[#f6ede3] sm:text-[2.08rem]">
                Reusable reference, without extra noise.
              </h3>
              <p className="mt-3 max-w-[24rem] font-botanical-body text-[14px] leading-[1.72] text-white/62 sm:text-[14.5px]">
                Key ideas stay ready for a quick return, with calm spacing and
                simple card shapes that feel collectible, clear, and worth
                keeping close.
              </p>
            </div>
            <div className="relative mt-auto pt-8">
              <CoffeeCardsConceptPreview />
            </div>
          </article>

          <article className="relative flex h-full flex-col overflow-hidden rounded-4xl border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.065),rgba(255,255,255,0.026))] p-5 shadow-[0_24px_60px_rgba(0,0,0,0.18),inset_0_1px_0_rgba(255,255,255,0.025)] lg:p-6">
            <div className="pointer-events-none absolute right-8 top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(124,167,118,0.14),transparent_72%)] blur-2xl" />
            <div className="relative">
              <p className="font-botanical-body text-[11px] uppercase tracking-[0.28em] text-[#c8b18d]">
                VISIBLE PROGRESS
              </p>
              <h3 className="mt-3 max-w-[13.5ch] font-botanical-display text-[1.82rem] leading-[0.98] text-[#f6ede3] sm:text-[2.08rem]">
                Small lessons, visible growth
              </h3>
              <p className="mt-3 max-w-[24rem] font-botanical-body text-[14px] leading-[1.72] text-white/62 sm:text-[14.5px]">
                Progress stays easy to notice, giving the learning path a calm
                sense of steady momentum.
              </p>
            </div>
            <div className="mt-auto pt-8">
              <div className="rounded-[28px] border border-[#36453c] bg-[linear-gradient(180deg,rgba(20,27,23,0.95),rgba(15,21,17,0.91))] p-4 shadow-[0_20px_52px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.02)] sm:p-5">
                <ProgressPreview dark theme="forest" compact />
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
