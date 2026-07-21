import { WaitlistForm } from "../forms/WaitlistForm";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { SectionTag } from "../shared/SectionTag";

export function WaitlistCtaSection() {
  const [setRevealElement, isRevealed] = useScrollReveal();

  return (
    <section
      ref={setRevealElement}
      data-revealed={isRevealed}
      id="waitlist-five"
      data-testid="landing-waitlist"
      className="scroll-reveal rounded-[40px] border border-[#324337] bg-[linear-gradient(135deg,#111814,#1d241f)] px-6 py-5 sm:px-8 sm:py-6 lg:px-10 lg:py-8"
    >
      <div className="mx-auto flex max-w-180 flex-col items-center text-center">
        <SectionTag dark>EARLY ACCESS</SectionTag>
        <h2 className="mt-5 font-botanical-display text-4xl leading-none text-[#f6ede3] sm:text-5xl">
          Join the waitlist and build real coffee confidence.
        </h2>
        <p className="mt-4 max-w-2xl font-botanical-body text-base leading-7 text-white/68">
          Coffee Quest is in early access. <br /> Join the first learners and
          help shape a clearer, simpler way to learn coffee.
        </p>
        <div className="mt-6 w-full max-w-xl">
          <WaitlistForm
            dark
            compact
            placeholder="Enter your email"
            buttonLabel="Join waitlist"
            note="Enter your email and we'll notify you once when Coffee Quest launches."
          />
        </div>
      </div>
    </section>
  );
}
