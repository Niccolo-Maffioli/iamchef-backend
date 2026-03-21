import SearchBar from "../components/search/SearchBar";
import '../style/SearchPage.css';

type SearchPageProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSearchClick: (queryOverride?: string) => void;
  isDiscover: boolean;
  suggestions?: string[];
};

const SearchPage = ({
  query,
  onQueryChange,
  onSearchClick,
  isDiscover,
  suggestions,
}: SearchPageProps) => {
  return (
    <div className="search-page container">
      <div className="search-grid">
        <section className="left-panel">
          <div className="search-card">
            <SearchBar
              value={query}
              onChange={onQueryChange}
              onSubmit={() => onSearchClick()}
              suggestions={suggestions}
              onSuggestionSelect={(value) => onSearchClick(value)}
            />
          </div>
          {isDiscover && <p className="muted">Caricamento...</p>}
        </section>
      </div>
    </div>
  );
}

export default SearchPage;