import { useScrollBranchBackdrop } from "../../hooks/useScrollBranchBackdrop";

const trunkPath =
  "M720 1192 C718 1082 716 986 718 894 C720 784 722 694 722 618 C722 530 722 442 720 360 C718 308 718 266 722 224";

const branchPaths = [
  {
    className: "branch-backdrop__path--one",
    d: "M720 874 C696 860 674 842 656 818 C636 790 620 760 604 726 C592 700 576 670 556 638",
  },
  {
    className: "branch-backdrop__path--two",
    d: "M722 736 C754 722 784 700 810 672 C838 642 860 608 882 570 C896 544 914 514 938 482",
  },
  {
    className: "branch-backdrop__path--three",
    d: "M722 604 C698 590 676 570 656 544 C636 516 620 488 604 456 C592 432 576 404 556 372",
  },
  {
    className: "branch-backdrop__path--four",
    d: "M722 470 C746 458 772 438 796 412 C820 388 840 360 856 330 C870 304 886 276 908 248",
  },
];

export function ScrollBranchBackdrop() {
  const branchRef = useScrollBranchBackdrop();

  return (
    <div
      ref={branchRef}
      className="branch-backdrop pointer-events-none fixed inset-0 z-0 hidden lg:block"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 1200"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <defs>
          <linearGradient
            id="branch-backdrop-mask-horizontal"
            x1="0"
            y1="0"
            x2="1440"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="28%" stopColor="white" stopOpacity="1" />
            <stop offset="42%" stopColor="white" stopOpacity="0.38" />
            <stop offset="58%" stopColor="white" stopOpacity="0.28" />
            <stop offset="72%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="white" stopOpacity="1" />
          </linearGradient>
          <mask id="branch-backdrop-branches-mask">
            <rect
              x="0"
              y="0"
              width="1440"
              height="1200"
              fill="url(#branch-backdrop-mask-horizontal)"
            />
          </mask>
        </defs>

        <g className="branch-backdrop__trunk">
          <g className="branch-backdrop__ambient-spine">
            <path
              className="branch-backdrop__path branch-backdrop__path--trunk"
              pathLength="100"
              d={trunkPath}
            />
          </g>
          <g className="branch-backdrop__shadow branch-backdrop__shadow--trunk">
            <path
              className="branch-backdrop__path branch-backdrop__path--trunk"
              pathLength="100"
              d={trunkPath}
            />
          </g>
          <g className="branch-backdrop__stroke branch-backdrop__stroke--trunk">
            <path
              className="branch-backdrop__path branch-backdrop__path--trunk"
              pathLength="100"
              d={trunkPath}
            />
          </g>
          <g
            className="branch-backdrop__branches"
            mask="url(#branch-backdrop-branches-mask)"
          >
            <g className="branch-backdrop__shadow branch-backdrop__shadow--branches">
              {branchPaths.map((branch) => (
                <path
                  key={branch.className}
                  className={`branch-backdrop__path ${branch.className}`}
                  pathLength="100"
                  d={branch.d}
                />
              ))}
            </g>
            <g className="branch-backdrop__stroke branch-backdrop__stroke--branches">
              {branchPaths.map((branch) => (
                <path
                  key={`${branch.className}-stroke`}
                  className={`branch-backdrop__path ${branch.className}`}
                  pathLength="100"
                  d={branch.d}
                />
              ))}
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
