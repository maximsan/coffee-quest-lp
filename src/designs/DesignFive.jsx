import { features } from "../content";
import {
  AudienceList,
  CoffeeCardsPreview,
  Footer,
  LessonPreview,
  PhoneMockup,
  ProgressPreview,
  SectionTag,
  TreePreview,
  WaitlistForm,
} from "../components/SharedSections";

export function DesignFive() {
  return (
    <main className="relative overflow-hidden bg-[#0d120f] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(117,160,111,0.26),transparent_18%),radial-gradient(circle_at_82%_16%,rgba(205,161,110,0.18),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(180deg,#0d120f,#111815_40%,#171d19)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1220px] flex-col px-5 pb-28 pt-5 sm:px-8 lg:px-10">
        <header className="rise-in flex items-center justify-between py-4">
          <div>
            <p className="font-botanical-body text-[11px] uppercase tracking-[0.34em] text-[#c8b18d]">
              Coffee Quest
            </p>
            <p className="font-botanical-display text-xl text-[#f4eadf]">
              Grow your coffee sense.
            </p>
          </div>
          <a
            href="#waitlist-five"
            className="hidden md:block font-botanical-body rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/86 transition hover:border-white/25 hover:bg-white/10"
          >
            Join the waitlist
          </a>
        </header>

        <section className="grid gap-10 lg:grid-cols-[1fr_0.96fr] lg:items-center py-4 md:py-12 lg:py-16">
          <div className="rise-in space-y-6">
            <SectionTag dark>Structured learning for beginners</SectionTag>
            <h1 className="font-botanical-display max-w-[11ch] text-5xl leading-[0.92] tracking-[-0.05em] text-[#f4eadf] sm:text-7xl">
              A beginner coffee app that feels clear from the first sip.
            </h1>
            <p className="font-botanical-body max-w-xl text-lg leading-8 text-white/72">
              Coffee Quest uses short daily lessons, quick mini-games, Coffee
              Cards, and a growing coffee tree to turn coffee basics into a
              habit you can actually keep.
            </p>
            <div className="w-full max-w-xl mt-4">
              <WaitlistForm dark />
            </div>
          </div>

          <div className="rise-in delay-2 relative mx-auto flex w-full max-w-[520px] justify-center">
            <div className="absolute inset-8 rounded-[42px] border border-white/10 bg-white/5 blur-3xl" />
            <div className="relative z-10 grid gap-0 md:gap-4 lg:grid-cols-[0.95fr_1.05fr]">
              <div className="flex items-center space-y-4">
                <PhoneMockup dark title="Today" subtitle="Brewing basics">
                  <LessonPreview dark />
                </PhoneMockup>
              </div>
              <div className="space-y-4 pt-10">
                <div className="rounded-[30px] border border-white/10 bg-white/5 p-4">
                  <TreePreview dark />
                </div>
                <div className="rounded-[30px] border border-white/10 bg-white/5 p-4">
                  <ProgressPreview dark />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 py-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="rise-in rounded-[36px] border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
            <SectionTag dark>How it works</SectionTag>
            <div className="mt-6 space-y-4">
              {[
                {
                  title: "One lesson, one concept",
                  description:
                    "Each day starts with a short lesson that introduces one coffee idea at a beginner-friendly pace.",
                },
                {
                  title: "One mini-game, one memory",
                  description:
                    "Fast challenges help terms stick so coffee basics feel familiar, not fuzzy.",
                },
                {
                  title: "One visible sign of progress",
                  description:
                    "Your coffee tree and path make learning feel tangible, which makes it easier to return tomorrow.",
                },
              ].map((step) => (
                <article
                  key={step.title}
                  className="rounded-[28px] border border-white/10 bg-[#111714] p-5"
                >
                  <h2 className="font-botanical-display text-3xl leading-none text-[#f7efe4]">
                    {step.title}
                  </h2>
                  <p className="font-botanical-body mt-3 text-base leading-7 text-white/66">
                    {step.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rise-in rounded-[36px] border border-[#304236] bg-[linear-gradient(135deg,rgba(124,167,118,0.12),rgba(255,255,255,0.03))] p-7">
              <SectionTag dark>Feature highlights</SectionTag>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {features.map((feature) => (
                  <article
                    key={feature.title}
                    className="rounded-[26px] border border-white/10 bg-[#101512] p-5"
                  >
                    <h3 className="font-botanical-display text-2xl text-[#f6efe6]">
                      {feature.title}
                    </h3>
                    <p className="font-botanical-body mt-3 text-sm leading-7 text-white/62">
                      {feature.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr]">
              <div className="rise-in rounded-[36px] border border-white/10 bg-white/5 p-7">
                <SectionTag dark>Who it&apos;s for</SectionTag>
                <h2 className="font-botanical-display mt-5 text-4xl leading-none text-[#f6ede3]">
                  Curious people who want daily momentum, not a coffee lecture.
                </h2>
                <div className="mt-6">
                  <AudienceList dark />
                </div>
              </div>

              <div className="rise-in rounded-[36px] border border-white/10 bg-[#101512] p-7">
                <SectionTag dark>Coffee Cards</SectionTag>
                <div className="mt-6">
                  <CoffeeCardsPreview dark />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="waitlist-five"
          className="rise-in rounded-[40px] border border-[#324337] bg-[linear-gradient(135deg,#111814,#1d241f)] px-6 py-10 sm:px-8 lg:px-10"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <SectionTag dark>Final CTA</SectionTag>
              <h2 className="font-botanical-display mt-5 text-5xl leading-none text-[#f6ede3]">
                Join the waitlist and grow your coffee basics from the ground
                up.
              </h2>
              <p className="font-botanical-body mt-4 max-w-2xl text-base leading-7 text-white/68">
                Coffee Quest is still in phase one, but the first learners can
                help shape a clearer way into coffee knowledge.
              </p>
            </div>
            <div className="w-full max-w-xl">
              <WaitlistForm dark compact />
            </div>
          </div>
        </section>

        <Footer dark />
      </div>
    </main>
  );
}
