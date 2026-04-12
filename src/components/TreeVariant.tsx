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

export function TreeVariant() {
  return (
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
  );
}
