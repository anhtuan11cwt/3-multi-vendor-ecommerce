import { notFound } from "next/navigation";
import Filter from "@/components/front-end/filters/filter";
import { getData } from "@/lib/getData";

export default async function CategoryPage({ params, searchParams }) {
  const { slug } = await params;
  const { sort, min, max } = await searchParams;

  const category = await getData(`categories/filter/${slug}`);

  if (!category?.id) {
    notFound();
  }

  // Ghép tham số một cách tích lũy để không tham số nào bị ghi đè
  const query = new URLSearchParams();
  if (sort) query.set("sort", sort);
  if (min) query.set("min", min);
  if (max) query.set("max", max);
  const queryString = query.toString();

  const products = await getData(
    `products?catId=${category.id}${queryString ? `&${queryString}` : ""}`,
  );

  return (
    <div>
      <h1 className="sr-only">{category.title}</h1>
      <Filter
        category={category}
        label={category.title}
        products={Array.isArray(products) ? products : []}
      />
    </div>
  );
}
