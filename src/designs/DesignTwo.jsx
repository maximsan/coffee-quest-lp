import { features, howItWorks } from '../content'
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
} from '../components/SharedSections'

export function DesignTwo() {
  return (
    <main className="relative overflow-hidden bg-[#17110d] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(216,147,86,0.22),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_24%),linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[length:auto,auto,48px_48px,48px_48px]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1240px] flex-col px-5 pb-28 pt-5 sm:px-8 lg:px-10">
        <header className="rise-in flex items-center justify-between py-4">
          <div>
            <p className="font-guide-body text-[11px] uppercase tracking-[0.34em] text-[#c89f71]">
              Coffee Quest
            </p>
            <p className="font-guide-display text-xl">Beginner brew map</p>
          </div>
          <a
            href="#signup-two"
            className="font-guide-body rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/86 transition hover:border-white/30 hover:bg-white/10"
          >
            Join the waitlist
          </a>
        </header>

        <section className="grid gap-10 py-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:py-16">
          <div className="rise-in space-y-6">
            <SectionTag dark>Structured learning for beginners</SectionTag>
            <h1 className="font-guide-display max-w-[11ch] text-5xl leading-[0.95] tracking-[-0.05em] text-[#f7efe5] sm:text-7xl">
              Coffee confidence, one small quest at a time.
            </h1>
            <p className="font-guide-body max-w-xl text-lg leading-8 text-white/72">
              Coffee Quest teaches beans, roast, brewing, and taste through short lessons, quick mini-games, and visible progress so beginners always know what to learn next.
            </p>
            <WaitlistForm dark />
          </div>

          <div className="rise-in delay-2 grid gap-4">
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="font-guide-body text-[11px] uppercase tracking-[0.26em] text-[#caa274]">
                    Daily route
                  </p>
                  <h2 className="font-guide-display mt-2 text-3xl text-[#faf3ea]">
                    Learn coffee step by step in just a few minutes a day.
                  </h2>
                </div>
                <div className="h-14 w-14 rounded-3xl bg-[linear-gradient(145deg,#d39c62,rgba(255,255,255,0.04))]" />
              </div>
              <div className="grid gap-3">
                {howItWorks.map((step, index) => (
                  <div
                    key={step.title}
                    className="rounded-[22px] border border-white/10 bg-[#110c09] p-4"
                  >
                    <p className="font-guide-body text-[11px] uppercase tracking-[0.24em] text-[#d8b186]">
                      Stage {index + 1}
                    </p>
                    <h3 className="font-guide-display mt-2 text-2xl text-white">
                      {step.title}
                    </h3>
                    <p className="font-guide-body mt-3 text-sm leading-7 text-white/64">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 py-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="rise-in rounded-[34px] border border-white/10 bg-[#130e0b] p-6">
            <SectionTag dark>App mockups</SectionTag>
            <div className="mt-6 flex flex-col items-center gap-5 xl:flex-row xl:items-end">
              <PhoneMockup dark title="Lesson" subtitle="Beans and origin">
                <LessonPreview dark />
              </PhoneMockup>
              <PhoneMockup dark title="Progress" subtitle="Quest path">
                <ProgressPreview dark />
              </PhoneMockup>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rise-in rounded-[34px] border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <SectionTag dark>Feature highlights</SectionTag>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {features.map((feature) => (
                  <article
                    key={feature.title}
                    className="rounded-[24px] border border-white/10 bg-[#120c09] p-5"
                  >
                    <h3 className="font-guide-display text-2xl text-[#fbf4ea]">
                      {feature.title}
                    </h3>
                    <p className="font-guide-body mt-3 text-sm leading-7 text-white/62">
                      {feature.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
              <div className="rise-in rounded-[34px] border border-white/10 bg-[#120c09] p-6">
                <SectionTag dark>Who it&apos;s for</SectionTag>
                <h2 className="font-guide-display mt-5 text-4xl leading-none text-[#fbf4ea]">
                  Made for curious drinkers, not coffee experts.
                </h2>
                <div className="mt-6">
                  <AudienceList dark />
                </div>
              </div>

              <div className="rise-in grid gap-6">
                <div className="rounded-[34px] border border-white/10 bg-[#120c09] p-6">
                  <SectionTag dark>Coffee Cards</SectionTag>
                  <div className="mt-5">
                    <CoffeeCardsPreview dark />
                  </div>
                </div>
                <div className="rounded-[34px] border border-white/10 bg-[#120c09] p-6">
                  <SectionTag dark>Coffee tree growth</SectionTag>
                  <div className="mt-5">
                    <TreePreview dark />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="signup-two"
          className="rise-in rounded-[38px] border border-[#3d2c22] bg-[linear-gradient(135deg,#2a1d16,#110c09)] px-6 py-10 sm:px-8 lg:px-10"
        >
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <SectionTag dark>Final CTA</SectionTag>
              <h2 className="font-guide-display mt-5 max-w-[11ch] text-4xl leading-none text-[#fbf4ea] sm:text-5xl">
                Join early and learn coffee with a clear map from day one.
              </h2>
              <p className="font-guide-body mt-4 max-w-2xl text-base leading-7 text-white/68">
                Sign up for launch updates, early invites, and a first look at the daily lessons that make coffee feel approachable.
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
  )
}
