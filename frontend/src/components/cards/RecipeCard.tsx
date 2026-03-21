import type { RecipeType } from "../../Types/recipes";
//import { useApi, getRecipeURL } from "../../hook/useApi";
import '../../style/RecipeCard.css'


type RecipeCardProps = {
  recipe: RecipeType;
  onSelect?: () => void;
};

const RecipeCard = ({ recipe, onSelect }: RecipeCardProps) => {
  const ingredientCount = recipe.ingredients?.length ?? 0;
  const description = recipe.description?.trim();
  const rawImageUrl = (
    recipe.imageUrl ??
    (recipe as RecipeType & { image_url?: string; imageURL?: string }).image_url ??
    (recipe as RecipeType & { image_url?: string; imageURL?: string }).imageURL
  );
  const imageUrl = rawImageUrl?.trim();

  return (
    <div className="card" onClick={onSelect}>
      {imageUrl ? (
        <img src={imageUrl} alt={recipe.name} />
      ) : (
        <div className="image-placeholder" aria-hidden="true">Ricetta</div>
      )}
      <h3>{recipe.name}</h3>
      <hr />
      {description && <p>{description}</p>}
      <p>Ingredienti: {ingredientCount}</p>
      <br />
    </div>
  );
}

export default RecipeCard