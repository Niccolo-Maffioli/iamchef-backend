import ScrollBtnSection from "../components/cards/ScrollBtnSection";
import RecipeCard from "../components/cards/RecipeCard";
import SearchBar from "../components/search/SearchBar";
import type { RecipeType } from "../Types/recipes";
import '../style/DiscoverPage.css';

type DiscoverPageProps = {
    recipes: RecipeType[],
    currentIndex: number,
    setCurrentIndex: (index: number) => void,
    onRecipeDetailClick: (recipe: RecipeType) => void,
    isLoading?: boolean,
    onReload?: () => void,
    searchTerm?: string,
    query: string,
    onQueryChange: (value: string) => void,
    onSearchClick: (queryOverride?: string) => void,
    suggestions?: string[],
    selectedIngredients: string[],
    onRemoveIngredient: (ingredient: string) => void,
    onGoHome?: () => void
}

const DiscoverPage = ({
    recipes,
    currentIndex,
    setCurrentIndex,
    onRecipeDetailClick,
    isLoading,
    onReload,
    searchTerm,
    query,
    onQueryChange,
    onSearchClick,
    suggestions,
    selectedIngredients,
    onRemoveIngredient,
    onGoHome,
}: DiscoverPageProps) => {
    const normalizedTerm = searchTerm?.trim();

    const searchSection = (
        <div className="discover-top">
            <div className="discover-top-row">
                {typeof onGoHome === "function" && (
                    <button className="btn tiny" onClick={onGoHome}>
                        Home
                    </button>
                )}
            </div>
            <SearchBar
                value={query}
                onChange={onQueryChange}
                onSubmit={() => onSearchClick()}
                suggestions={suggestions}
                onSuggestionSelect={(value) => onSearchClick(value)}
            />
            <div className="discover-tags">
                <h4>Ingredienti selezionati</h4>
                {selectedIngredients.length === 0 ? (
                    <p className="muted">Nessun ingrediente selezionato</p>
                ) : (
                    <ul className="tag-list">
                        {selectedIngredients.map((ingredient) => (
                            <li key={ingredient} className="tag-item">
                                <span>{ingredient}</span>
                                <button className="tag-remove" onClick={() => onRemoveIngredient(ingredient)}>
                                    x
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );

    if (isLoading && (!recipes || recipes.length === 0)) {
        return (
            <div className="discover-page">
                {searchSection}
                <div className="discover-empty">
                    <div className="empty-card">
                        <div className="empty-icon" aria-hidden="true">⏳</div>
                        <h2>Caricamento ricette...</h2>
                        <p>Attendi qualche secondo, stiamo recuperando i dati.</p>
                    </div>
                </div>
            </div>
        );
    }

    if (!recipes || recipes.length === 0) {
        return (
            <div className="discover-page">
                {searchSection}
                <div className="discover-empty">
                    <div className="empty-card">
                        <div className="empty-icon" aria-hidden="true">🍽️</div>
                        <h2>Nessuna ricetta trovata</h2>
                        <p>
                            {normalizedTerm
                                ? `Nessuna ricetta contiene gli ingredienti: ${normalizedTerm}.`
                                : "Al momento non ci sono ricette da mostrare."}
                        </p>
                        {typeof onReload === "function" && (
                            <button className="btn primary" onClick={onReload}>
                                Ricarica ricette
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    const safeIndex = Math.max(0, Math.min(currentIndex, recipes.length - 1));
    const currentRecipe = recipes[safeIndex];

    const handleNext = () => {
        if (safeIndex < recipes.length - 1) {
            setCurrentIndex(safeIndex + 1);
        }
    };

    const handlePrev = () => {
        if (safeIndex > 0) {
            setCurrentIndex(safeIndex - 1);
        }
    };

    return (
        <div className="discover-page">
            {searchSection}
            <div id="recipe-card-container" className="recipe-card-container-main">
                <div className="swipe-container">
                    <div className="swipe-inner">
                        <RecipeCard
                            recipe={currentRecipe}
                            onSelect={() => onRecipeDetailClick(currentRecipe)}
                        />
                    </div>
                </div>
                <div className="shrink-0">
                    <ScrollBtnSection
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                        index={safeIndex}
                        recipes={recipes}
                    />
                </div>
            </div>
        </div>
    )
}

export default DiscoverPage