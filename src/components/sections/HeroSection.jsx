import { WaitlistForm } from "../forms/WaitlistForm";
import { LessonPreview } from "../previews/LessonPreview";
import { PhoneMockup } from "../previews/PhoneMockup";
import { ProgressPreview } from "../previews/ProgressPreview";
import { TreePreview } from "../previews/TreePreview";
import { SectionTag } from "../shared/SectionTag";
import { useScrollReveal } from "../../hooks/useScrollReveal";

const heroLessonItems = [
  "What bitterness usually means",
  "How over-extraction affects flavor",
  "How grind size affects taste",
];

export function HeroSection() {
  const [setHeroContentRevealElement, isHeroContentRevealed] =
    useScrollReveal();
  const [setHeroPreviewRevealElement, isHeroPreviewRevealed] =
    useScrollReveal();

  return (
    <section
      data-testid="landing-hero"
      className="relative grid gap-8 pt-3 pb-2 md:pt-4 md:pb-2 lg:grid-cols-[1fr_0.96fr] lg:items-center lg:gap-9 lg:pt-2 lg:pb-4"
    >
      <div
        ref={setHeroContentRevealElement}
        data-revealed={isHeroContentRevealed}
        className="scroll-reveal scroll-reveal--lcp mx-auto flex max-w-190 flex-col items-center gap-5 text-center lg:mx-0 lg:max-w-none lg:items-start lg:text-left"
      >
        <SectionTag dark>Structured learning for beginners</SectionTag>
        <h1 className="font-botanical-display max-w-[11ch] text-[clamp(3.3rem,9vw,5.4rem)] leading-[0.92] tracking-tighter text-[#f4eadf] lg:text-7xl">
          A beginner coffee app that feels clear from the first sip.
        </h1>
        <p className="font-botanical-body max-w-175 text-lg leading-8 text-white/80 lg:max-w-xl">
          Coffee Quest uses short daily lessons, quick mini-games, coffee cards,
          and a growing coffee tree to turn coffee basics into a habit you can
          actually keep.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 font-botanical-body text-sm text-[#dfc39e] lg:justify-start">
          <span>3 min lessons</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#b88656]" />
          <span>Mini-games</span>
          <span className="h-1.5 w-1.5 rounded-full bg-[#b88656]" />
          <span>Brew better daily</span>
        </div>
        <div className="w-full max-w-160 pt-1 lg:max-w-xl">
          <WaitlistForm
            dark
            placeholder="Enter your email"
            buttonLabel="Join waitlist"
            note="Enter your email and we'll notify you once when Coffee Quest launches."
          />
        </div>
      </div>

      <div
        ref={setHeroPreviewRevealElement}
        data-revealed={isHeroPreviewRevealed}
        className="scroll-reveal scroll-reveal--delayed relative mx-auto flex w-full max-w-230 justify-center lg:max-w-130"
      >
        <div className="absolute inset-x-12 top-10 bottom-8 rounded-[42px] border border-white/10 bg-white/5 blur-3xl lg:inset-8" />
        <div className="relative z-10 w-full rounded-[34px] border border-white/10 bg-white/5 p-4 md:p-5 lg:w-auto lg:rounded-none lg:border-0 lg:bg-transparent lg:p-0">
          <div className="mx-auto grid w-fit items-start justify-items-center gap-4 md:grid-cols-[280px_280px] md:gap-5 lg:grid-cols-[280px_280px] lg:gap-4">
            <div className="flex justify-center self-center">
              <PhoneMockup dark title="TODAY" subtitle="Brewing basics">
                <LessonPreview dark items={heroLessonItems} />
              </PhoneMockup>
            </div>
            <div className="grid w-70 justify-items-center gap-4 pt-0 md:pt-8 lg:pt-10">
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
  );
}
