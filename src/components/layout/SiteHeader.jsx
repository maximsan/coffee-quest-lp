export function SiteHeader() {
  return (
    <header className="rise-in flex items-center justify-between py-4">
      <div>
        <p className="font-botanical-body text-[11px] uppercase tracking-[0.34em] text-[#c8b18d]">
          Coffee Quest
        </p>
        <p className="font-botanical-display text-xl text-[#f4eadf]">
          Grow your coffee sense.
        </p>
      </div>
      <a
        href="#waitlist-five"
        className="hidden md:block font-botanical-body rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/86 transition hover:border-white/25 hover:bg-white/10"
      >
        Join the waitlist
      </a>
    </header>
  );
}
