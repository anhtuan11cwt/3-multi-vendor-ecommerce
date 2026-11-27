import Filter from "@/components/front-end/filters/filter";
import { getData } from "@/lib/getData";

export default async function SearchPage({ searchParams }) {
  const { q = "" } = await searchParams;

  const query = q.trim();
  const label = query ? `Kết quả cho "${query}"` : "Tìm kiếm sản phẩm";

  const allProducts = await getData("products");
  const products = query
    ? allProducts.filter((product) => {
        const normalized = query.toLowerCase();
        return (
          product.title?.toLowerCase().includes(normalized) ||
          product.description?.toLowerCase().includes(normalized) ||
          product.tags?.some((tag) => tag.toLowerCase().includes(normalized))
        );
      })
    : allProducts;

  return (
    <div>
      <h1 className="sr-only">{label}</h1>
      <Filter label={label} products={products} searchQuery={query} />
    </div>
  );
}
