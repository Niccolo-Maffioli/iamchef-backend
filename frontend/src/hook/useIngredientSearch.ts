import { useState } from "react";
import type { RecipeType, IngredientType } from "../Types/recipes";

const useIngredientSearch = (allRecipes: RecipeType[]) => {
  const [suggestions, setSuggestions] = useState<IngredientType[]>([]);

  function search(term: string) {
    if (!term.trim()) {
      setSuggestions([]);
      return;
    }

    const allIngredients = allRecipes.flatMap(r => r.ingredients ?? []);

    const normalizedTerm = term.trim().toLowerCase();
    const matches = allIngredients.filter(i =>
      i.name.toLowerCase().includes(normalizedTerm)
    );

    const uniqueMatches = Array.from(
      new Map(matches.map(i => [i.name, i])).values()
    );

    setSuggestions(uniqueMatches);
  }

  return { suggestions, search };
};

export default useIngredientSearch;