import type { KeyboardEvent } from "react";
import '../../style/SearchBar.css';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  placeholder?: string;
  suggestions?: string[];
  onSuggestionSelect?: (value: string) => void;
};

export default function SearchBar({
  value,
  onChange,
  onSubmit,
  placeholder,
  suggestions,
  onSuggestionSelect,
}: SearchBarProps) {
  const normalized = value.trim().toLowerCase();
  const matches = normalized && Array.isArray(suggestions)
    ? suggestions.filter((item) => item.toLowerCase().includes(normalized)).slice(0, 8)
    : [];
  const showResults = normalized.length > 0 && Array.isArray(suggestions);
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (typeof onSubmit === "function") onSubmit();
    }
  };

  return (
    <div className="search-bar mobile-search-bar">
      <div className="search-input-wrapper">
        <input
          className="search-input"
          type="search"
          value={value}
          placeholder={placeholder ?? "Cerca ingrediente..."}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-label="Cerca ingrediente"
          autoComplete="off"
        />
      </div>
      {showResults && (
        <ul className="results-list" role="listbox">
          {matches.length === 0 ? (
            <li className="result-item muted">Nessun ingrediente trovato</li>
          ) : (
            matches.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  className="result-item"
                  onClick={() => {
                    onChange(item);
                    if (typeof onSuggestionSelect === "function") {
                      onSuggestionSelect(item);
                    }
                  }}
                >
                  <span className="result-label">{item}</span>
                </button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
