import { FeedSection } from "@/components/dashboard/FeedSection";

export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <h2 className="text-2xl font-semibold">Favorites</h2>
      <FeedSection mode="favorites" />
    </div>
  );
}
