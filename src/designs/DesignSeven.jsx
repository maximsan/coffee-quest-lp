import { features } from '../content'
import {
  AudienceList,
  CoffeeCardsPreview,
  Footer,
  LessonPreview,
  PhoneMockup,
  QuizPreview,
  SectionTag,
  TreePreview,
  WaitlistForm,
} from '../components/SharedSections'
import { useParallax } from '../hooks/useParallax'

const steps = [
  {
    title: 'One concept at a time',
    body: 'Daily lessons keep the pace gentle so beginners can build confidence without feeling behind.',
  },
  {
    title: 'A quick game right after',
    body: 'Mini-games turn recognition into memory while the lesson is still fresh.',
  },
  {
    title: 'Progress you can see',
    body: 'Coffee Cards and your tree growth make the learning path feel rewarding and easy to rejoin.',
  },
]

export function DesignSeven() {
  const slow = useParallax(0.06)
  const medium = useParallax(0.12)

  return (
    <main className="relative overflow-hidden bg-[#0d120f] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_15%,rgba(124,167,118,0.18),transparent_20%),radial-gradient(circle_at_82%_18%,rgba(244,234,223,0.08),transparent_18%),linear-gradient(180deg,#0d120f,#111815_40%,#181f1c)]" />
      <div
        className="pointer-events-none absolute left-[8%] top-24 h-44 w-44 rounded-full bg-[#7ca776]/14 blur-3xl"
        style={{ transform: `translateY(${slow}px)` }}
      />
      <div
        className="pointer-events-none absolute right-[8%] top-44 h-56 w-56 rounded-full bg-[#dce6d7]/7 blur-3xl"
        style={{ transform: `translateY(${-medium}px)` }}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1220px] flex-col px-5 pb-28 pt-5 sm:px-8 lg:px-10">
        <header className="rise-in flex items-center justify-between py-4">
          <div>
            <p className="font-botanical-body text-[11px] uppercase tracking-[0.34em] text-[#c8b18d]">
              Coffee Quest
            </p>
            <p className="font-botanical-display text-xl text-[#f4eadf]">
              A steadier path into coffee.
            </p>
          </div>
          <a
            href="#waitlist-seven"
            className="font-botanical-body rounded-full border border-[#314038] bg-[#131916]/82 px-4 py-2 text-sm text-[#edf3eb] transition hover:border-[#435548] hover:bg-[#18201c]"
          >
            Join the waitlist
          </a>
        </header>

        <section className="grid gap-8 py-10 lg:grid-cols-[1fr_1fr] lg:items-center lg:py-16">
          <div className="hero-stagger space-y-6">
            <SectionTag dark theme="forest">Refined dark concept</SectionTag>
            <h1 className="font-botanical-display max-w-[10ch] text-5xl leading-[0.9] tracking-[-0.05em] text-[#f4eadf] sm:text-7xl">
              Coffee basics with a more elegant rhythm.
            </h1>
            <p className="font-botanical-body max-w-xl text-lg leading-8 text-[#d4ddd2]">
              Coffee Quest turns beginner coffee learning into a daily practice with clear lessons, playful checks, and visual progress that feels calm instead of chaotic.
            </p>
            <WaitlistForm dark theme="forest" />
          </div>

          <div className="rise-in delay-3">
            <div className="glass-panel-dark rounded-[42px] border border-[#314038] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="font-botanical-body text-[11px] uppercase tracking-[0.28em] text-[#c8b18d]">
                    Hero cluster
                  </p>
                  <h2 className="font-botanical-display mt-2 text-3xl text-[#f7efe4]">
                    Centered, calm, and clearly paced
                  </h2>
                </div>
                <div className="rounded-full border border-[#314038] bg-[#131916]/82 px-3 py-1 text-sm text-[#d6e3d4]">
                  Daily flow
                </div>
              </div>

              <div className="grid items-center gap-5 xl:grid-cols-[auto_1fr]">
                <div className="flex justify-center">
                  <PhoneMockup
                    dark
                    theme="forest"
                    accent="#7ca776"
                    title="Lesson"
                    subtitle="Roast and taste"
                  >
                    <LessonPreview dark theme="forest" />
                  </PhoneMockup>
                </div>

                <div className="grid gap-4">
                  <div className="glass-panel-dark rounded-[28px] border border-[#314038] p-4">
                    <QuizPreview dark theme="forest" />
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="glass-panel-dark rounded-[28px] border border-[#314038] p-4">
                      <TreePreview dark theme="forest" />
                    </div>
                    <div className="glass-panel-dark rounded-[28px] border border-[#314038] p-4">
                      <CoffeeCardsPreview dark theme="forest" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 py-10 lg:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rise-in glass-panel-dark rounded-[32px] border border-[#314038] p-6"
            >
              <p className="font-botanical-body text-[11px] uppercase tracking-[0.28em] text-[#c8b18d]">
                How it works {index + 1}
              </p>
              <h2 className="font-botanical-display mt-4 text-3xl leading-none text-[#f7efe4]">
                {step.title}
              </h2>
              <p className="font-botanical-body mt-4 text-base leading-7 text-[#d4ddd2]">
                {step.body}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 py-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rise-in glass-panel-dark rounded-[36px] border border-[#314038] p-7">
            <SectionTag dark theme="forest">Who it&apos;s for</SectionTag>
            <h2 className="font-botanical-display mt-5 text-4xl leading-none text-[#f6ede3]">
              Curious drinkers who want coffee basics to feel more refined and less overwhelming.
            </h2>
            <div className="mt-6">
              <AudienceList dark theme="forest" />
            </div>
          </div>

          <div className="rise-in glass-panel-dark rounded-[36px] border border-[#314038] p-7">
            <SectionTag dark theme="forest">Feature highlights</SectionTag>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-[24px] border border-[#2d3832] bg-[#101613] p-5"
                >
                  <h3 className="font-botanical-display text-2xl text-[#f7efe4]">
                    {feature.title}
                  </h3>
                  <p className="font-botanical-body mt-3 text-sm leading-7 text-[#d0dbce]">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="waitlist-seven"
          className="rise-in glass-panel-dark rounded-[38px] border border-[#314038] px-6 py-10 sm:px-8 lg:px-10"
        >
          <SectionTag dark theme="forest">Final CTA</SectionTag>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="font-botanical-display max-w-[10ch] text-5xl leading-none text-[#f6ede3]">
                Join the waitlist before the first lesson path opens.
              </h2>
              <p className="font-botanical-body mt-4 max-w-2xl text-base leading-7 text-[#d4ddd2]">
                Early subscribers get launch updates, preview lessons, and first access when Coffee Quest goes live.
              </p>
            </div>
            <div className="w-full max-w-xl">
              <WaitlistForm dark compact theme="forest" />
            </div>
          </div>
        </section>

        <Footer dark />
      </div>
    </main>
  )
}
