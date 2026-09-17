"use client";

import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 3,
    slidesToSlide: 1,
  },
};

const categorySlides = [
  {
    image: "/organic_vegitable_image.png",
    path: "Vegetables",
    text: "Rau củ hữu cơ",
  },
  { image: "/fresh_fruits_image.png", path: "Fruits", text: "Trái cây tươi" },
  { image: "/bottles_image.png", path: "Drinks", text: "Đồ uống lạnh" },
  { image: "/maggi_image.png", path: "Instant", text: "Đồ ăn nhanh" },
  { image: "/dairy_product_image.png", path: "Dairy", text: "Sản phẩm từ sữa" },
  { image: "/bakery_image.png", path: "Bakery", text: "Bánh mì & Bánh ngọt" },
  { image: "/grain_image.png", path: "Grains", text: "Ngũ cốc & Bột mì" },
];

export default function CategoryCarousel() {
  return (
    <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
      <h2 className="mb-4 text-center font-bold text-2xl text-slate-900 dark:text-slate-200">
        Mua sắm theo danh mục
      </h2>
      <Carousel
        arrows
        autoPlay
        autoPlaySpeed={3000}
        responsive={responsive}
        swipeable
      >
        {categorySlides.map((category) => (
          <div className="px-2" key={category.path}>
            <Link
              className="block rounded-lg bg-white p-4 text-center transition-all hover:shadow-md dark:bg-slate-700"
              href={`/category/${category.path}`}
            >
              <Image
                alt={category.text}
                className="mx-auto h-auto w-full rounded-md object-cover"
                height={200}
                src={category.image}
                width={200}
              />
              <h3 className="mt-2 font-semibold text-slate-800 text-sm dark:text-slate-200">
                {category.text}
              </h3>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
