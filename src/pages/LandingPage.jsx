import { WaitlistForm } from "../components/forms/WaitlistForm";
import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import { LessonPreview } from "../components/previews/LessonPreview";
import { PhoneMockup } from "../components/previews/PhoneMockup";
import { ProgressPreview } from "../components/previews/ProgressPreview";
import { TreePreview } from "../components/previews/TreePreview";
import { LandingPageSections } from "../components/sections/LandingPageSections";
import { SectionTag } from "../components/shared/SectionTag";
import { ScrollBranchBackdrop } from "../components/tree/ScrollBranchBackdrop";
import { ScrollBranchBackdropLegacy } from "../components/tree/ScrollBranchBackdropLegacy";
import { landingPageHowItWorksSteps } from "../data/landingPageContent";

function StepIcon({ type }) {
  if (type === "bean") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M15.8 4.7c3.4 2 4.4 6.2 2.4 9.4-2.3 3.7-7.7 6.1-11 4.1-3.2-1.9-3.6-7 .2-10.8 3.1-3.2 6.1-4.6 8.4-2.7Z"
          stroke="currentColor"
          strokeWidth="1.4"
        />
        <path
          d="M10.4 6.9c1.2 1.8 1.2 5-.4 8.7"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (type === "spark") {
    return (
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M12 4.5 13.9 9l4.6 1.9-4.6 1.9L12 17.5l-1.9-4.7L5.5 10.9 10.1 9 12 4.5Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path
          d="M18.2 4.8v2.1M19.3 5.9h-2.1M5.8 16.8v2.1M6.9 17.9H4.8"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
      <path
        d="M12 18.5v-6.8M12 11.7c0-3.1 1.6-5 4.7-5.7 0 3.1-1.4 5.3-4.7 5.7Zm0 0c0-2.5-1.2-4-3.9-4.6 0 2.6 1.1 4.3 3.9 4.6Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.1 18.5h5.8"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function LandingPage() {
  const heroLessonItems = [
    "What bitterness usually means",
    "How over-extraction affects flavor",
    "How grind size affects taste",
  ];

  return (
    <main className="relative overflow-hidden bg-[#0d120f] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(117,160,111,0.26),transparent_18%),radial-gradient(circle_at_82%_16%,rgba(205,161,110,0.18),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(180deg,#0d120f,#111815_40%,#171d19)]" />
      <ScrollBranchBackdrop />
      {/* <ScrollBranchBackdropLegacy /> */}
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1220px] flex-col px-5 pb-28 pt-4 sm:px-8 lg:px-10">
        <SiteHeader />

        <section className="relative grid gap-8 pt-1 pb-2 md:pt-4 md:pb-2 lg:grid-cols-[1fr_0.96fr] lg:items-center lg:gap-9 lg:pt-8 lg:pb-4">
          <div className="rise-in mx-auto flex max-w-[760px] flex-col items-center gap-5 text-center lg:mx-0 lg:max-w-none lg:items-start lg:text-left">
            <SectionTag dark>Structured learning for beginners</SectionTag>
            <h1 className="font-botanical-display max-w-[11ch] text-[clamp(3.3rem,9vw,5.4rem)] leading-[0.92] tracking-[-0.05em] text-[#f4eadf] lg:text-7xl">
              A beginner coffee app that feels clear from the first sip.
            </h1>
            <p className="font-botanical-body max-w-[700px] text-lg leading-8 text-white/80 lg:max-w-xl">
              Coffee Quest uses short daily lessons, quick mini-games, Coffee
              Cards, and a growing coffee tree to turn coffee basics into a
              habit you can actually keep.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 font-botanical-body text-sm text-[#dfc39e] lg:justify-start">
              <span>3 min lessons</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#b88656]" />
              <span>Mini-games</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#b88656]" />
              <span>Brew better daily</span>
            </div>
            <div className="w-full max-w-[640px] pt-1 lg:max-w-xl">
              <WaitlistForm
                dark
                placeholder="Enter your email"
                buttonLabel="Join waitlist"
                note="Early access. No spam."
              />
            </div>
          </div>

          <div className="rise-in delay-2 relative mx-auto flex w-full max-w-[920px] justify-center lg:max-w-[520px]">
            <div className="absolute inset-x-12 top-10 bottom-8 rounded-[42px] border border-white/10 bg-white/5 blur-3xl lg:inset-8" />
            <div className="relative z-10 w-full rounded-[34px] border border-white/10 bg-white/5 p-4 md:p-5 lg:w-auto lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
              <div className="mx-auto grid w-fit items-start justify-items-center gap-4 md:grid-cols-[280px_280px] md:gap-5 lg:grid-cols-[280px_280px] lg:gap-4">
                <div className="flex justify-center self-center">
                  <PhoneMockup dark title="TODAY" subtitle="Brewing basics">
                    <LessonPreview dark items={heroLessonItems} />
                  </PhoneMockup>
                </div>
                <div className="grid w-[280px] justify-items-center gap-4 pt-0 md:pt-8 lg:pt-10">
                  <div className="w-full rounded-[30px] border border-white/10 bg-white/5 p-4">
                    <TreePreview dark title="Beginner path" />
                  </div>
                  <div className="w-full rounded-[30px] border border-white/10 bg-white/5 p-4">
                    <ProgressPreview dark />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-[920px] gap-6 pt-4 pb-10 md:pt-6 lg:pt-8">
          <div className="rise-in overflow-hidden rounded-[36px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.03))] p-7 backdrop-blur-xl sm:p-8 lg:p-9">
            <div className="mx-auto max-w-[720px] text-center">
              <SectionTag dark>HOW IT WORKS</SectionTag>
              <h2 className="mt-5 font-botanical-display text-4xl leading-none text-[#f6ede3] sm:text-5xl">
                From one small lesson to real coffee confidence
              </h2>
              <p className="mt-4 font-botanical-body text-base leading-7 text-white/74">
                Learn one practical idea, try it immediately, and build
                confidence step by step.
              </p>
            </div>
            <div className="relative mx-auto mt-10 max-w-[900px]">
              <div className="pointer-events-none absolute bottom-6 left-1/2 top-10 w-px -translate-x-1/2 lg:hidden">
                <div className="h-full w-full bg-[linear-gradient(180deg,rgba(214,177,128,0),rgba(214,177,128,0.4),rgba(122,165,112,0.28),rgba(214,177,128,0))]" />
                <div className="absolute inset-x-[-8px] inset-y-0 bg-[radial-gradient(circle_at_center,rgba(205,161,110,0.22),transparent_62%)] blur-md" />
              </div>
              <div className="pointer-events-none absolute inset-x-[8%] top-[5.75rem] hidden h-[4.25rem] lg:block">
                <svg
                  viewBox="0 0 1000 120"
                  preserveAspectRatio="none"
                  className="h-full w-full"
                  aria-hidden="true"
                >
                  <defs>
                    <linearGradient
                      id="coffee-journey"
                      x1="0%"
                      y1="0%"
                      x2="100%"
                      y2="0%"
                    >
                      <stop offset="0%" stopColor="rgba(205,161,110,0)" />
                      <stop offset="18%" stopColor="rgba(205,161,110,0.38)" />
                      <stop offset="50%" stopColor="rgba(126,169,117,0.34)" />
                      <stop offset="82%" stopColor="rgba(205,161,110,0.34)" />
                      <stop offset="100%" stopColor="rgba(205,161,110,0)" />
                    </linearGradient>
                    <filter
                      id="coffee-journey-glow"
                      x="-10%"
                      y="-120%"
                      width="120%"
                      height="340%"
                    >
                      <feGaussianBlur stdDeviation="5" />
                    </filter>
                  </defs>
                  <path
                    d="M24 80C165 78 216 26 336 26C452 26 482 92 622 92C768 92 820 44 976 44"
                    stroke="url(#coffee-journey)"
                    strokeWidth="3"
                    strokeLinecap="round"
                    fill="none"
                    filter="url(#coffee-journey-glow)"
                  />
                  <path
                    d="M24 80C165 78 216 26 336 26C452 26 482 92 622 92C768 92 820 44 976 44"
                    stroke="rgba(238,223,203,0.18)"
                    strokeWidth="1.15"
                    strokeDasharray="2 12"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <circle
                    cx="336"
                    cy="26"
                    r="4.5"
                    fill="rgba(217,188,151,0.85)"
                  />
                  <circle
                    cx="622"
                    cy="92"
                    r="4.5"
                    fill="rgba(157,198,142,0.7)"
                  />
                  <circle
                    cx="976"
                    cy="44"
                    r="4.5"
                    fill="rgba(217,188,151,0.78)"
                  />
                </svg>
              </div>
              <div className="grid gap-4 lg:grid-cols-3 lg:gap-5">
                {landingPageHowItWorksSteps.map((step, index) => (
                  <article
                    key={step.title}
                    className={[
                      "relative rounded-[28px] border border-white/7 bg-[linear-gradient(180deg,rgba(24,32,28,0.82),rgba(16,22,19,0.64))] px-5 py-5 text-center shadow-[0_18px_46px_rgba(0,0,0,0.18)]",
                      "min-h-[222px] sm:px-6 sm:py-6 lg:min-h-[246px]",
                      index === 1
                        ? "lg:translate-y-3"
                        : index === 2
                          ? "lg:translate-y-1"
                          : "",
                    ].join(" ")}
                  >
                    <div className="mx-auto flex max-w-[232px] flex-col items-center">
                      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border border-[#cda16e]/20 bg-[linear-gradient(180deg,rgba(205,161,110,0.14),rgba(255,255,255,0.04))] text-[#e5c293] shadow-[0_7px_20px_rgba(205,161,110,0.14)]">
                        <StepIcon type={step.icon} />
                      </div>
                      <p className="font-botanical-body text-[11px] uppercase tracking-[0.28em] text-[#c8b18d]">
                        {step.label}
                      </p>
                      <h3 className="mt-3 font-botanical-display text-[1.78rem] leading-[0.96] text-[#f7efe4] sm:text-[1.95rem]">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 max-w-[23ch] font-botanical-body text-[14px] leading-6 text-white/68">
                        {step.description}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <LandingPageSections />
        </section>

        <section
          id="waitlist-five"
          className="rise-in rounded-[40px] border border-[#324337] bg-[linear-gradient(135deg,#111814,#1d241f)] px-6 py-10 sm:px-8 lg:px-10"
        >
          <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
            <SectionTag dark>EARLY ACCESS</SectionTag>
            <h2 className="mt-5 font-botanical-display text-4xl leading-none text-[#f6ede3] sm:text-5xl">
              Join the waitlist and build real coffee confidence.
            </h2>
            <p className="mt-4 max-w-2xl font-botanical-body text-base leading-7 text-white/68">
              Coffee Quest is in early access. <br /> Join the first learners
              and help shape a clearer, simpler way to learn coffee.
            </p>
            <div className="mt-6 w-full max-w-xl">
              <WaitlistForm
                dark
                compact
                placeholder="Enter your email"
                buttonLabel="Join waitlist"
                note="Early access. No spam."
              />
            </div>
          </div>
        </section>

        <div className="mt-6 border-t border-white/10">
          <SiteFooter dark />
        </div>
      </div>
    </main>
  );
}
