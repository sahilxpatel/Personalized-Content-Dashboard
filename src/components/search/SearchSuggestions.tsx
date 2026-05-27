"use client";

interface SearchSuggestionsProps {
  suggestions: string[];
  onSelect: (value: string) => void;
}

export const SearchSuggestions = ({ suggestions, onSelect }: SearchSuggestionsProps) => {
  if (suggestions.length === 0) {
    return null;
  }

  return (
    <ul className="absolute z-30 mt-2 w-full rounded-lg border border-border bg-surface p-2 shadow-xl">
      {suggestions.map((suggestion) => (
        <li key={suggestion}>
          <button
            className="w-full rounded-md px-3 py-2 text-left text-sm text-foreground hover:bg-muted"
            type="button"
            onClick={() => onSelect(suggestion)}
          >
            {suggestion}
          </button>
        </li>
      ))}
    </ul>
  );
};
