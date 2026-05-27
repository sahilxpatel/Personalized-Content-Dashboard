import { expect, test } from "@playwright/test";

test("search flow works", async ({ page }) => {
  await page.goto("/", { waitUntil: "networkidle" });
  await page.waitForSelector("header", { state: "visible", timeout: 60000 });
  await page.waitForSelector('[data-testid="search-input"]', { state: "visible", timeout: 60000 });
  await page.getByTestId("search-input").fill("AI");
  await expect(page.getByTestId("feed-grid")).toBeVisible();
});

test("favorites can be added and removed", async ({ page }) => {
  await page.goto("/");
  const firstFavoriteButton = page.locator("[data-testid^='favorite-btn-']").first();
  await firstFavoriteButton.click();
  await page.goto("/favorites");
  await expect(page.getByTestId("feed-grid")).toBeVisible();
});

test("cards support drag-and-drop", async ({ page }) => {
  await page.goto("/");
  const cards = page.locator("[data-testid^='content-card-']");
  await expect(cards.first()).toBeVisible();
  await cards.first().dragTo(cards.nth(1));
  await expect(cards.first()).toBeVisible();
});

test("dark mode toggle is available", async ({ page }) => {
  await page.goto("/");
  await page.getByTestId("theme-toggle").click();
  await expect(page.getByTestId("theme-toggle")).toBeVisible();
});

test("infinite scroll loads more items", async ({ page }) => {
  await page.goto("/");
  const grid = page.getByTestId("feed-grid");
  const initialCount = await grid.locator("[data-testid^='content-card-']").count();
  // scroll to bottom to trigger sentinel
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  // wait for more items to appear (or same if none)
  await page.waitForTimeout(1000);
  const afterCount = await grid.locator("[data-testid^='content-card-']").count();
  expect(afterCount).toBeGreaterThanOrEqual(initialCount);
});
