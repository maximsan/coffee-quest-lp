import { features, howItWorks } from '../content'
import {
  AudienceList,
  CoffeeCardsPreview,
  Footer,
  ProgressPreview,
  QuizPreview,
  SectionTag,
  TreePreview,
  WaitlistForm,
} from '../components/SharedSections'

export function DesignFour() {
  return (
    <main className="relative overflow-hidden bg-[#f2e8db] text-[#281d15]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(0deg,rgba(117,79,49,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(117,79,49,0.06)_1px,transparent_1px)] bg-[size:28px_28px]" />
      <div className="paper-texture relative mx-auto flex min-h-screen w-full max-w-[1240px] flex-col px-5 pb-28 pt-5 sm:px-8 lg:px-10">
        <header className="rise-in flex items-center justify-between py-4">
          <div className="rounded-full border border-[#cbb39f] bg-[#f8f1e8] px-4 py-2">
            <p className="font-notebook-body text-[11px] uppercase tracking-[0.32em] text-[#8d6548]">
              Coffee Quest
            </p>
            <p className="font-notebook-display text-lg text-[#2d1d13]">Field notes for beginners</p>
          </div>
          <a
            href="#waitlist-four"
            className="font-notebook-body rounded-full border border-[#cbb39f] bg-[#fffdf8] px-4 py-2 text-sm text-[#36251a] transition hover:bg-white"
          >
            Join the waitlist
          </a>
        </header>

        <section className="grid gap-8 py-10 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
          <div className="rise-in space-y-5">
            <SectionTag>Pre-launch landing page</SectionTag>
            <div className="max-w-3xl rounded-[32px] border border-[#ccb5a3] bg-[#fffaf4] p-7 shadow-[10px_10px_0_rgba(146,101,67,0.12)] sm:p-9">
              <p className="font-notebook-body text-[11px] uppercase tracking-[0.34em] text-[#916746]">
                Main message
              </p>
              <h1 className="font-notebook-display mt-5 max-w-[11ch] text-5xl leading-[0.94] tracking-[-0.04em] text-[#25170f] sm:text-7xl">
                Learn coffee step by step in just a few minutes a day.
              </h1>
              <p className="font-notebook-body mt-5 max-w-xl text-lg leading-8 text-[#5f4b3d]">
                Coffee Quest helps beginners understand beans, roast, brewing, and taste through short lessons, playful mini-games, and visible progress you can actually feel.
              </p>
              <div className="mt-7">
                <WaitlistForm />
              </div>
            </div>
          </div>

          <div className="rise-in delay-2 grid gap-4">
            <article className="rotate-[-1.5deg] rounded-[28px] border border-[#ccb5a3] bg-[#fffdf8] p-5 shadow-[12px_12px_0_rgba(146,101,67,0.1)]">
              <p className="font-notebook-body text-[11px] uppercase tracking-[0.28em] text-[#8d6548]">
                How it works
              </p>
              <div className="mt-4 space-y-4">
                {howItWorks.map((step, index) => (
                  <div key={step.title} className="rounded-[22px] border border-[#dbc7b5] bg-[#f8f0e6] p-4">
                    <div className="flex items-center gap-3">
                      <span className="font-notebook-body grid h-8 w-8 place-items-center rounded-full bg-[#2f2118] text-xs text-[#f8efe6]">
                        {index + 1}
                      </span>
                      <h2 className="font-notebook-display text-3xl leading-none text-[#2b190e]">
                        {step.title}
                      </h2>
                    </div>
                    <p className="font-notebook-body mt-3 text-base leading-7 text-[#645142]">
                      {step.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="grid gap-6 py-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rise-in grid gap-6">
            <article className="rotate-[1deg] rounded-[30px] border border-[#ccb5a3] bg-[#fffdf8] p-6 shadow-[12px_12px_0_rgba(146,101,67,0.1)]">
              <SectionTag>Feature highlights</SectionTag>
              <div className="mt-5 grid gap-4">
                {features.map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-[22px] border border-[#dbc7b5] bg-[#f8f0e6] p-5"
                  >
                    <h3 className="font-notebook-display text-3xl leading-none text-[#28180e]">
                      {feature.title}
                    </h3>
                    <p className="font-notebook-body mt-3 text-base leading-7 text-[#665243]">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <article className="rotate-[-1deg] rounded-[30px] border border-[#ccb5a3] bg-[#f8f0e6] p-6 shadow-[12px_12px_0_rgba(146,101,67,0.1)]">
              <SectionTag>Who it&apos;s for</SectionTag>
              <h2 className="font-notebook-display mt-5 text-5xl leading-none text-[#28180e]">
                Beginners who want friendly structure and a reason to keep going.
              </h2>
              <div className="mt-6">
                <AudienceList />
              </div>
            </article>
          </div>

          <div className="rise-in grid gap-6">
            <article className="rotate-[1deg] rounded-[30px] border border-[#ccb5a3] bg-[#fffdf8] p-6 shadow-[12px_12px_0_rgba(146,101,67,0.1)]">
              <SectionTag>App mockups</SectionTag>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[24px] border border-[#dbc7b5] bg-[#f8f0e6] p-4">
                  <QuizPreview />
                </div>
                <div className="rounded-[24px] border border-[#dbc7b5] bg-[#f8f0e6] p-4">
                  <ProgressPreview />
                </div>
              </div>
            </article>

            <article className="rotate-[-1deg] rounded-[30px] border border-[#ccb5a3] bg-[#fffdf8] p-6 shadow-[12px_12px_0_rgba(146,101,67,0.1)]">
              <SectionTag>Coffee Cards</SectionTag>
              <div className="mt-5">
                <CoffeeCardsPreview />
              </div>
            </article>

            <article className="rotate-[1deg] rounded-[30px] border border-[#ccb5a3] bg-[#fffdf8] p-6 shadow-[12px_12px_0_rgba(146,101,67,0.1)]">
              <SectionTag>Coffee tree growth</SectionTag>
              <div className="mt-5">
                <TreePreview />
              </div>
            </article>
          </div>
        </section>

        <section
          id="waitlist-four"
          className="rise-in rounded-[34px] border border-[#8f6648] bg-[#2f2118] px-6 py-10 text-[#f8efe6] shadow-[14px_14px_0_rgba(99,63,39,0.18)] sm:px-8 lg:px-10"
        >
          <SectionTag dark>Final CTA</SectionTag>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="font-notebook-display max-w-[11ch] text-5xl leading-none text-[#fff6ed]">
                Join the waitlist and get the first pages of the quest.
              </h2>
              <p className="font-notebook-body mt-4 max-w-2xl text-base leading-7 text-[#e7d4c0]">
                Coffee Quest is coming soon. Join early if you want beginner-friendly coffee lessons that feel clear, warm, and encouraging from the start.
              </p>
            </div>
            <div className="w-full max-w-xl">
              <WaitlistForm dark compact />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
