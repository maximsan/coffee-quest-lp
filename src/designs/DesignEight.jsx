import { features } from '../content'
import {
  AudienceList,
  Footer,
  LessonPreview,
  PhoneMockup,
  ProgressPreview,
  SectionTag,
  TreePreview,
  WaitlistForm,
} from '../components/SharedSections'
import { useParallax } from '../hooks/useParallax'

const workflow = [
  {
    title: 'Daily lesson',
    detail: 'A short lesson teaches one coffee idea in plain language, so the app always feels easy to enter.',
  },
  {
    title: 'Quick mini-game',
    detail: 'A fast check makes the lesson stick while the idea is still fresh.',
  },
  {
    title: 'Visible growth',
    detail: 'Progress, Coffee Cards, and your tree make it obvious that small sessions are adding up.',
  },
]

export function DesignEight() {
  const drift = useParallax(0.08)

  return (
    <main className="relative overflow-hidden bg-[#0d120f] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_14%_10%,rgba(124,167,118,0.18),transparent_18%),radial-gradient(circle_at_82%_16%,rgba(244,234,223,0.08),transparent_16%),linear-gradient(180deg,#0d120f,#111815_42%,#171d19)]" />
      <div
        className="pointer-events-none absolute left-1/2 top-28 h-64 w-64 -translate-x-1/2 rounded-full bg-[#7ca776]/12 blur-3xl"
        style={{ transform: `translate(-50%, ${drift}px)` }}
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[980px] flex-col px-5 pb-28 pt-5 sm:px-8">
        <header className="rise-in flex items-center justify-between py-4">
          <div>
            <p className="font-botanical-body text-[11px] uppercase tracking-[0.34em] text-[#c8b18d]">
              Coffee Quest
            </p>
            <p className="font-botanical-display text-xl text-[#f4eadf]">
              A simpler beginning for coffee learners.
            </p>
          </div>
          <a
            href="#waitlist-eight"
            className="font-botanical-body rounded-full border border-[#314038] bg-[#131916]/82 px-4 py-2 text-sm text-[#edf3eb] transition hover:border-[#435548] hover:bg-[#18201c]"
          >
            Join the waitlist
          </a>
        </header>

        <section className="hero-stagger flex flex-col items-center py-12 text-center lg:py-18">
          <SectionTag dark theme="forest">Centered concept</SectionTag>
          <h1 className="mt-6 max-w-[11ch] font-botanical-display text-5xl leading-[0.9] tracking-[-0.05em] text-[#f4eadf] sm:text-7xl">
            Coffee basics with less clutter and more confidence.
          </h1>
          <p className="mt-5 max-w-2xl font-botanical-body text-lg leading-8 text-[#d4ddd2]">
            Coffee Quest gives beginners a calm, structured way to learn beans, roast, brewing, and taste in just a few minutes a day.
          </p>
          <div className="mt-7 w-full max-w-xl">
            <WaitlistForm dark theme="forest" />
          </div>
        </section>

        <section className="rise-in delay-3 py-4">
          <div className="glass-panel-dark rounded-[42px] border border-[#314038] p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)]">
            <div className="mb-6 text-center">
              <p className="font-botanical-body text-[11px] uppercase tracking-[0.28em] text-[#c8b18d]">
                App preview
              </p>
              <h2 className="mt-2 font-botanical-display text-3xl text-[#f7efe4]">
                Centered previews with a cleaner hierarchy
              </h2>
            </div>

            <div className="grid place-items-center gap-5 lg:grid-cols-[auto_auto_auto]">
              <PhoneMockup
                dark
                theme="forest"
                accent="#7ca776"
                title="Today"
                subtitle="Beans and roast"
              >
                <LessonPreview dark theme="forest" />
              </PhoneMockup>
              <PhoneMockup
                dark
                theme="forest"
                accent="#8fa986"
                title="Progress"
                subtitle="Your next step"
              >
                <ProgressPreview dark theme="forest" />
              </PhoneMockup>
              <div className="w-full max-w-[280px]">
                <TreePreview dark theme="forest" />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-5 py-10 md:grid-cols-3">
          {workflow.map((item, index) => (
            <article
              key={item.title}
              className="rise-in glass-panel-dark rounded-[30px] border border-[#314038] p-6"
            >
              <p className="font-botanical-body text-[11px] uppercase tracking-[0.28em] text-[#c8b18d]">
                How it works {index + 1}
              </p>
              <h2 className="mt-4 font-botanical-display text-3xl leading-none text-[#f7efe4]">
                {item.title}
              </h2>
              <p className="mt-4 font-botanical-body text-base leading-7 text-[#d4ddd2]">
                {item.detail}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 py-10 lg:grid-cols-[1fr_1fr]">
          <div className="rise-in glass-panel-dark rounded-[36px] border border-[#314038] p-7">
            <SectionTag dark theme="forest">Feature highlights</SectionTag>
            <div className="mt-6 grid gap-4">
              {features.map((feature) => (
                <article
                  key={feature.title}
                  className="rounded-[24px] border border-[#2d3832] bg-[#101613] p-5"
                >
                  <h3 className="font-botanical-display text-2xl text-[#f7efe4]">
                    {feature.title}
                  </h3>
                  <p className="mt-3 font-botanical-body text-sm leading-7 text-[#d0dbce]">
                    {feature.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rise-in glass-panel-dark rounded-[36px] border border-[#314038] p-7">
              <SectionTag dark theme="forest">Who it&apos;s for</SectionTag>
              <h2 className="mt-5 font-botanical-display text-4xl leading-none text-[#f6ede3]">
                Beginners who want a clear daily practice instead of coffee overload.
              </h2>
              <div className="mt-6">
                <AudienceList dark theme="forest" />
              </div>
            </div>

            <div
              id="waitlist-eight"
              className="rise-in glass-panel-dark rounded-[36px] border border-[#314038] p-7"
            >
              <SectionTag dark theme="forest">Final CTA</SectionTag>
              <h2 className="mt-5 max-w-[10ch] font-botanical-display text-5xl leading-none text-[#f6ede3]">
                Join the waitlist and get in before the first quests begin.
              </h2>
              <p className="mt-4 max-w-2xl font-botanical-body text-base leading-7 text-[#d4ddd2]">
                Sign up for launch updates, preview lessons, and early access when Coffee Quest opens.
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
