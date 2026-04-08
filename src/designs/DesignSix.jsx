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
import { useParallax } from '../hooks/useParallax'

export function DesignSix() {
  const slow = useParallax(0.08)
  const fast = useParallax(0.16)

  return (
    <main className="relative overflow-hidden bg-[#0d120f] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(117,160,111,0.24),transparent_18%),radial-gradient(circle_at_85%_10%,rgba(244,234,223,0.08),transparent_16%),linear-gradient(180deg,#0d120f,#111815_42%,#171d19)]" />
      <div
        className="pointer-events-none absolute left-[8%] top-28 h-44 w-44 rounded-full bg-[#7ca776]/18 blur-3xl"
        style={{ transform: `translateY(${slow}px)` }}
      />
      <div
        className="pointer-events-none absolute right-[10%] top-40 h-52 w-52 rounded-full bg-[#dce6d7]/8 blur-3xl"
        style={{ transform: `translateY(${-fast}px)` }}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1240px] flex-col px-5 pb-28 pt-5 sm:px-8 lg:px-10">
        <header className="rise-in flex items-center justify-between py-4">
          <div>
            <p className="font-botanical-body text-[11px] uppercase tracking-[0.34em] text-[#c8b18d]">
              Coffee Quest
            </p>
            <p className="font-botanical-display text-xl text-[#f4eadf]">
              Beginner coffee, beautifully paced.
            </p>
          </div>
          <a
            href="#waitlist-six"
            className="font-botanical-body rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm text-white/90 transition hover:border-white/20 hover:bg-white/10"
          >
            Join the waitlist
          </a>
        </header>

        <section className="grid gap-10 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-16">
          <div className="hero-stagger space-y-6">
            <SectionTag dark theme="forest">Pre-launch learning app</SectionTag>
            <h1 className="font-botanical-display max-w-[10ch] text-5xl leading-[0.92] tracking-[-0.05em] text-[#f4eadf] sm:text-7xl">
              Learn coffee in small steps that actually stick.
            </h1>
            <p className="font-botanical-body max-w-xl text-lg leading-8 text-white/72">
              Coffee Quest teaches beans, roast, brewing, and taste with short daily lessons, quick mini-games, and visible progress that keeps beginners moving.
            </p>
            <WaitlistForm dark theme="forest" />
            <div className="flex flex-wrap gap-3">
              {['Short daily lessons', 'Quick mini-games', 'Clear progress'].map((item) => (
                <span
                  key={item}
                  className="font-botanical-body rounded-full border border-[#314037] bg-[#121916]/80 px-4 py-2 text-sm text-[#d9e5d7]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rise-in delay-3">
            <div className="glass-panel-dark rounded-[38px] border border-[#314038] p-5 shadow-[0_28px_80px_rgba(0,0,0,0.28)]">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <p className="font-botanical-body text-[11px] uppercase tracking-[0.3em] text-[#c8b18d]">
                    App preview
                  </p>
                  <h2 className="font-botanical-display mt-2 text-3xl text-[#f7efe4]">
                    Calm structure with real momentum
                  </h2>
                </div>
                <div className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-sm text-white/68">
                  Phase 1
                </div>
              </div>

              <div className="grid place-items-center gap-5 lg:grid-cols-[1fr_auto_1fr]">
                <div className="flex justify-center lg:justify-end">
                  <PhoneMockup
                    dark
                    theme="forest"
                    accent="#7ca776"
                    title="Lesson"
                    subtitle="Brew basics"
                  >
                    <LessonPreview dark theme="forest" />
                  </PhoneMockup>
                </div>
                <div className="flex justify-center">
                  <PhoneMockup
                    dark
                    theme="forest"
                    accent="#8ea985"
                    title="Path"
                    subtitle="Quest progress"
                  >
                    <ProgressPreview dark theme="forest" />
                  </PhoneMockup>
                </div>
                <div className="grid w-full max-w-[280px] gap-4">
                  <div className="glass-panel-dark rounded-[28px] border border-[#314038] p-4">
                    <CoffeeCardsPreview dark theme="forest" />
                  </div>
                  <div className="glass-panel-dark rounded-[28px] border border-[#314038] p-4">
                    <TreePreview dark theme="forest" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 py-10 lg:grid-cols-3">
          {howItWorks.map((step, index) => (
            <article
              key={step.title}
              className="rise-in glass-panel-dark rounded-[30px] border border-[#314038] p-6"
            >
              <p className="font-botanical-body text-[11px] uppercase tracking-[0.28em] text-[#c8b18d]">
                How it works {index + 1}
              </p>
              <h2 className="font-botanical-display mt-4 text-3xl leading-none text-[#f7efe4]">
                {step.title}
              </h2>
              <p className="font-botanical-body mt-4 text-base leading-7 text-white/68">
                {step.description}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 py-10 lg:grid-cols-[1.04fr_0.96fr]">
          <div className="rise-in glass-panel-dark rounded-[36px] border border-[#314038] p-7">
            <SectionTag dark theme="forest">Feature highlights</SectionTag>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-[26px] border border-[#2d3832] bg-[#101613] p-5"
                >
                  <h3 className="font-botanical-display text-2xl text-[#f6ede3]">
                    {feature.title}
                  </h3>
                  <p className="font-botanical-body mt-3 text-sm leading-7 text-white/64">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rise-in glass-panel-dark rounded-[36px] border border-[#314038] p-7">
              <SectionTag dark theme="forest">Who it&apos;s for</SectionTag>
              <h2 className="font-botanical-display mt-5 text-4xl leading-none text-[#f6ede3]">
                People who want coffee basics to feel elegant, friendly, and easy to return to.
              </h2>
              <div className="mt-6">
                <AudienceList dark theme="forest" />
              </div>
            </div>

            <div
              id="waitlist-six"
              className="rise-in glass-panel-dark rounded-[36px] border border-[#324337] p-7"
            >
              <SectionTag dark theme="forest">Final CTA</SectionTag>
              <h2 className="font-botanical-display mt-5 max-w-[10ch] text-5xl leading-none text-[#f6ede3]">
                Join the waitlist and start with coffee clarity.
              </h2>
              <p className="font-botanical-body mt-4 max-w-2xl text-base leading-7 text-white/68">
                Get early access updates, preview lessons, and first notice when Coffee Quest opens for beginners.
              </p>
              <div className="mt-6">
                <WaitlistForm dark compact theme="forest" />
              </div>
            </div>
          </div>
        </section>

        <Footer dark />
      </div>
    </main>
  )
}
