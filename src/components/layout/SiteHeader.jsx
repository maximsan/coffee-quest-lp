import { useScrollReveal } from "../../hooks/useScrollReveal";

export function SiteHeader() {
  const [setRevealElement, isRevealed] = useScrollReveal();

  return (
    <header
      ref={setRevealElement}
      data-revealed={isRevealed}
      className="scroll-reveal flex items-center py-2"
    >
      <p className="font-botanical-body text-[12px] uppercase tracking-[0.34em] text-[#cfb58e]">
        Coffee Quest
      </p>
    </header>
  );
}
