"use client";

import Image from "next/image";
import Link from "next/link";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 640 },
    items: 2,
    slidesToSlide: 1,
  },
};

export default function TrainingCarousel({ trainings = [] }) {
  return (
    <Carousel
      arrows
      autoPlay
      autoPlaySpeed={4000}
      responsive={responsive}
      swipeable
    >
      {trainings.map((training, index) => (
        <div className="px-2" key={training.id ?? index}>
          <div className="overflow-hidden rounded-lg bg-slate-800 dark:bg-slate-900">
            <Link
              className="block overflow-hidden rounded-lg"
              href={`/community/${training.slug}`}
            >
              <Image
                alt={training.title}
                className="h-32 w-full rounded-t-lg object-cover transition-transform hover:scale-105 sm:h-48"
                height={192}
                src={training.imageUrl}
                width={400}
              />
            </Link>
            <div className="p-2 sm:p-4">
              <h3 className="mb-1 font-bold text-base text-slate-100 sm:mb-2 sm:text-xl">
                {training.title}
              </h3>
              <p className="mb-2 line-clamp-2 text-slate-300 text-xs sm:mb-4 sm:line-clamp-3 sm:text-sm">
                {training.description}
              </p>
              <div className="flex items-center justify-between">
                <Link
                  className="font-medium text-blue-400 text-xs hover:text-blue-300 sm:text-sm"
                  href={`/community/${training.slug}`}
                >
                  Đọc thêm
                </Link>
                <Link
                  className="rounded-md bg-slate-300 px-2 py-1 font-medium text-slate-900 text-xs transition-all hover:bg-slate-200 sm:px-4 sm:py-2 sm:text-sm"
                  href="/consultant"
                >
                  Chat với tư vấn viên
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
}
