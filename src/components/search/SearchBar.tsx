"use client";

import { ChangeEvent, useEffect, useState } from "react";

import { setSearchTerm } from "@/features/content/contentSlice";
import { useDebounce } from "@/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Input } from "@/components/ui/Input";

import { SearchSuggestions } from "./SearchSuggestions";

const EMPTY_SUGGESTIONS: string[] = [];

export const SearchBar = () => {
  const dispatch = useAppDispatch();
  const storeQuery = useAppSelector((state) => state.content.searchTerm);
  const suggestions = useAppSelector((state) => {
    const query = state.content.searchTerm.toLowerCase().trim();
    if (!query) {
      return EMPTY_SUGGESTIONS;
    }

    return state.content.orderedIds
      .map((id) => state.content.entities[id])
      .filter(Boolean)
      .filter((item) => item.title.toLowerCase().includes(query))
      .slice(0, 5)
      .map((item) => item.title);
  });

  const [value, setValue] = useState(storeQuery);
  const debounced = useDebounce(value, 350);

  useEffect(() => {
    dispatch(setSearchTerm(debounced));
  }, [debounced, dispatch]);

  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const onSelectSuggestion = (selected: string) => {
    setValue(selected);
    dispatch(setSearchTerm(selected));
  };

  return (
    <div className="relative w-full max-w-lg">
      <Input
        aria-label="Search content"
        autoComplete="off"
        aria-autocomplete="list"
        data-testid="search-input"
        onChange={onChange}
        placeholder="Search news, movies, social content"
        value={value}
      />
      <SearchSuggestions onSelect={onSelectSuggestion} suggestions={suggestions} />
    </div>
  );
};
