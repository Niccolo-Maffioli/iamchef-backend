import { useCallback, useEffect, useState } from "react";
import type { NavigateFunction } from "react-router-dom";
import type { RecipeType } from "../Types/recipes";

interface UseRecipeNavigationParams {
  recipes: RecipeType[];
  navigate: NavigateFunction;
  setActiveRecipeByIndex: (index: number) => void;
  setActiveRecipeManually: (recipe: RecipeType | null) => void;
}

const useRecipeNavigation = ({
  recipes,
  navigate,
  setActiveRecipeByIndex,
  setActiveRecipeManually,
}: UseRecipeNavigationParams) => {
  const [currentIndex, setCurrentIndexState] = useState(0);

  useEffect(() => {
    if (recipes.length === 0) {
      setCurrentIndexState(0);
      setActiveRecipeManually(null);
      return;
    }

    setCurrentIndexState((prev) => {
      const safeIndex = Math.max(0, Math.min(prev, recipes.length - 1));
      setActiveRecipeByIndex(safeIndex);
      return safeIndex;
    });
  }, [recipes, setActiveRecipeByIndex, setActiveRecipeManually]);

  const setCurrentIndex = useCallback((index: number) => {
    if (recipes.length === 0) {
      setCurrentIndexState(0);
      setActiveRecipeManually(null);
      return;
    }

    const safeIndex = Math.max(0, Math.min(index, recipes.length - 1));
    setCurrentIndexState(safeIndex);
    setActiveRecipeByIndex(safeIndex);
  }, [recipes, setActiveRecipeByIndex, setActiveRecipeManually]);

  const handleRecipeDetailsClick = useCallback((recipe: RecipeType) => {
    const idx = recipes.findIndex((item) => item.id === recipe.id);
    const safeIndex = idx >= 0 ? idx : 0;
    setCurrentIndex(safeIndex);
    setActiveRecipeManually(recipe);
    const recipeId = Number.isFinite(recipe.id) ? recipe.id : safeIndex;
    navigate(`/recipe-details/${Number.isNaN(recipeId) ? safeIndex : recipeId}`);
  }, [navigate, recipes, setActiveRecipeManually, setCurrentIndex]);

  const handleClickBack = useCallback(() => {
    navigate("/discover");
  }, [navigate]);

  const resetNavigation = useCallback(() => {
    setCurrentIndexState(0);
    setActiveRecipeManually(null);
  }, [setActiveRecipeManually]);

  return {
    currentIndex,
    setCurrentIndex,
    handleRecipeDetailsClick,
    handleClickBack,
    resetNavigation,
  };
};

export default useRecipeNavigation;
