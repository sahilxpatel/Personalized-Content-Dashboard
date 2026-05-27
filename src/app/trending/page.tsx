import { FeedSection } from "@/components/dashboard/FeedSection";

export default function TrendingPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <h2 className="text-2xl font-semibold">Trending</h2>
      <FeedSection mode="trending" />
    </div>
  );
}
