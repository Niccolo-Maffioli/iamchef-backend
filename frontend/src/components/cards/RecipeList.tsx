import { useState } from "react";
import type { RecipeType } from "../../Types/recipes";
import RecipeCard from "./RecipeCard";
import ScrollBtnSection from "./ScrollBtnSection";
import "../style/RecipeCard.css";

type RecipeListProps = {
  recipes: RecipeType[];
  onSelect: (recipe: RecipeType) => void;
};

const RecipeList = ({ recipes, onSelect }: RecipeListProps) => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((current) => Math.min(current + 1, recipes.length - 1));
  };

  const handlePrev = () => {
    setIndex((current) => Math.max(current - 1, 0));
  };

  const current = recipes[index];

  if (recipes.length === 0) {
    return (
      <p style={{ marginTop: "2rem", textAlign: "center" }}>
        Nessuna ricetta trovata per questi ingredienti.
      </p>
    );
  }

  return (
    <div className="swipe-container" style={{ position: "relative", zIndex: 0 }}>
      <div className="swipe-inner">
        <RecipeCard recipe={current} onSelect={() => onSelect(current)} />
      </div>
      <ScrollBtnSection
        handleNext={handleNext}
        handlePrev={handlePrev}
        index={index}
        recipes={recipes}
      />
    </div>
  );
};

export default RecipeList;