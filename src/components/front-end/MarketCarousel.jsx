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

export default function MarketCarousel({ markets = [] }) {
  return (
    <div className="rounded-lg bg-slate-50 p-4 dark:bg-slate-900">
      <h2 className="mb-4 text-center font-bold text-2xl text-lime-600 dark:text-lime-500">
        Mua sắm theo chợ
      </h2>
      <Carousel
        arrows
        autoPlay
        autoPlaySpeed={3000}
        responsive={responsive}
        swipeable
      >
        {markets.map((market, index) => (
          <div className="px-2" key={market.id ?? index}>
            <Link
              className="block rounded-lg bg-white p-4 text-center transition-all hover:shadow-md dark:bg-slate-700"
              href={`/market/${market.slug}`}
            >
              {market.imageUrl ? (
                <Image
                  alt={market.title}
                  className="mx-auto h-auto w-full rounded-2xl object-cover"
                  height={200}
                  src={market.imageUrl}
                  width={200}
                />
              ) : (
                <div className="mx-auto h-[200px] w-full rounded-2xl bg-slate-200 dark:bg-slate-600" />
              )}
              <h3 className="mt-2 font-semibold text-slate-800 text-sm dark:text-slate-200">
                {market.title}
              </h3>
            </Link>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
