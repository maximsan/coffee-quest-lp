import { useScrollBranchBackdrop } from "../../hooks/useScrollBranchBackdrop";

export function ScrollBranchBackdrop() {
  const branchRef = useScrollBranchBackdrop();

  return (
    <div
      ref={branchRef}
      className="branch-backdrop pointer-events-none fixed inset-0 z-0 hidden md:block"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 1200"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        <g className="branch-backdrop__trunk">
          <g className="branch-backdrop__shadow">
            <path
              className="branch-backdrop__path branch-backdrop__path--trunk"
              pathLength="100"
              d="M720 1192 C718 1082 716 986 718 894 C720 784 722 694 722 618 C722 530 722 442 720 360 C718 308 718 266 722 224"
            />
            <path
              className="branch-backdrop__path branch-backdrop__path--one"
              pathLength="100"
              d="M720 872 C694 856 670 834 650 806 C630 778 614 748 598 714 C586 686 570 654 548 618"
            />
            <path
              className="branch-backdrop__path branch-backdrop__path--two"
              pathLength="100"
              d="M722 734 C756 718 788 694 816 662 C844 630 866 594 888 554 C904 524 922 492 948 456"
            />
            <path
              className="branch-backdrop__path branch-backdrop__path--three"
              pathLength="100"
              d="M722 600 C694 584 670 560 648 530 C628 502 612 472 596 438 C584 412 570 382 548 346"
            />
            <path
              className="branch-backdrop__path branch-backdrop__path--four"
              pathLength="100"
              d="M722 466 C748 454 774 432 800 404 C824 378 844 348 860 316 C874 288 892 260 914 230"
            />
          </g>
          <g className="branch-backdrop__stroke">
            <path
              className="branch-backdrop__path branch-backdrop__path--trunk"
              pathLength="100"
              d="M720 1192 C718 1082 716 986 718 894 C720 784 722 694 722 618 C722 530 722 442 720 360 C718 308 718 266 722 224"
            />
            <path
              className="branch-backdrop__path branch-backdrop__path--one"
              pathLength="100"
              d="M720 872 C694 856 670 834 650 806 C630 778 614 748 598 714 C586 686 570 654 548 618"
            />
            <path
              className="branch-backdrop__path branch-backdrop__path--two"
              pathLength="100"
              d="M722 734 C756 718 788 694 816 662 C844 630 866 594 888 554 C904 524 922 492 948 456"
            />
            <path
              className="branch-backdrop__path branch-backdrop__path--three"
              pathLength="100"
              d="M722 600 C694 584 670 560 648 530 C628 502 612 472 596 438 C584 412 570 382 548 346"
            />
            <path
              className="branch-backdrop__path branch-backdrop__path--four"
              pathLength="100"
              d="M722 466 C748 454 774 432 800 404 C824 378 844 348 860 316 C874 288 892 260 914 230"
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
