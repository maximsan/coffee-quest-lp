import { useState } from "react";
import {
  CherryGroup1,
  CherryGroup2,
  FlowerPot,
  PotDefs,
  SoilStemTip,
  SoftLeaf,
  STEM_BASE_Y,
  STEM_COLOR,
} from "./TreeArtworkPrimitives";

export function TreeCard({ children }) {
  return (
    <article className="grove-card rounded-[34px] border border-white/10 bg-[#17110d] p-5 shadow-[0_28px_60px_rgba(0,0,0,0.28)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-botanical-body text-[11px] uppercase tracking-[0.34em] text-white/34">
            Coffee tree
          </p>
          <h4 className="mt-3 font-botanical-body text-[clamp(2rem,5vw,2.6rem)] leading-none text-[#f7efe4]">
            Beginner grove
          </h4>
        </div>
        <div className="pt-5 font-botanical-body text-[2rem] leading-none text-[#ecc28b] sm:text-[2.25rem]">
          62%
        </div>
      </div>

      <div className="mt-5 rounded-[42px] bg-[linear-gradient(180deg,#3a2a1f,#261a13)] p-6">
        <div className="relative mx-auto h-[250px] max-w-[360px] overflow-hidden">
          {children}
        </div>
      </div>
    </article>
  );
}

function TreeOptionOne() {
  return (
    <TreeCard>
      <svg
        viewBox="0 0 320 240"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <PotDefs />
        <g className="grove-tree-sway">
          <path
            d={`M160 ${STEM_BASE_Y} V124`}
            stroke={STEM_COLOR}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M160 138 C149 127 144 120 140 112"
            stroke={STEM_COLOR}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M160 136 C171 126 176 120 180 111"
            stroke={STEM_COLOR}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M160 124 C154 110 152 96 150 82"
            stroke={STEM_COLOR}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M160 124 C166 110 168 96 170 82"
            stroke={STEM_COLOR}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <SoftLeaf
            x={140}
            y={112}
            angle={-34}
            size={0.72}
            fill="#7fa96b"
            form="tapered"
            direction="left"
          />
          <SoftLeaf
            x={150}
            y={84}
            angle={-96}
            size={1.45}
            fill="#90ba79"
            form="round"
            direction="right"
          />
          <SoftLeaf
            x={168}
            y={78}
            angle={34}
            size={0.82}
            fill="#85b36d"
            form="wide"
            direction="right"
          />
          <SoftLeaf
            x={180}
            y={110}
            angle={118}
            size={1.52}
            fill="#8ab474"
            form="slender"
            direction="left"
          />
        </g>
        <CherryGroup1 x={136} y={102} scale={0.72} />
        <CherryGroup1 x={170} y={92} scale={0.64} />
        <FlowerPot />
        <SoilStemTip />
      </svg>
    </TreeCard>
  );
}

function TreeOptionTwo() {
  return (
    <TreeCard>
      <svg
        viewBox="0 0 320 240"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <PotDefs />
        <g className="grove-tree-sway">
          <path
            d={`M160 ${STEM_BASE_Y} V108`}
            stroke={STEM_COLOR}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M160 136 C148 124 136 112 124 94"
            stroke={STEM_COLOR}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M160 142 C176 128 188 112 200 96"
            stroke={STEM_COLOR}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M160 116 C148 100 143 84 140 64"
            stroke={STEM_COLOR}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M160 118 C173 102 182 86 190 66"
            stroke={STEM_COLOR}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {[
            [124, 94, -48, "#76a261", 1.44, "tapered", "left"],
            [140, 64, -102, "#8cb575", 0.98, "round", "right"],
            [190, 66, 28, "#88b371", 0.82, "wide", "right"],
            [198, 98, 132, "#84ae6f", 1.56, "slender", "left"],
          ].map(([x, y, angle, fill, size, form, direction]) => (
            <SoftLeaf
              key={`${x}-${y}`}
              x={x}
              y={y}
              angle={angle}
              size={size}
              fill={fill}
              form={form}
              direction={direction}
            />
          ))}
        </g>

        <FlowerPot />
        <SoilStemTip />
      </svg>
    </TreeCard>
  );
}

