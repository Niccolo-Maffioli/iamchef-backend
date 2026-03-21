// FilterPage.tsx Pagina creata prima di insetegrare iamchef-villani

import { useRecipeFilter } from "../../hook/useRecipeFilter";
import recipeData from "../../mock/mock";
import { useState } from "react";
import SearchBar from "../search/SearchBar";
import TagsContainer from "../search/TagsContainer";

const FilterPage = () => {
  const { tags, filteredRecipes, addTag, removeTag } = useRecipeFilter(recipeData);
  const [query, setQuery] = useState("");
  const handleSubmit = () => {
    if (!query.trim()) return;
    addTag(query.trim());
    setQuery("");
  };

  return (
    <div>
      <h2>Filter Recipes by Ingredients</h2>
      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={handleSubmit}
        suggestions={recipeData.flatMap((recipe) => (recipe.ingredients ?? []).map((i) => i.name))}
      />
      <TagsContainer tags={tags} onRemove={removeTag} />

      <div className="recipe-results">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((r) => <p key={r.id}>{r.name}</p>)
        ) : (
          <p>No recipes yet...</p>
        )}
      </div>
    </div>
  );
};

export default FilterPage;
