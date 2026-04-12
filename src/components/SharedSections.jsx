import { audiences, cards, lessonBullets } from "../content";
import { CoffeeTreeArtwork } from "./CoffeeTreeArtwork";

export function WaitlistForm({
  dark = false,
  compact = false,
  theme = "default",
  placeholder = "Email address",
  buttonLabel = "Join the waitlist",
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
              ? "mt-3 text-center text-sm text-[#b8c8b7]"
              : dark
                ? "mt-3 text-center text-sm text-white/70"
                : "mt-3 text-center text-sm text-[#7a6659]"
          }
        >
          {note}
        </p>
      ) : null}
    </div>
  );
}

export function Footer({ dark = false }) {
  return (
    <footer
      className={[
        "flex flex-col items-center justify-between gap-3 px-6 py-8 text-center text-sm sm:flex-row sm:text-left",
        dark ? "text-white/60" : "text-[#7a6659]",
      ].join(" ")}
    >
      <p>
        Coffee Quest. Learn coffee step by step in just a few minutes a day.
      </p>
      <p>Launching soon. Early access for curious beginners.</p>
    </footer>
  );
}

export function SectionTag({ children, dark = false, theme = "default" }) {
  const forestDark = dark && theme === "forest";
  return (
    <span
      className={[
        "text-center",
        "inline-flex w-fit rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em]",
        forestDark
          ? "border border-[#314037] bg-[#131a17]/90 text-[#d7e3d4]"
          : dark
            ? "border border-white/10 bg-white/8 text-[#e9c79a]"
            : "border border-[#d8c6b3] bg-[#f8f0e8] text-[#8a5d37]",
      ].join(" ")}
    >
      {children}
    </span>
  );
}

