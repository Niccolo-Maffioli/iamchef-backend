// Tipi allineati al backend
type IngredientType = {
  id: number;
  name: string;
  quantity?: string | null;
};

type RecipeType = {
  id: number;
  name: string;
  imageUrl?: string | null;
  description?: string | null;
  instructions?: string | null;
  ingredients?: IngredientType[];
};

export type { RecipeType, IngredientType };