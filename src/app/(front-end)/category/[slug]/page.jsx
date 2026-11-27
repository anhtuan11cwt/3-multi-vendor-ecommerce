import { notFound } from "next/navigation";
import Filter from "@/components/front-end/filters/filter";
import { getData } from "@/lib/getData";

export default async function CategoryPage({ params }) {
  const { slug } = await params;

  const categories = await getData("categories");
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <div>
      <h1 className="sr-only">{category.title}</h1>
      <Filter label={category.title} products={category.products || []} />
    </div>
  );
}