export function AudienceList({ dark = false, theme = "default" }) {
  const forestDark = dark && theme === "forest";
  return (
    <div className="grid gap-3">
      {audiences.map((item) => (
        <div
          key={item}
          className={[
            "rounded-[24px] border p-5 text-center",
            forestDark
              ? "border-[#2e3a33] bg-[#111714] text-[#e2ebe0]"
              : dark
                ? "border-white/10 bg-white/6 text-white/78"
                : "border-[#eadfd2] bg-white/80 text-[#655244]",
          ].join(" ")}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export function CoffeeCardsPreview({ dark = false, theme = "default" }) {
  const forestDark = dark && theme === "forest";
  return (
    <div className="grid gap-3">
      {cards.map((card) => (
        <article
          key={card.label}
          className={[
            "rounded-[22px] border p-4",
            forestDark
              ? "border-[#2b3730] bg-[#101612] text-[#eef3eb]"
              : dark
                ? "border-white/10 bg-[#1a120d] text-white"
                : "border-[#dfd2c2] bg-[#fffaf4] text-[#2d2118]",
          ].join(" ")}
        >
          <div
            className={[
              "mb-2 flex items-center justify-between text-[11px] uppercase tracking-[0.24em]",
              forestDark ? "text-[#9eb999]" : "text-[#aa7a50]",
            ].join(" ")}
          >
            <span>{card.label}</span>
            <span>Card</span>
          </div>
          <h4 className="text-lg font-semibold">{card.value}</h4>
          <p
            className={
              forestDark
                ? "mt-2 text-sm text-[#bfcdbd]"
                : dark
                  ? "mt-2 text-sm text-white/64"
                  : "mt-2 text-sm text-[#7b6759]"
            }
          >
            {card.note}
          </p>
        </article>
      ))}
    </div>
  );
}

export function PhoneMockup({
  dark = false,
  accent = "#c88d59",
  title = "Daily lesson",
  subtitle = "Roast basics",
  theme = "default",
  children,
}) {
  const forestDark = dark && theme === "forest";
  return (
    <div
      className={[
        "relative w-[280px] rounded-[36px] border p-3 shadow-[0_30px_70px_rgba(40,20,10,0.18)]",
        forestDark
          ? "border-[#2c3831] bg-[#0f1511]"
          : dark
            ? "border-white/10 bg-[#0f0a07]"
            : "border-[#decfbe] bg-[#f7efe4]",
      ].join(" ")}
    >
      <div
        className="absolute left-1/2 top-3 h-1.5 w-16 -translate-x-1/2 rounded-full opacity-80"
        style={{ backgroundColor: accent }}
      />
      <div
        className={[
          "rounded-[28px] border px-4 pb-4 pt-6",
          forestDark
            ? "border-[#27332d] bg-[#141c18]"
            : dark
              ? "border-white/8 bg-[#1a120d]"
              : "border-[#e7dacb] bg-[#fffdf8]",
        ].join(" ")}
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p
              className={
                forestDark
                  ? "text-[11px] uppercase tracking-[0.24em] text-[#9eb999]"
                  : dark
                    ? "text-[11px] uppercase tracking-[0.24em] text-white/45"
                    : "text-[11px] uppercase tracking-[0.24em] text-[#967762]"
              }
            >
              {title}
            </p>
            <h3
              className={
                dark
                  ? "mt-1 text-lg font-semibold text-white"
                  : "mt-1 text-lg font-semibold text-[#2b2018]"
              }
            >
              {subtitle}
            </h3>
          </div>
          <div
            className="h-10 w-10 rounded-2xl"
            style={{
              background: `linear-gradient(135deg, ${accent}, rgba(255,255,255,0.15))`,
            }}
          />
        </div>
        {children}
      </div>
    </div>
  );
}

export function LessonPreview({
  dark = false,
  theme = "default",
  items = lessonBullets,
}) {
  const forestDark = dark && theme === "forest";
  return (
    <div className="space-y-3">
      {items.map((bullet) => (
        <div
          key={bullet}
          className={[
            "rounded-[18px] border px-4 py-3 text-sm",
            forestDark
              ? "border-[#2d3832] bg-[#111714] text-[#e4ece2]"
              : dark
                ? "border-white/10 bg-white/6 text-white/82"
                : "border-[#eadfd1] bg-[#f8f1e8] text-[#634f42]",
          ].join(" ")}
        >
          {bullet}
        </div>
      ))}
      <div className="mt-4 flex items-center justify-between">
        <span
          className={
            forestDark
              ? "text-sm text-[#9cae9c]"
              : dark
                ? "text-sm text-white/62"
                : "text-sm text-[#8b7463]"
          }
        >
          3 min lesson
        </span>
        <div
          className={[
            "h-2 w-28 overflow-hidden rounded-full border",
            forestDark
              ? "border-[#314037] bg-[#1a241f]"
              : dark
                ? "border-white/8 bg-[#2a1f18]"
                : "border-[#e3d6c8] bg-[#eadfce]",
          ].join(" ")}
        >
          <div
            className="h-full w-2/3 rounded-full"
            style={{ backgroundColor: forestDark ? "#7ca776" : "#c88d59" }}
          />
        </div>
      </div>
    </div>
  );
}

export function QuizPreview({ dark = false, theme = "default" }) {
  const forestDark = dark && theme === "forest";
  const options = ["Brighter acidity", "More sweetness", "Less aroma"];

  return (
    <div className="space-y-3">
      <div
        className={
          forestDark
            ? "rounded-[20px] bg-[#121916] p-4 text-[#edf3eb]"
            : dark
              ? "rounded-[20px] bg-white/6 p-4 text-white"
              : "rounded-[20px] bg-[#f4ece2] p-4 text-[#2f241a]"
        }
      >
        Lighter roasts usually make origin flavors easier to notice because they
        keep more of the bean&apos;s original character.
      </div>
      {options.map((option, index) => (
        <div
          key={option}
          className={[
            "flex items-center gap-3 rounded-[18px] border px-4 py-3 text-sm",
            index === 0
              ? forestDark
                ? "border-[#567a58] bg-[#16211b] text-[#deebdc]"
                : dark
                  ? "border-[#d7a975] bg-[#22160e] text-[#f8e0c4]"
                  : "border-[#cf9b63] bg-[#fff5e8] text-[#724621]"
              : forestDark
                ? "border-[#2d3832] bg-[#111714] text-[#cfdbcd]"
                : dark
                  ? "border-white/10 bg-white/5 text-white/68"
                  : "border-[#eadfd1] bg-white text-[#6f5b4d]",
          ].join(" ")}
        >
          <span
            className={[
              "grid h-6 w-6 place-items-center rounded-full text-[11px] font-semibold",
              index === 0
                ? forestDark
                  ? "bg-[#7ca776] text-[#0f1511]"
                  : "bg-[#c88d59] text-[#20140e]"
                : forestDark
                  ? "bg-[#223029] text-[#d4e0d2]"
                  : dark
                    ? "bg-white/10 text-white/70"
                    : "bg-[#f3ebe2] text-[#7a6455]",
            ].join(" ")}
          >
            {index + 1}
          </span>
          {option}
        </div>
      ))}
    </div>
  );
}

export function ProgressPreview({ dark = false, theme = "default" }) {
  const forestDark = dark && theme === "forest";
  const stages = [
    { name: "Beans", status: "Done" },
    { name: "Roast", status: "Done" },
    { name: "Brewing", status: "Next" },
    { name: "Taste", status: "Next" },
  ];

  return (
    <div className="space-y-3">
      {stages.map((stage, index) => (
        <div
          key={stage.name}
          className={[
            "flex items-center gap-3 rounded-[18px] border px-3 py-2.5",
            forestDark
              ? "border-[#26312b] bg-[#121916]"
              : dark
                ? "border-white/8 bg-white/[0.03]"
                : "border-[#eadfd1] bg-[#f8f1e8]",
          ].join(" ")}
        >
          <div
            className={[
              "grid h-10 w-10 place-items-center rounded-2xl text-sm font-semibold",
              index < 2
                ? forestDark
                  ? "bg-[#7ca776] text-[#101612]"
                  : "bg-[#c88d59] text-[#2a1910]"
                : forestDark
                  ? "bg-[#1c2722] text-[#9cae9c]"
                  : dark
                    ? "bg-white/10 text-white/54"
                    : "bg-[#efe5d9] text-[#8a7766]",
            ].join(" ")}
          >
            {index + 1}
          </div>
          <h4
            className={
              dark
                ? "flex-1 text-base font-medium text-white"
                : "flex-1 text-base font-medium text-[#2d2118]"
            }
          >
            {stage.name}
          </h4>
          <div
            className={
              forestDark
                ? "text-sm text-[#b8c8b7]"
                : dark
                  ? "text-sm text-white/68"
                  : "text-sm text-[#937d6f]"
            }
          >
            {stage.status}
          </div>
        </div>
      ))}
    </div>
  );
}

export function TreePreview({
  dark = false,
  theme = "default",
}) {
  const forestDark = dark && theme === "forest";
  return (
    <div
      className={[
        "overflow-hidden rounded-[24px] border p-5",
        forestDark
          ? "border-[#2b3730] bg-[#101612]"
          : dark
            ? "border-white/10 bg-[#17110d]"
            : "border-[#e7dacb] bg-[#fbf6ef]",
      ].join(" ")}
    >
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p
            className={
              forestDark
                ? "text-[11px] uppercase tracking-[0.24em] text-[#b0c6ad]"
                : dark
                  ? "text-[11px] uppercase tracking-[0.24em] text-white/60"
                  : "text-[11px] uppercase tracking-[0.24em] text-[#8f7460]"
            }
          >
            Coffee tree
          </p>
          <h4
            className={
              dark ? "mt-1 text-lg text-white" : "mt-1 text-lg text-[#2d2118]"
            }
          >
            Beginner grove
          </h4>
        </div>
        <div
          className={
            forestDark
              ? "text-sm text-[#bfd2bb]"
            : dark
                ? "text-sm text-[#f0c690]"
                : "text-sm text-[#9c6b40]"
          }
        >
          62%
        </div>
      </div>
      <CoffeeTreeArtwork />
    </div>
  );
}
