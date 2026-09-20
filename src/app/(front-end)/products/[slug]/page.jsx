import { Send } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/front-end/Breadcrumb";
import CategoryCarousel from "@/components/front-end/CategoryCarousel";
import LocationSelect from "@/components/front-end/LocationSelect";
import ProductDetailInfo from "@/components/front-end/ProductDetailInfo";
import { getData } from "@/lib/getData";

async function getProduct(slug) {
  const product = await getData(`products/slug/${slug}`);
  if (!product || product.message) return null;
  return product;
}

async function getRelatedProducts(categoryId) {
  if (!categoryId) return [];
  try {
    const category = await getData(`categories/${categoryId}`);
    if (!category || category.message) return [];
    return category.products || [];
  } catch {
    return [];
  }
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.categoryId);
  const filteredRelated = relatedProducts.filter((p) => p.id !== product.id);

  return (
    <div>
      <Breadcrumb items={{ [slug]: product.title }} />

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          {product.imageUrl ? (
            <div className="relative aspect-square overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
              <Image
                alt={product.title}
                className="object-cover"
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                src={product.imageUrl}
              />
            </div>
          ) : (
            <div className="flex aspect-square items-center justify-center rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800">
              <span className="text-slate-400 dark:text-slate-500">
                Không có ảnh
              </span>
            </div>
          )}
        </div>

        <div className="lg:col-span-5">
          <ProductDetailInfo product={product} />
        </div>

        <div className="lg:col-span-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-800">
            <h2 className="mb-3 font-semibold text-lg text-slate-800 dark:text-slate-100">
              Giao hàng & Đổi trả
            </h2>

            <div className="mb-4 rounded-lg bg-lime-50 p-3 dark:bg-lime-950">
              <div className="mb-2 flex items-center gap-2">
                <span className="font-medium text-lime-700 text-sm dark:text-lime-300">
                  Giao hàng nhanh
                </span>
              </div>
              <span className="inline-flex items-center gap-2 rounded-lg bg-orange-400 px-4 py-2 text-sm text-white">
                <Send size={14} />
                Miễn phí vận chuyển
              </span>
            </div>

            <h3 className="mb-3 font-semibold text-slate-700 text-sm dark:text-slate-200">
              Chọn địa điểm giao hàng
            </h3>

            <LocationSelect />
          </div>
        </div>
      </div>

      {filteredRelated.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 font-semibold text-slate-400 text-xl">
            Sản phẩm tương tự
          </h2>
          <CategoryCarousel products={filteredRelated} />
        </div>
      )}
    </div>
  );
}
