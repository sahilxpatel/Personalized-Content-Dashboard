import { fireEvent, screen } from "@testing-library/react";

import { SearchBar } from "@/components/search/SearchBar";

import { renderWithProviders } from "../test-utils";

describe("SearchBar", () => {
  it("renders suggestions from existing feed items", async () => {
    renderWithProviders(<SearchBar />, {
      content: {
        entities: {
          "item-1": {
            id: "item-1",
            kind: "news",
            title: "AI market outlook",
            description: "desc",
            imageUrl: "https://example.com/a.jpg",
            category: "finance",
            source: "Source",
            url: "#",
            publishedAt: new Date().toISOString(),
            ctaLabel: "Read",
            trendingScore: 90,
          },
        },
        orderedIds: ["item-1"],
        searchTerm: "",
        visibleCount: 12,
      },
      favorites: { ids: [] },
      preferences: { categories: ["technology"], language: "en" },
      theme: { mode: "light" },
    });

    fireEvent.change(screen.getByTestId("search-input"), { target: { value: "AI" } });

    expect(await screen.findByText("AI market outlook")).toBeInTheDocument();
  });
});
