import { useEffect, useState } from "react";
import type { RecipeType, IngredientType } from "../Types/recipes";
import '../style/RecipeDetail.css';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL ?? "";

type RecipeDetailProps = {
  id: number;
  recipeData: RecipeType;
  goToBack: () => void;
};

const RecipeDetail = ({ id, recipeData, goToBack }: RecipeDetailProps) => {
  const [detail, setDetail] = useState<RecipeType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(`${API_BASE_URL}/recipes/${id}`);

        if (!response.ok) {
          throw new Error(`Errore nel recupero del dettaglio (${response.status})`);
        }

        const data = await response.json();
        setDetail(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  const recipe = detail ?? recipeData;

  const ingredients: IngredientType[] = recipe.ingredients ?? [];
  const rawImageUrl = (
    recipe.imageUrl ??
    (recipe as RecipeType & { image_url?: string; imageURL?: string }).image_url ??
    (recipe as RecipeType & { image_url?: string; imageURL?: string }).imageURL
  );
  const imageUrl = rawImageUrl?.trim();

  return (
    <div className="recipe-detail">
      {imageUrl ? (
        <img src={imageUrl} alt={recipe.name} />
      ) : (
        <div className="image-placeholder" aria-hidden="true">Ricetta</div>
      )}
      <div className="details">
        <button onClick={goToBack}>Indietro</button>
        <h2>{recipe.name}</h2>
        {recipe.description && <p className="recipe-description">{recipe.description}</p>}
        {recipe.instructions && <p className="recipe-instructions">{recipe.instructions}</p>}

        {loading && <p>Caricamento dettagli...</p>}
        {error && <p className="error">{error}</p>}

        <h3>Ingredienti</h3>
        {ingredients.length === 0 ? (
          <p>Nessun ingrediente disponibile.</p>
        ) : (
          <ul>
            {ingredients.map((ingredient, index) => (
              <li key={ingredient.id ?? `${ingredient.name}-${index}`}>
                <span>{ingredient.name}</span>
                {ingredient.quantity && <span> - {ingredient.quantity}</span>}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default RecipeDetail;