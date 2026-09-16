import Image from "next/image";
import Link from "next/link";

export const categories = [
  {
    image: "/organic_vegitable_image.png",
    path: "rau-cu",
    text: "Rau củ hữu cơ",
  },
  {
    image: "/fresh_fruits_image.png",
    path: "trai-cay",
    text: "Trái cây tươi",
  },
  {
    image: "/bottles_image.png",
    path: "do-uong",
    text: "Đồ uống lạnh",
  },
  {
    image: "/maggi_image.png",
    path: "do-an-nhanh",
    text: "Đồ ăn nhanh",
  },
  {
    image: "/dairy_product_image.png",
    path: "sua",
    text: "Sản phẩm từ sữa",
  },
  {
    image: "/bakery_image.png",
    path: "banh-my",
    text: "Bánh mì & bánh ngọt",
  },
  {
    image: "/grain_image.png",
    path: "ngu-coc",
    text: "Ngũ cốc & Bột mì",
  },
];

export default function CategorySidebar() {
  return (
    <div className="overflow-hidden rounded-md border border-gray-200 dark:border-gray-600">
      <div className="border-gray-200 border-b bg-slate-100 px-4 py-3 dark:border-gray-600 dark:bg-slate-700">
        <h3 className="font-bold text-slate-800 dark:text-slate-100">
          Mua sắm theo danh mục
        </h3>
      </div>

      <div className="h-[300px] overflow-y-auto bg-white dark:bg-slate-800">
        {categories.map((category) => (
          <Link
            className="flex items-center gap-3 px-4 py-2 text-slate-700 text-sm transition-all duration-300 hover:bg-slate-50 dark:text-slate-300 dark:hover:bg-slate-700"
            href={`/category/${category.path}`}
            key={category.path}
          >
            <Image
              alt={category.text}
              className="h-10 w-10 rounded-full object-cover"
              height={40}
              src={category.image}
              width={40}
            />
            <span>{category.text}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
