export function WaitlistForm({
  dark = false,
  compact = false,
  theme = "default",
  placeholder = "Enter your email",
  buttonLabel = "Join waitlist",
  note,
}) {
  const forestDark = dark && theme === "forest";
  const shell = forestDark
    ? "border-[#324137] bg-[#121916]/86 text-white shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
    : dark
      ? "border-white/10 bg-white/6 text-white shadow-[0_20px_50px_rgba(0,0,0,0.28)]"
      : "border-[#d9c7b4] bg-white/88 text-[#2c2018] shadow-[0_24px_60px_rgba(74,42,24,0.12)]";
  const input = forestDark
    ? "border-[#2b3730] bg-[#0d1310] text-[#eef5eb] placeholder:text-[#9fb19f]"
    : dark
      ? "border-white/10 bg-[#120d0a] text-white placeholder:text-white/58"
      : "border-[#d9cbbd] bg-[#fffdf9] text-[#2c2018] placeholder:text-[#826c5f]";
  const button = forestDark
    ? "bg-[#eef4ea] text-[#17201b] hover:bg-[#ffffff]"
    : dark
      ? "bg-[#f0c48a] text-[#25170f] hover:bg-[#f6d4a5]"
      : "bg-[#2f2118] text-[#f8f1e8] hover:bg-[#483126]";

  return (
    <div className="w-full">
      <form
        onSubmit={(event) => event.preventDefault()}
        className={[
          "rounded-[20px] border p-3",
          shell,
          compact
            ? "mx-auto flex w-full max-w-md flex-col gap-2 sm:flex-row"
            : "mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row",
        ].join(" ")}
      >
        <input
          type="email"
          aria-label="Email address"
          placeholder={placeholder}
          className={[
            `min-w-0 flex-1 rounded-[12px] border px-5 py-3 text-sm outline-none transition ${forestDark ? "focus:border-[#7ca776]" : "focus:border-[#c88d59]"}`,
            input,
          ].join(" ")}
        />
        <button
          type="submit"
          className={[
            "rounded-[12px] px-5 py-3 text-sm font-semibold transition duration-300",
            button,
          ].join(" ")}
        >
          {buttonLabel}
        </button>
      </form>
      {note ? (
        <p
          className={
            forestDark
              ? "mt-1.5 px-1 text-center text-[12px] text-[#b5c6b2]"
              : dark
                ? "mt-1.5 px-1 text-center text-[12px] text-white/66"
                : "mt-1.5 px-1 text-center text-[12px] text-[#7a6659]"
          }
        >
          {note}
        </p>
      ) : null}
    </div>
  );
}
