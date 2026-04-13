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

export function LandingPage() {
  const heroLessonItems = [
    "What bitterness usually means",
    "How over-extraction affects flavor",
    "How grind size affects taste",
  ];
  const howItWorksSteps = [
    {
      label: "Step 1",
      title: "Learn one clear idea",
      description:
        "Start with one short lesson on a practical coffee topic, from beans and roast to brewing and taste.",
    },
    {
      label: "Step 2",
      title: "Practice it right away",
      description:
        "Use a quick mini-game or interaction to help the concept stick before moving on.",
    },
    {
      label: "Step 3",
      title: "See your progress grow",
      description:
        "Collect Coffee Cards, move through the learning path, and watch your coffee tree grow over time.",
    },
  ];

  return (
    <main className="relative overflow-hidden bg-[#0d120f] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(117,160,111,0.26),transparent_18%),radial-gradient(circle_at_82%_16%,rgba(205,161,110,0.18),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(180deg,#0d120f,#111815_40%,#171d19)]" />
      <ScrollBranchBackdrop />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1220px] flex-col px-5 pb-28 pt-5 sm:px-8 lg:px-10">
        <SiteHeader />

        <section className="relative grid gap-8 pt-4 pb-2 md:pt-10 md:pb-2 lg:grid-cols-[1fr_0.96fr] lg:items-center lg:gap-10 lg:pt-16 lg:pb-4">
          <div className="rise-in mx-auto flex max-w-[760px] flex-col items-center gap-5 text-center lg:mx-0 lg:max-w-none lg:items-start lg:text-left">
            <SectionTag dark>Structured learning for beginners</SectionTag>
            <h1 className="font-botanical-display max-w-[11ch] text-[clamp(3.3rem,9vw,5.4rem)] leading-[0.92] tracking-[-0.05em] text-[#f4eadf] lg:text-7xl">
              A beginner coffee app that feels clear from the first sip.
            </h1>
            <p className="font-botanical-body max-w-[700px] text-lg leading-8 text-white/80 lg:max-w-xl">
              Coffee Quest uses short daily lessons, quick mini-games, Coffee Cards, and a growing coffee tree to turn coffee basics into a habit you can actually keep.
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
                <PhoneMockup dark title="Today" subtitle="Brewing basics">
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
          <div className="rise-in rounded-[36px] border border-white/10 bg-white/5 p-7 backdrop-blur-xl">
            <div className="mx-auto max-w-[760px] text-center">
              <SectionTag dark>HOW IT WORKS</SectionTag>
              <h2 className="mt-5 font-botanical-display text-4xl leading-none text-[#f6ede3] sm:text-5xl">
                A clearer path from first lesson to real coffee confidence.
              </h2>
              <p className="mt-4 font-botanical-body text-base leading-7 text-white/78">
                Coffee Quest keeps learning simple: learn one idea, try it
                right away, and watch your confidence grow with every step.
              </p>
            </div>
            <div className="mx-auto mt-8 grid max-w-[840px] gap-4 min-[781px]:grid-cols-2 lg:grid-cols-3">
              {howItWorksSteps.map((step, index) => (
                <article
                  key={step.title}
                  className={[
                    "rounded-[28px] border border-white/10 bg-[#111714] p-5 text-center",
                    "min-[781px]:flex min-[781px]:min-h-[280px] min-[781px]:justify-center min-[781px]:p-6",
                    index === howItWorksSteps.length - 1
                      ? "min-[781px]:col-span-2 min-[781px]:mx-auto min-[781px]:w-full min-[781px]:max-w-[408px] lg:col-span-1 lg:max-w-none"
                      : "",
                  ].join(" ")}
                >
                  <div className="min-[781px]:max-w-[260px]">
                    <p className="font-botanical-body text-[11px] uppercase tracking-[0.28em] text-[#c8b18d]">
                      {step.label}
                    </p>
                    <h3 className="mt-4 font-botanical-display text-3xl leading-none text-[#f7efe4] min-[781px]:text-[2.15rem]">
                      {step.title}
                    </h3>
                    <p className="mt-3 font-botanical-body text-base leading-7 text-white/74">
                      {step.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <LandingPageSections />
        </section>

        <section
          id="waitlist-five"
          className="rise-in rounded-[40px] border border-[#324337] bg-[linear-gradient(135deg,#111814,#1d241f)] px-6 py-10 sm:px-8 lg:px-10"
        >
          <div className="mx-auto flex max-w-[720px] flex-col items-center text-center">
            <SectionTag dark>Final CTA</SectionTag>
            <h2 className="mt-5 font-botanical-display text-4xl leading-none text-[#f6ede3] sm:text-5xl">
              Join the waitlist and grow your coffee basics from the ground up.
            </h2>
            <p className="mt-4 max-w-2xl font-botanical-body text-base leading-7 text-white/68">
              Coffee Quest is still in phase one, but the first learners can
              help shape a clearer way into coffee knowledge.
            </p>
            <div className="mt-6 w-full max-w-xl">
              <WaitlistForm dark compact />
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
