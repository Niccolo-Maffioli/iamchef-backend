import type { RecipeType } from "../../Types/recipes";
import '../../style/ScrollBtnSection.css';
import type { JSX } from "react";

type ScrollBtnSectionProps = {
  // legacy (RecipeList)
  handleNext?: () => void;
  handlePrev?: () => void;
  index?: number;
  recipes?: RecipeType[];
  // discover page
  currentIndex?: number;
  setCurrentIndex?: (index: number) => void;
  maxIndex?: number;
};

const ScrollBtnSection = ({
  // legacy props
  handleNext,
  handlePrev,
  index,
  recipes,
  // discover props
  currentIndex,
  setCurrentIndex,
  maxIndex,
}: ScrollBtnSectionProps): JSX.Element => {
  // decide quale index usare
  const idx = typeof index === "number" ? index : typeof currentIndex === "number" ? currentIndex : 0;

  // decide count / max
  const count = Array.isArray(recipes) ? recipes.length : typeof maxIndex === "number" ? maxIndex + 1 : 0;
  const max = Array.isArray(recipes) ? Math.max(0, recipes.length - 1) : typeof maxIndex === "number" ? Math.max(0, maxIndex) : 0;

  // handlers fallback: se non passati, proviamo a usare setCurrentIndex
  const onPrev = (): void => {
    if (typeof handlePrev === "function") return handlePrev();
    if (typeof setCurrentIndex === "function") return setCurrentIndex(Math.max(0, idx - 1));
  };

  const onNext = (): void => {
    if (typeof handleNext === "function") return handleNext();
    if (typeof setCurrentIndex === "function") return setCurrentIndex(Math.min(max, idx + 1));
  };

  const atStart = idx <= 0;
  const atEnd = idx >= max;

  return (
    <div className="scroll-btn-section">
      <button onClick={onPrev} disabled={atStart} aria-label="Precedente" className="arrow-btn arrow-left">
        <span className="arrow-icon">›</span>
      </button>

      <span style={{ minWidth: 60, textAlign: "center" }}>
        {count > 0 ? `${idx + 1} / ${count}` : `${idx + 1}`}
      </span>

      <button onClick={onNext} disabled={atEnd} aria-label="Successivo" className="arrow-btn">
        <span className="arrow-icon">›</span>
      </button>

    </div>
  );
};

export default ScrollBtnSection;
