import { useEffect, useMemo, useState } from "react";
import { Navigate, useNavigate, useParams, useRoutes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import DiscoverPage from "./pages/DiscoverPage";
import RecipeDetail from "./pages/RecipeDetail";
import SearchPage from "./pages/SearchPage";
import "./App.css";
import useRecipeSearch from "./hook/useRecipeSearch";
import useRecipeNavigation from "./hook/useRecipeNavigation";

const App = () => {
  const navigate = useNavigate();
  const {
    allRecipes,
    recipes,
    activeRecipe,
    isSearching,
    fetchRecipes,
    filterByIngredients,
    setActiveRecipeManually,
    setActiveRecipeByIndex,
  } = useRecipeSearch();
  const [ingredientQuery, setIngredientQuery] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const ingredientSuggestions = useMemo(() => {
    const names: string[] = [];
    const seen = new Set<string>();
    allRecipes.forEach((recipe) => {
      (recipe.ingredients ?? []).forEach((ingredient) => {
        const label = ingredient.name?.trim();
        if (!label) return;
        const key = label.toLowerCase();
        if (!seen.has(key)) {
          seen.add(key);
          names.push(label);
        }
      });
    });
    return names;
  }, [allRecipes]);
  const {
    currentIndex,
    setCurrentIndex,
    handleRecipeDetailsClick,
    handleClickBack,
  } = useRecipeNavigation({
    recipes,
    navigate,
    setActiveRecipeByIndex,
    setActiveRecipeManually,
  });

  useEffect(() => {
    fetchRecipes().catch((error) => {
      console.error("Errore nel caricamento delle ricette:", error);
    });
  }, [fetchRecipes]);

  const buildIngredientList = (value?: string) => {
    const candidate = (value ?? ingredientQuery).trim();
    let next = selectedIngredients;
    if (candidate) {
      const exists = selectedIngredients.some(
        (item) => item.toLowerCase() === candidate.toLowerCase()
      );
      if (!exists) {
        next = [...selectedIngredients, candidate];
      }
    }
    if (candidate) {
      setIngredientQuery("");
      setSelectedIngredients(next);
    }
    return next;
  };

  const applyFilter = (ingredients: string[], source?: typeof allRecipes) => {
    filterByIngredients(ingredients, source);
    setCurrentIndex(0);
  };

  const handleSearchClick = async (queryOverride?: string) => {
    const nextList = buildIngredientList(queryOverride);
    if (allRecipes.length === 0 && !isSearching) {
      try {
        const fetched = await fetchRecipes();
        applyFilter(nextList, fetched);
        navigate("/discover");
        return;
      } catch (error) {
        console.error("Errore nel caricamento delle ricette:", error);
      }
    }
    applyFilter(nextList);
    navigate("/discover");
  };

  const handleRemoveIngredient = (ingredient: string) => {
    const next = selectedIngredients.filter(
      (item) => item.toLowerCase() !== ingredient.toLowerCase()
    );
    setSelectedIngredients(next);
    applyFilter(next);
    if (next.length === 0) {
      navigate("/");
    }
  };
  const handleReloadRecipes = async () => {
    try {
      const fetched = await fetchRecipes();
      filterByIngredients(selectedIngredients, fetched);
    } catch (error) {
      console.error("Errore nel caricamento delle ricette:", error);
    }
    setCurrentIndex(0);
  }

  const RecipeDetailRoute = () => {
    const { id } = useParams();
    if (!id) {
      return <Navigate to="/" replace />;
    }

    const numericId = Number(id);
    const matchById = recipes.find((recipe) => Number(recipe.id) === numericId);

    const recipe = matchById ?? activeRecipe ?? recipes[currentIndex] ?? null;

    if (!recipe) {
      return <Navigate to="/" replace />;
    }

    const detailId = Number.isFinite(recipe.id) ? recipe.id : numericId;

    return (
      <RecipeDetail
        goToBack={handleClickBack}
        id={Number.isNaN(detailId) ? numericId : detailId}
        recipeData={recipe}
      />
    );
  };

  const discoverElement = (
    <DiscoverPage
      recipes={recipes}
      onRecipeDetailClick={handleRecipeDetailsClick}
      currentIndex={currentIndex}
      setCurrentIndex={setCurrentIndex}
      isLoading={isSearching}
      onReload={handleReloadRecipes}
      searchTerm={selectedIngredients.join(", ")}
      query={ingredientQuery}
      onQueryChange={setIngredientQuery}
      onSearchClick={handleSearchClick}
      suggestions={ingredientSuggestions}
      selectedIngredients={selectedIngredients}
      onRemoveIngredient={handleRemoveIngredient}
      onGoHome={() => navigate("/")}
    />
  );

  const element = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <SearchPage
              query={ingredientQuery}
              onQueryChange={setIngredientQuery}
              onSearchClick={handleSearchClick}
              isDiscover={isSearching}
              suggestions={ingredientSuggestions}
              selectedIngredients={selectedIngredients}
              onRemoveIngredient={handleRemoveIngredient}
            />
          ),
        },
        {
          path: "discover",
          element: discoverElement,
        },
        {
          path: "recipe-details/:id",
          element: <RecipeDetailRoute />,
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ]);

  return element;
};

export default App;