import { features, howItWorks } from '../content'
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

export function DesignThree() {
  return (
    <main className="relative overflow-hidden bg-[#fbf7f0] text-[#241912]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(214,183,144,0.3),transparent_20%),radial-gradient(circle_at_85%_8%,rgba(190,142,92,0.22),transparent_18%),linear-gradient(180deg,#fbf7f0,#f5ecdf)]" />
      <div className="relative mx-auto flex min-h-screen w-full max-w-[1180px] flex-col px-5 pb-28 pt-5 sm:px-8">
        <header className="rise-in flex items-center justify-between py-4">
          <div>
            <p className="font-ritual-body text-[11px] uppercase tracking-[0.32em] text-[#9a6f49]">
              Coffee Quest
            </p>
            <p className="font-ritual-display text-2xl text-[#311d10]">A calmer way to begin.</p>
          </div>
          <a
            href="#waitlist-three"
            className="font-ritual-body rounded-full border border-[#dbcab6] bg-white/75 px-4 py-2 text-sm text-[#3b291c] transition hover:bg-white"
          >
            Join the waitlist
          </a>
        </header>

        <section className="grid gap-8 py-10 lg:grid-cols-[1fr_0.95fr] lg:items-center lg:py-16">
          <div className="rise-in rounded-[40px] bg-white/70 p-8 shadow-[0_30px_70px_rgba(98,63,34,0.08)]">
            <SectionTag>Daily coffee basics</SectionTag>
            <h1 className="font-ritual-display mt-6 max-w-[11ch] text-5xl leading-[0.92] tracking-[-0.04em] text-[#29180d] sm:text-7xl">
              Learn coffee without the jargon wall.
            </h1>
            <p className="font-ritual-body mt-5 max-w-xl text-lg leading-8 text-[#655141]">
              Short daily lessons, quick mini-games, and visible progress make Coffee Quest feel structured, friendly, and easy to start.
            </p>
            <div className="mt-7">
              <WaitlistForm />
            </div>
          </div>

          <div className="rise-in delay-2 grid gap-4 sm:grid-cols-2">
            <div className="rounded-[32px] bg-[#fff8f0] p-4 shadow-[0_24px_60px_rgba(94,64,36,0.08)]">
              <PhoneMockup title="Lesson" subtitle="Taste basics">
                <LessonPreview />
              </PhoneMockup>
            </div>
            <div className="grid gap-4">
              <div className="rounded-[32px] bg-[#f2e4d1] p-4 shadow-[0_24px_60px_rgba(94,64,36,0.08)]">
                <PhoneMockup title="Mini-game" subtitle="Flavor check">
                  <QuizPreview />
                </PhoneMockup>
              </div>
              <div className="rounded-[32px] bg-[#efe3d4] p-5 shadow-[0_24px_60px_rgba(94,64,36,0.08)]">
                <TreePreview />
              </div>
            </div>
          </div>
        </section>

        <section className="grid gap-6 py-10 lg:grid-cols-3">
          {howItWorks.map((step, index) => (
            <article
              key={step.title}
              className="rise-in rounded-[32px] bg-white/72 p-6 shadow-[0_18px_44px_rgba(95,61,35,0.08)]"
            >
              <p className="font-ritual-body text-[11px] uppercase tracking-[0.28em] text-[#a1744e]">
                Step {index + 1}
              </p>
              <h2 className="font-ritual-display mt-4 text-4xl leading-none text-[#2b180d]">
                {step.title}
              </h2>
              <p className="font-ritual-body mt-4 text-base leading-7 text-[#685344]">
                {step.description}
              </p>
            </article>
          ))}
        </section>

        <section className="grid gap-6 py-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="rise-in rounded-[36px] bg-[#2f2118] p-7 text-[#faf1e7] shadow-[0_24px_70px_rgba(51,30,18,0.24)]">
            <SectionTag dark>Feature highlights</SectionTag>
            <div className="mt-6 grid gap-4">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="rounded-[28px] border border-white/10 bg-white/5 p-5"
                >
                  <h3 className="font-ritual-display text-3xl leading-none text-[#fff7ef]">
                    {feature.title}
                  </h3>
                  <p className="font-ritual-body mt-3 text-base leading-7 text-[#e6d6c5]">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rise-in rounded-[36px] bg-white/80 p-7 shadow-[0_24px_70px_rgba(79,49,27,0.08)]">
              <SectionTag>Who it&apos;s for</SectionTag>
              <h2 className="font-ritual-display mt-5 text-5xl leading-none text-[#2b180d]">
                For people who love coffee and want a simpler starting point.
              </h2>
              <div className="mt-6">
                <AudienceList />
              </div>
            </div>

            <div className="rise-in rounded-[36px] bg-[#f2e2cf] p-7 shadow-[0_24px_70px_rgba(79,49,27,0.08)]">
              <SectionTag>App snapshot</SectionTag>
              <div className="mt-6 grid gap-5 sm:grid-cols-[0.9fr_1.1fr]">
                <CoffeeCardsPreview />
                <div className="rounded-[30px] border border-[#decbbb] bg-white/72 p-4">
                  <PhoneMockup title="Path" subtitle="Structured and clear">
                    <LessonPreview />
                  </PhoneMockup>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="waitlist-three"
          className="rise-in rounded-[40px] bg-[linear-gradient(135deg,#efe0ce,#fffaf4)] px-6 py-10 shadow-[0_28px_80px_rgba(88,53,29,0.08)] sm:px-8 lg:px-10"
        >
          <SectionTag>Final CTA</SectionTag>
          <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <h2 className="font-ritual-display max-w-[10ch] text-5xl leading-none text-[#25170f]">
                Join the waitlist for a gentler coffee learning habit.
              </h2>
              <p className="font-ritual-body mt-4 max-w-2xl text-base leading-7 text-[#655041]">
                Coffee Quest is not live yet, but you can be first to hear when the first lesson path opens up.
              </p>
            </div>
            <div className="w-full max-w-xl">
              <WaitlistForm compact />
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  )
}
