import { features, howItWorks, stats } from '../content'
import {
  AudienceList,
  CoffeeCardsPreview,
  Footer,
  LessonPreview,
  PhoneMockup,
  ProgressPreview,
  QuizPreview,
  SectionTag,
  TreePreview,
  WaitlistForm,
} from '../components/SharedSections'

export function DesignOne() {
  return (
    <main className="relative overflow-hidden bg-[#f6efe6] text-[#2e2016]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(208,155,98,0.18),transparent_34%),radial-gradient(circle_at_85%_12%,rgba(255,255,255,0.85),transparent_20%)]" />
      <div className="coffee-grid relative mx-auto flex min-h-screen w-full max-w-[1200px] flex-col px-5 pb-28 pt-5 sm:px-8 lg:px-10">
        <header className="rise-in flex items-center justify-between py-4">
          <div>
            <p className="font-clean text-[11px] uppercase tracking-[0.3em] text-[#8e7159]">
              Coffee Quest
            </p>
            <p className="font-editorial text-lg text-[#35261b]">Coffee, clearly.</p>
          </div>
          <a
            href="#waitlist"
            className="font-clean rounded-full border border-[#d7c4b0] bg-white/70 px-4 py-2 text-sm text-[#3a2a1f] transition hover:bg-white"
          >
            Join the waitlist
          </a>
        </header>

        <section className="grid gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-16">
          <div className="rise-in space-y-7">
            <SectionTag>Pre-launch learning app</SectionTag>
            <div className="space-y-5">
              <h1 className="font-editorial max-w-[10ch] text-5xl leading-none tracking-[-0.04em] text-[#26180f] sm:text-6xl">
                Learn coffee step by step in just a few minutes a day.
              </h1>
              <p className="font-clean max-w-xl text-lg leading-8 text-[#614c3d]">
                Coffee Quest is a step-by-step coffee learning app for beginners. Short daily lessons and quick mini-games teach beans, roast, brewing, and taste without jargon or overwhelm.
              </p>
            </div>
            <WaitlistForm />
            <div className="flex flex-wrap gap-3">
              {stats.map((stat) => (
                <span
                  key={stat}
                  className="font-clean rounded-full border border-[#dbc8b6] bg-white/75 px-4 py-2 text-sm text-[#6e5847]"
                >
                  {stat}
                </span>
              ))}
            </div>
          </div>

          <div className="rise-in delay-2 relative mx-auto flex w-full max-w-[520px] justify-center pb-10 pt-2">
            <div className="absolute inset-x-10 top-8 h-72 rounded-[42px] bg-[#ead7c3]" />
            <div className="relative z-10 flex items-end gap-4">
              <div className="hidden translate-y-8 lg:block">
                <PhoneMockup title="Mini-game" subtitle="Roast check">
                  <QuizPreview />
                </PhoneMockup>
              </div>
              <PhoneMockup title="Today" subtitle="Light roast">
                <LessonPreview />
              </PhoneMockup>
              <div className="absolute -bottom-3 -right-2 hidden w-[220px] lg:block">
                <TreePreview />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 py-10 lg:grid-cols-3">
          {howItWorks.map((step, index) => (
            <article
              key={step.title}
              className="rise-in rounded-[28px] border border-[#dfcfbf] bg-white/82 p-6 shadow-[0_24px_60px_rgba(60,36,21,0.08)]"
            >
              <p className="font-clean text-[11px] uppercase tracking-[0.28em] text-[#a17045]">
                How it works {index + 1}
              </p>
              <h2 className="font-editorial mt-4 text-3xl text-[#2a1b10]">
                {step.title}
              </h2>
              <p className="font-clean mt-4 text-base leading-7 text-[#655243]">
                {step.description}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 py-12 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rise-in rounded-[34px] border border-[#e1d3c6] bg-[#fffaf3] p-7">
            <SectionTag>Feature highlights</SectionTag>
            <div className="mt-6 space-y-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="rounded-[24px] border border-[#ebdfd2] bg-white px-5 py-5"
                >
                  <div className="font-clean flex items-center gap-3 text-sm text-[#9b6a42]">
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-[#f4e4d2] text-[#7d4d24]">
                      {index + 1}
                    </span>
                    Highlight
                  </div>
                  <h3 className="font-editorial mt-4 text-2xl text-[#2d1d13]">
                    {feature.title}
                  </h3>
                  <p className="font-clean mt-3 max-w-xl text-base leading-7 text-[#6d594b]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rise-in rounded-[34px] border border-[#e1d3c6] bg-white/80 p-7">
              <SectionTag>App preview</SectionTag>
              <div className="mt-6 grid gap-5 lg:grid-cols-2">
                <PhoneMockup title="Path" subtitle="Your progress">
                  <ProgressPreview />
                </PhoneMockup>
                <div className="space-y-5">
                  <CoffeeCardsPreview />
                </div>
              </div>
            </div>

            <div className="rise-in rounded-[34px] border border-[#e1d3c6] bg-[#f1e4d6] p-7">
              <SectionTag>Who it&apos;s for</SectionTag>
              <h2 className="font-editorial mt-5 text-4xl text-[#26180f]">
                Designed for curious coffee drinkers who want structure, not stress.
              </h2>
              <p className="font-clean mt-4 max-w-xl text-base leading-7 text-[#634f41]">
                Coffee Quest is the easy first step before blogs, gear rabbit holes, or café jargon starts to feel confusing.
              </p>
              <div className="mt-6">
                <AudienceList />
              </div>
            </div>
          </div>
        </section>

        <section
          id="waitlist"
          className="rise-in rounded-[36px] border border-[#d7c2ae] bg-[#2f2118] px-6 py-10 text-[#f8efe6] sm:px-8 lg:px-10"
        >
          <SectionTag dark>Final call</SectionTag>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="font-editorial max-w-[10ch] text-4xl leading-none sm:text-5xl">
                Join the waitlist and start your coffee basics journey early.
              </h2>
              <p className="font-clean mt-4 max-w-2xl text-base leading-7 text-[#e5d3c1]">
                Be first to hear when Coffee Quest opens. Early subscribers get launch updates, preview lessons, and a front-row seat for the first brew path.
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
