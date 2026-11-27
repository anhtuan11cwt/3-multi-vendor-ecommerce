import ProductCard from "@/components/front-end/ProductCard";
import { getData } from "@/lib/getData";
import Paginate from "./paginate";

export default async function FilteredProducts({ products, searchQuery }) {
  const list = Array.isArray(products) ? products : await getData("products");

  return (
    <div className="py-8">
      {list.length === 0 ? (
        <p className="py-12 text-center text-slate-500 text-sm dark:text-slate-400">
          {searchQuery
            ? `Không tìm thấy sản phẩm nào cho "${searchQuery}".`
            : "Chưa có sản phẩm nào."}
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {list.map((product, index) => (
            <ProductCard key={product.id || index} product={product} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-center py-8">
        <Paginate pageSize={6} totalItems={list.length} />
      </div>
    </div>
  );
}
