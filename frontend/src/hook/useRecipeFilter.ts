import { useState } from "react";
import type { RecipeType } from "../Types/recipes";


function useRecipeFilter(allRecipes: RecipeType[]) {
  const [tags, setTags] = useState<string[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<RecipeType[]>([]);

  function normalize(str: string) {
    return str.trim().toLowerCase();
  }

  function filterRecipes(currentTags: string[]) {
    if (currentTags.length === 0) {
      setFilteredRecipes([]);
      return;
    }

    const filtered = allRecipes.filter(recipe =>
      currentTags.every(tag => {
        const ingredients = recipe.ingredients ?? [];
        return ingredients.some((ingredient) =>
          normalize(ingredient.name).includes(normalize(tag))
        );
      })
    );
    setFilteredRecipes(filtered);
  }

  function addTag(tag: string) {
    const cleanTag = normalize(tag);
    if (!tags.includes(cleanTag)) {
      const newTags = [...tags, cleanTag];
      setTags(newTags);
      filterRecipes(newTags);
      return true;
    }
    return false;
  }

  function removeTag(tag: string) {
    const newTags = tags.filter(t => t !== normalize(tag));
    setTags(newTags);
    filterRecipes(newTags);
  }

  return { tags, filteredRecipes, addTag, removeTag };
}

export { useRecipeFilter };