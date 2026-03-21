// FilteredElementList.tsx Pagina creata prima di insetegrare iamchef-villani

import type { IngredientType } from "../../Types/recipes";

type FilteredElementListProps = {
  suggestions: IngredientType[];
  onSelect: (ingredient: IngredientType) => void;
};

const FilteredElementList = ({ suggestions, onSelect }: FilteredElementListProps) => {
  return (
    <div className="filtered-element-list">
      {suggestions.map((ingredient) => (
        <div
          key={ingredient.id}
          className="filtered-element-item"
          onClick={() => onSelect(ingredient)}
        >
          {/* <img src={ingredient.image} alt={ingredient.name} /> */}
          <span>{ingredient.name}</span>
        </div>
      ))}
    </div>
  );
};

export default FilteredElementList;