function TreeOptionThree() {
  return (
    <TreeCard>
      <svg
        viewBox="0 0 320 240"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <PotDefs />
        <g className="grove-tree-sway-slow">
          <path
            d={`M160 ${STEM_BASE_Y} V98`}
            stroke={STEM_COLOR}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M160 136 C148 118 140 104 132 86"
            stroke={STEM_COLOR}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M160 130 C174 112 184 96 192 76"
            stroke={STEM_COLOR}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M160 106 C152 90 148 72 146 52"
            stroke={STEM_COLOR}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {[
            [162, 173, -134, "#8db676", 1.25, "wide", "right"],
            [149, 72, 16, "#94bc7a", 0.72, "tapered", "left"],
            [162, 178, -58, "#85ae6f", 0.96, "slender", "right"],
            [180, 106, -98, "#85ae6f", 0.7, "slender", "right"],
            [180, 106, 158, "#7ea866", 0.9, "round", "left"],
          ].map(([x, y, angle, fill, size, form, direction]) => (
            <SoftLeaf
              key={`${x}-${y}`}
              x={x}
              y={y}
              angle={angle}
              size={size}
              fill={fill}
              form={form}
              direction={direction}
            />
          ))}
          <CherryGroup2 x={134} y={98} scale={0.58} />
          <CherryGroup1 x={158} y={164} scale={0.68} />
          <CherryGroup2 x={184} y={96} scale={0.52} />
        </g>
        <FlowerPot />
        <SoilStemTip />
      </svg>
    </TreeCard>
  );
}

function TreeOptionFour() {
  return (
    <TreeCard>
      <svg
        viewBox="0 0 320 240"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <PotDefs />
        <g className="grove-tree-sway">
          <path
            d={`M160 ${STEM_BASE_Y} V104`}
            stroke={STEM_COLOR}
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M160 138 C142 124 126 108 112 88"
            stroke={STEM_COLOR}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M160 138 C178 124 194 108 208 88"
            stroke={STEM_COLOR}
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M160 114 C148 96 140 76 136 54"
            stroke={STEM_COLOR}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M160 114 C174 96 184 76 192 54"
            stroke={STEM_COLOR}
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          {[
            [112, 88, -42, "#8cb676", 1.62, "wide", "left"],
            [136, 54, -108, "#80aa69", 0.7, "tapered", "right"],
            [192, 54, 42, "#90ba79", 1.42, "balanced", "right"],
            [208, 88, 126, "#84ae6f", 0.78, "slender", "left"],
          ].map(([x, y, angle, fill, size, form, direction]) => (
            <SoftLeaf
              key={`${x}-${y}`}
              x={x}
              y={y}
              angle={angle}
              size={size}
              fill={fill}
              form={form}
              direction={direction}
            />
          ))}
        </g>

        <g
          stroke={STEM_COLOR}
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        >
          <path d="M126 102 C118 102 112 103 106 105" />
          <path d="M194 102 C202 102 208 103 214 105" />
          <path d="M160 76 C160 72 160 66 160 60" />
        </g>

        <CherryGroup1 x={96} y={100} scale={0.88} />
        <CherryGroup1 x={202} y={100} scale={0.88} />
        <CherryGroup1 x={149} y={56} scale={0.82} />
        <FlowerPot />
        <SoilStemTip />
      </svg>
    </TreeCard>
  );
}

export function BeginnerGroveVariants() {
  const slides = [
    {
      id: "rounded-tree",
      label: "Option 1 / Rounded canopy",
      component: <TreeOptionOne />,
    },
    {
      id: "coffee-branches",
      label: "Option 2 / Branched coffee tree",
      component: <TreeOptionTwo />,
    },
    {
      id: "tall-grow",
      label: "Option 3 / Upright growth",
      component: <TreeOptionThree />,
    },
    {
      id: "fruiting-tree",
      label: "Option 4 / Fruiting canopy",
      component: <TreeOptionFour />,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((current) =>
      current === 0 ? slides.length - 1 : current - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((current) =>
      current === slides.length - 1 ? 0 : current + 1,
    );
  };

  return (
    <div className="mx-auto mt-5 w-full max-w-[860px]">
      <div className="flex items-center justify-between gap-3 px-1">
        <div>
          <p className="font-botanical-body text-[11px] uppercase tracking-[0.24em] text-white/45">
            Tree option
          </p>
          <p className="mt-1 font-botanical-body text-sm text-white/68">
            {slides[activeIndex].label}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-botanical-body text-xs uppercase tracking-[0.24em] text-white/45">
            {activeIndex + 1} / {slides.length}
          </span>
          <button
            type="button"
            onClick={goToPrevious}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-lg text-[#f6ede3] transition hover:border-white/25 hover:bg-white/10"
            aria-label="Show previous tree option"
          >
            ←
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/5 text-lg text-[#f6ede3] transition hover:border-white/25 hover:bg-white/10"
            aria-label="Show next tree option"
          >
            →
          </button>
        </div>
      </div>

      <div className="relative mt-4 overflow-hidden rounded-[34px]">
        <div
          className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
          aria-live="polite"
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="w-full shrink-0 px-1 py-1"
              aria-hidden={slide.id !== slides[activeIndex].id}
            >
              <div className="mx-auto max-w-[640px]">{slide.component}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={() => setActiveIndex(index)}
            className={[
              "h-3 rounded-full transition",
              index === activeIndex
                ? "w-10 bg-[#e7bd86]"
                : "w-3 bg-white/18 hover:bg-white/34",
            ].join(" ")}
            aria-label={`Show ${slide.label}`}
            aria-pressed={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}
