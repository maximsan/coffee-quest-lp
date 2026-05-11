import { SiteFooter } from "../components/layout/SiteFooter";
import { SiteHeader } from "../components/layout/SiteHeader";
import { HeroSection } from "../components/sections/HeroSection";
import { HowItWorksSection } from "../components/sections/HowItWorksSection";
import { LandingPageSections } from "../components/sections/LandingPageSections";
import { WaitlistCtaSection } from "../components/sections/WaitlistCtaSection";
import { ScrollBranchBackdrop } from "../components/tree/ScrollBranchBackdrop";

export function LandingPage() {
  return (
    <main className="relative overflow-hidden bg-[#0d120f] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_12%,rgba(117,160,111,0.26),transparent_18%),radial-gradient(circle_at_82%_16%,rgba(205,161,110,0.18),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(255,255,255,0.08),transparent_30%),linear-gradient(180deg,#0d120f,#111815_40%,#171d19)]" />
      <ScrollBranchBackdrop />
      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1220px] flex-col px-5 pb-14 pt-4 sm:px-8 sm:pb-16 lg:px-10 lg:pb-[5.6rem]">
        <SiteHeader />
        <HeroSection />
        <section className="mx-auto grid w-full max-w-[920px] gap-6 pt-4 pb-10 md:pt-6 lg:pt-8">
          <HowItWorksSection />
          <LandingPageSections />
        </section>
        <div data-testid="landing-page-end">
          <WaitlistCtaSection />
          <div
            data-testid="landing-footer"
            className="mt-4 border-t border-white/10 sm:mt-5"
          >
            <SiteFooter dark />
          </div>
        </div>
      </div>
    </main>
  );
}
