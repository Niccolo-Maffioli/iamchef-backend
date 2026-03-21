import { useCallback, useState } from "react";
import type { RecipeType } from "../Types/recipes";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:8080";

const useRecipeSearch = () => {
  const [allRecipes, setAllRecipes] = useState<RecipeType[]>([]);
  const [recipes, setRecipes] = useState<RecipeType[]>([]);
  const [activeRecipe, setActiveRecipe] = useState<RecipeType | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const setActiveRecipeManually = useCallback((recipe: RecipeType | null) => {
    setActiveRecipe(recipe);
  }, []);

  const setActiveRecipeByIndex = useCallback((index: number) => {
    setActiveRecipe((prev) => {
      if (recipes.length === 0) {
        return null;
      }
      const safeIndex = Math.max(0, Math.min(index, recipes.length - 1));
      return recipes[safeIndex] ?? prev ?? null;
    });
  }, [recipes]);

  const resetSearch = useCallback(() => {
    setRecipes(allRecipes);
    setActiveRecipe(allRecipes[0] ?? null);
    setIsSearching(false);
  }, [allRecipes]);

  const filterByIngredients = useCallback((queries: string[], source?: RecipeType[]) => {
    const base = source ?? allRecipes;
    const normalized = queries
      .map((q) => q.trim().toLowerCase())
      .filter((q) => q.length > 0);

    if (normalized.length === 0) {
      setRecipes(base);
      setActiveRecipe(base[0] ?? null);
      return;
    }

    const filtered = base.filter((recipe) => {
      const ingredients = recipe.ingredients ?? [];
      const ingredientNames = ingredients.map((ingredient) => ingredient.name.toLowerCase());
      return normalized.every((query) =>
        ingredientNames.some((name) => name.includes(query))
      );
    });

    setRecipes(filtered);
    setActiveRecipe(filtered[0] ?? null);
  }, [allRecipes]);

  const fetchRecipes = useCallback(async (): Promise<RecipeType[]> => {
    setIsSearching(true);

    try {
      const response = await fetch(`${API_BASE_URL}/recipes`);

      if (!response.ok) {
        throw new Error(`Errore durante il recupero delle ricette (${response.status})`);
      }

      const payload = await response.json();
      const fetchedRecipes: RecipeType[] = Array.isArray(payload) ? payload : [];
      setAllRecipes(fetchedRecipes);
      setRecipes(fetchedRecipes);
      setActiveRecipe(fetchedRecipes[0] ?? null);
      return fetchedRecipes;
    } catch (error) {
      setAllRecipes([]);
      setRecipes([]);
      setActiveRecipe(null);
      throw error;
    } finally {
      setIsSearching(false);
    }
  }, []);

  return {
    allRecipes,
    recipes,
    activeRecipe,
    isSearching,
    fetchRecipes,
    filterByIngredients,
    resetSearch,
    setActiveRecipeManually,
    setActiveRecipeByIndex,
  };
};

export default useRecipeSearch;
