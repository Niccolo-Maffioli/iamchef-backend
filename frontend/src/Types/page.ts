import type { RecipeType } from "./recipes";

type Pages =
    | { page: "intro" }
    | { page: "homepage" }
    | { page: "discover-recipes" }
    | { page: "recipe-details"; recipeData?: RecipeType }


type currentPage = {
    currentPage: Pages,
    id?: number
}


export type { Pages, currentPage };