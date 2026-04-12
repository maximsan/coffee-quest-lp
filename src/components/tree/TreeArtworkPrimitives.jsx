export const STEM_COLOR = "#6f8658";
export const STEM_BASE_Y = 196;

const LEAF_FORMS = {
  balanced: {
    body: "M0 16 C12 0 38 0 52 16 C38 32 12 32 0 16 Z",
    vein: "M7 16 H45",
  },
  slender: {
    body: "M0 16 C14 3 37 3 52 16 C38 29 14 29 0 16 Z",
    vein: "M9 16 H43",
  },
  round: {
    body: "M0 16 C10 2 34 -1 52 16 C35 33 12 31 0 16 Z",
    vein: "M8 16 H42",
  },
  wide: {
    body: "M0 16 C8 5 42 3 52 16 C42 29 10 28 0 16 Z",
    vein: "M6 16 H46",
  },
  tapered: {
    body: "M0 16 C16 1 41 6 52 16 C40 27 16 31 0 16 Z",
    vein: "M10 16 H42",
  },
};

export function SoftLeaf({
  x,
  y,
  angle = 0,
  size = 1,
  fill = "#82ad6d",
  vein = "#5e8650",
  form = "balanced",
  petiole = 10,
  direction = "right",
}) {
  const shape = LEAF_FORMS[form];
  const scaleX = direction === "left" ? -size : size;

  return (
    <g
      transform={`translate(${x} ${y}) rotate(${angle}) scale(${scaleX} ${size})`}
    >
      <path
        d={`M0 0 H${petiole + 8}`}
        stroke={vein}
        strokeWidth="1.9"
        strokeLinecap="round"
        opacity="0.8"
      />
      <g transform={`translate(${petiole} -16)`}>
        <path d={shape.body} fill={fill} />
        <path
          d={shape.vein}
          stroke={vein}
          strokeWidth="1.7"
          strokeLinecap="round"
          opacity="0.55"
        />
      </g>
    </g>
  );
}

export function CherryGroup1({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="12" cy="12" r="6" fill="#d6913f" />
      <circle cx="6" cy="10" r="6" fill="#e0b64f" />
      <circle cx="18" cy="6" r="6" fill="#d6913f" />
    </g>
  );
}

export function CherryGroup2({ x, y, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <circle cx="12" cy="12" r="6" fill="#d6913f" />
      <circle cx="6" cy="10" r="6" fill="#e0b64f" />
      <circle cx="18" cy="6" r="6" fill="#d6913f" />
      <circle cx="10" cy="19" r="6" fill="#e0b64f" />
    </g>
  );
}

export function FlowerPot({ x = 160, y = 198, scale = 1 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx="0" cy="20" rx="44" ry="10" fill="#e8dcc6" opacity="0.35" />
      <path
        d="M-36 -2 C-34 36 -24 62 0 66 C24 62 34 36 36 -2 Z"
        fill="url(#pot-body)"
      />
      <ellipse cx="0" cy="-4" rx="42" ry="11" fill="#d8b084" />
      <ellipse cx="0" cy="-2" rx="33" ry="8" fill="#3d2d22" />
      <path
        d="M-18 10 C-18 28 -13 44 -4 56"
        stroke="#f3d7b0"
        strokeWidth="9"
        strokeLinecap="round"
        opacity="0.55"
      />
    </g>
  );
}

export function PotDefs() {
  return (
    <defs>
      <linearGradient id="pot-body" x1="0" x2="1" y1="0" y2="1">
        <stop offset="0%" stopColor="#d5ac7f" />
        <stop offset="62%" stopColor="#c89a69" />
        <stop offset="100%" stopColor="#b98457" />
      </linearGradient>
    </defs>
  );
}

export function SoilStemTip({ x = 160, y1 = 184, y2 = 196 }) {
  return (
    <path
      d={`M${x} ${y1} V${y2}`}
      stroke={STEM_COLOR}
      strokeWidth="6"
      strokeLinecap="round"
      fill="none"
    />
  );
}
