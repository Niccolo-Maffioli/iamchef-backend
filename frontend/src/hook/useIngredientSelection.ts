import { useCallback, useState } from "react";
import type { IngredientType } from "../Types/recipes";

const useIngredientSelection = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<IngredientType[]>([]);

  const addIngredient = useCallback((ingredient: IngredientType) => {
    setSelectedIngredients((prev) => {
      if (prev.some((item) => item.id === ingredient.id)) {
        return prev;
      }
      return [...prev, ingredient];
    });
  }, []);

  const removeIngredient = useCallback((ingredient: IngredientType) => {
    setSelectedIngredients((prev) => prev.filter((item) => item.id !== ingredient.id));
  }, []);

  const resetIngredients = useCallback(() => {
    setSelectedIngredients([]);
  }, []);

  return {
    selectedIngredients,
    addIngredient,
    removeIngredient,
    resetIngredients,
  };
};

export default useIngredientSelection;
