import coffeeTreeGrowthVideo from "../../assets/Flowerpot_seed_to.mp4";
import { landingPageValueProps } from "../../data/landingPageContent";
import { AudienceList } from "../previews/AudienceList";
import { CoffeeCardsPreview } from "../previews/CoffeeCardsPreview";
import { ProgressPreview } from "../previews/ProgressPreview";
import { SectionTag } from "../shared/SectionTag";

export function LandingPageSections() {
  const featuredValue = landingPageValueProps.find((item) => item.featured);
  const supportingValues = landingPageValueProps.filter((item) => !item.featured);
  const accentValueTitle = "Progress you can see";

  return (
    <div className="grid gap-6">
      <div className="rise-in overflow-hidden rounded-[36px] border border-[#304236] bg-[linear-gradient(135deg,rgba(124,167,118,0.12),rgba(255,255,255,0.03))] p-7 sm:p-8 lg:p-9">
        <div className="mx-auto max-w-[700px] text-center">
          <SectionTag dark>WHY IT STICKS</SectionTag>
          <h2 className="mt-5 font-botanical-display text-[clamp(2.6rem,5vw,4.2rem)] leading-[0.94] text-[#f6ede3]">
            Everything stays clear, practical, and easy to come back to
          </h2>
        </div>
        <div className="mx-auto mt-9 grid max-w-[1080px] gap-4 lg:grid-cols-[minmax(0,0.88fr)_minmax(320px,0.96fr)_minmax(0,0.88fr)] lg:items-start lg:gap-5">
          <div className="grid gap-4">
            {supportingValues.slice(0, 2).map((feature) => (
              <article
                key={feature.title}
                className={[
                  "rounded-[28px] border bg-[#111714]/90 text-left shadow-[0_18px_44px_rgba(0,0,0,0.16)]",
                  feature.title === accentValueTitle
                    ? "border-[#cda16e]/18 bg-[linear-gradient(180deg,rgba(205,161,110,0.1),rgba(17,23,20,0.92))] px-5 py-5 shadow-[0_22px_54px_rgba(205,161,110,0.1)]"
                    : "border-white/10 px-5 py-4.5",
                ].join(" ")}
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

          <div className="order-first lg:order-none">
            <div className="relative overflow-hidden rounded-[32px] border border-[#4f684d] bg-[linear-gradient(180deg,rgba(20,27,23,0.94),rgba(18,25,21,0.78))] p-5 shadow-[0_28px_70px_rgba(0,0,0,0.22)]">
              <div className="pointer-events-none absolute inset-x-12 top-6 h-24 rounded-full bg-[radial-gradient(circle,rgba(205,161,110,0.22),transparent_68%)] blur-2xl" />
              <div className="overflow-hidden rounded-[27px] border border-[#516a51] bg-[#18201c] shadow-[0_18px_50px_rgba(0,0,0,0.24)]">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="auto"
                  className="block h-[276px] w-full object-cover sm:h-[316px]"
                  aria-label="Coffee tree growth animation"
                >
                  <source src={coffeeTreeGrowthVideo} type="video/mp4" />
                </video>
              </div>
              {featuredValue ? (
                <article className="relative mt-5 rounded-[26px] border border-[#cda16e]/20 bg-[linear-gradient(180deg,rgba(205,161,110,0.12),rgba(17,23,20,0.86))] px-5 py-4.5 text-left shadow-[0_16px_38px_rgba(205,161,110,0.1)]">
                  <h3 className="font-botanical-display text-[1.82rem] leading-[0.98] text-[#f6efe6]">
                    {featuredValue.title}
                  </h3>
                  <p className="mt-2.5 max-w-[28ch] font-botanical-body text-[14px] leading-6 text-white/69">
                    {featuredValue.description}
                  </p>
                </article>
              ) : null}
            </div>
          </div>

          <div className="grid gap-4">
            {supportingValues.slice(2).map((feature) => (
              <article
                key={feature.title}
                className={[
                  "rounded-[28px] border bg-[#111714]/90 text-left shadow-[0_18px_44px_rgba(0,0,0,0.16)]",
                  feature.title === accentValueTitle
                    ? "border-[#cda16e]/18 bg-[linear-gradient(180deg,rgba(205,161,110,0.1),rgba(17,23,20,0.92))] px-5 py-5 shadow-[0_22px_54px_rgba(205,161,110,0.1)]"
                    : "border-white/10 px-5 py-4.5",
                ].join(" ")}
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

      <div className="rise-in rounded-[36px] border border-white/10 bg-white/5 p-7">
        <div className="mx-auto max-w-[760px] text-center">
          <SectionTag dark>Who it&apos;s for</SectionTag>
          <h2 className="mt-5 font-botanical-display text-4xl leading-none text-[#f6ede3] sm:text-5xl">
            Curious people who want daily momentum, not a coffee lecture.
          </h2>
        </div>
        <div className="mx-auto mt-6 max-w-[760px]">
          <AudienceList dark />
        </div>
      </div>

      <div className="rise-in rounded-[36px] border border-white/10 bg-[#101512] p-7">
        <div className="mx-auto max-w-[760px] text-center">
          <SectionTag dark>Progress and recall</SectionTag>
          <h2 className="mt-5 font-botanical-display text-4xl leading-none text-[#f6ede3] sm:text-5xl">
            Quick references and visible growth stay close at hand.
          </h2>
          <p className="mt-4 font-botanical-body text-base leading-7 text-white/62">
            Coffee Cards help key ideas stay reviewable, while the growth
            visual keeps progress present without overpowering the page.
          </p>
        </div>
        <div className="mx-auto mt-6 grid max-w-[760px] gap-4">
          <div className="rounded-[30px] border border-white/10 bg-white/5 p-4">
            <div className="overflow-hidden rounded-[24px] border border-[#516a51] bg-[#18201c] shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="block h-auto w-full"
                aria-label="Coffee tree growth animation"
              >
                <source src={coffeeTreeGrowthVideo} type="video/mp4" />
              </video>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-6 grid w-full max-w-[1120px] gap-4 2xl:grid-cols-[minmax(0,500px)_minmax(0,560px)] 2xl:justify-center">
          <div className="rounded-[30px] border border-white/10 bg-white/5 p-4 lg:p-5">
            <div className="rounded-[22px] border border-white/10 bg-[#111714] p-5 lg:p-6">
              <p className="font-botanical-body text-[11px] uppercase tracking-[0.28em] text-[#c8b18d]">
                Progress snapshot
              </p>
              <h3 className="mt-3 max-w-[16ch] font-botanical-display text-3xl leading-none text-[#f6ede3] sm:text-[2.2rem]">
                Small lessons, visible growth
              </h3>
              <p className="mt-3 max-w-[34rem] font-botanical-body text-sm leading-7 text-white/62 sm:text-[15px]">
                The coffee tree stays secondary to the learning path, but it
                now remains clearly visible as a calm metaphor for steady
                progress.
              </p>
              <div className="mt-5">
                <ProgressPreview dark />
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-4 lg:p-5">
            <div className="mx-auto max-w-[720px] text-center">
              <p className="font-botanical-body text-[11px] uppercase tracking-[0.28em] text-[#c8b18d]">
                Coffee Cards
              </p>
              <h3 className="mt-3 font-botanical-display text-3xl leading-none text-[#f6ede3] sm:text-[2.2rem]">
                Keep the essentials close.
              </h3>
            </div>
            <div className="mx-auto mt-5 max-w-[720px]">
              <CoffeeCardsPreview dark />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
