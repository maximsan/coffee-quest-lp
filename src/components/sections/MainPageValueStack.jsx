import coffeeTreeGrowthVideo from "../../assets/Flowerpot_seed_to.mp4";
import { features } from "../../data/content";
import { AudienceList } from "../previews/AudienceList";
import { CoffeeCardsPreview } from "../previews/CoffeeCardsPreview";
import { ProgressPreview } from "../previews/ProgressPreview";
import { SectionTag } from "../shared/SectionTag";
import { BeginnerGroveVariants } from "../tree/BeginnerGroveVariants";

export function MainPageValueStack() {
  const showTreeDirections = false;

  return (
    <div className="grid gap-6">
      <div className="rise-in rounded-[36px] border border-[#304236] bg-[linear-gradient(135deg,rgba(124,167,118,0.12),rgba(255,255,255,0.03))] p-7">
        <div className="mx-auto max-w-[620px] text-center">
          <SectionTag dark>Feature highlights</SectionTag>
          <h2 className="mt-5 font-botanical-display text-4xl leading-none text-[#f6ede3] sm:text-5xl">
            Everything stays visible, structured, and easy to return to.
          </h2>
        </div>
        <div className="mx-auto mt-8 grid max-w-[760px] gap-4 sm:grid-cols-2">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={[
                "rounded-[26px] border border-white/10 bg-[#101512] p-5 text-center",
                index === features.length - 1 && features.length % 2 !== 0
                  ? "sm:col-span-2 sm:mx-auto sm:w-full sm:max-w-[372px]"
                  : "",
              ].join(" ")}
            >
              <h3 className="font-botanical-display text-2xl text-[#f6efe6]">
                {feature.title}
              </h3>
              <p className="font-botanical-body mt-3 text-sm leading-7 text-white/62">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="rise-in rounded-[36px] border border-white/10 bg-white/5 p-7">
        <div className="mx-auto max-w-[760px] text-center">
          <SectionTag dark>Who it&apos;s for</SectionTag>
          <h2 className="mt-5 font-botanical-display text-4xl leading-none text-[#f6ede3] sm:text-5xl">
            Curious people who want daily momentum, not a coffee lecture.
          </h2>
        </div>
        <div className="mx-auto mt-6 max-w-[760px]">
          <AudienceList dark />
        </div>
      </div>

      <div className="rise-in rounded-[36px] border border-white/10 bg-[#101512] p-7">
        <div className="mx-auto max-w-[760px] text-center">
          <SectionTag dark>Progress and recall</SectionTag>
          <h2 className="mt-5 font-botanical-display text-4xl leading-none text-[#f6ede3] sm:text-5xl">
            Quick references and visible growth stay close at hand.
          </h2>
          <p className="mt-4 font-botanical-body text-base leading-7 text-white/62">
            Coffee Cards help key ideas stay reviewable, while the growth
            visual keeps progress present without overpowering the page.
          </p>
        </div>
        <div className="mx-auto mt-6 grid max-w-[760px] gap-4">
          <div className="rounded-[30px] border border-white/10 bg-white/5 p-4">
            <div className="overflow-hidden rounded-[24px] border border-[#516a51] bg-[#18201c] shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="block h-auto w-full"
                aria-label="Coffee tree growth animation"
              >
                <source src={coffeeTreeGrowthVideo} type="video/mp4" />
              </video>
            </div>
          </div>

          {showTreeDirections && (
            <div className="rounded-[30px] border border-white/10 bg-white/5 p-4 lg:p-5">
              <div className="mx-auto max-w-[620px] text-center">
                <p className="font-botanical-body text-[11px] uppercase tracking-[0.28em] text-[#c8b18d]">
                  Tree directions
                </p>
                <h3 className="mt-3 font-botanical-display text-3xl leading-none text-[#f6ede3]">
                  Compare four `Beginner grove` variants.
                </h3>
              </div>
              <BeginnerGroveVariants />
            </div>
          )}
        </div>

        <div className="mx-auto mt-6 grid w-full max-w-[1120px] gap-4 2xl:grid-cols-[minmax(0,500px)_minmax(0,560px)] 2xl:justify-center">
          <div className="rounded-[30px] border border-white/10 bg-white/5 p-4 lg:p-5">
            <div className="rounded-[22px] border border-white/10 bg-[#111714] p-5 lg:p-6">
              <p className="font-botanical-body text-[11px] uppercase tracking-[0.28em] text-[#c8b18d]">
                Progress snapshot
              </p>
              <h3 className="mt-3 max-w-[16ch] font-botanical-display text-3xl leading-none text-[#f6ede3] sm:text-[2.2rem]">
                Small lessons, visible growth
              </h3>
              <p className="mt-3 max-w-[34rem] font-botanical-body text-sm leading-7 text-white/62 sm:text-[15px]">
                The coffee tree stays secondary to the learning path, but it
                now remains clearly visible as a calm metaphor for steady
                progress.
              </p>
              <div className="mt-5">
                <ProgressPreview dark />
              </div>
            </div>
          </div>

          <div className="rounded-[30px] border border-white/10 bg-white/5 p-4 lg:p-5">
            <div className="mx-auto max-w-[720px] text-center">
              <p className="font-botanical-body text-[11px] uppercase tracking-[0.28em] text-[#c8b18d]">
                Coffee Cards
              </p>
              <h3 className="mt-3 font-botanical-display text-3xl leading-none text-[#f6ede3] sm:text-[2.2rem]">
                Keep the essentials close.
              </h3>
            </div>
            <div className="mx-auto mt-5 max-w-[720px]">
              <CoffeeCardsPreview dark />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
