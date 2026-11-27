import Image from "next/image";
import { notFound } from "next/navigation";
import Filter from "@/components/front-end/filters/filter";
import { getData } from "@/lib/getData";

export default async function MarketPage({ params }) {
  const { slug } = await params;

  const markets = await getData("markets");
  const market = markets.find((item) => item.slug === slug);

  if (!market) {
    notFound();
  }

  const categories = await getData("categories");
  const marketCategoryIds = new Set(market.categoryIds || []);
  const products = categories
    .filter((category) => marketCategoryIds.has(category.id))
    .flatMap((category) => category.products || []);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 rounded-lg bg-white p-4 shadow-sm sm:flex-row sm:items-center dark:bg-slate-900">
        {market.imageUrl && (
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-24">
            <Image
              alt={market.title}
              className="object-cover"
              fill
              sizes="96px"
              src={market.imageUrl}
            />
          </div>
        )}
        <div>
          <h1 className="font-bold text-slate-900 text-xl dark:text-slate-100">
            {market.title}
          </h1>
          {market.description && (
            <p className="mt-1 text-slate-600 text-sm dark:text-slate-400">
              {market.description}
            </p>
          )}
        </div>
      </div>

      <Filter label={market.title} products={products} />
    </div>
  );
}
