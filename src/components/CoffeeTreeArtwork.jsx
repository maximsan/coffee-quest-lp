import { TreeVariant } from "./TreeVariant";

export function CoffeeTreeArtwork() {
  const baseClass =
    "relative h-40 overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,rgba(212,177,129,0.16),rgba(72,46,29,0.08))]";

  return (
    <div className={baseClass}>
      <TreeVariant />
    </div>
  );
}
