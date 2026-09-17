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

const trainings = [
  {
    description:
      "Học cách trồng rau hữu cơ tại nhà với hướng dẫn chi tiết từ các chuyên gia nông nghiệp. Bắt đầu ngay hôm nay!",
    href: "/community/training-1",
    image: "/banners/1.png",
    title: "Cách Trồng Rau Hữu Cơ Tại Nhà",
  },
  {
    description:
      "Khám phá bí quyết bảo quản thực phẩm tươi ngon lâu hơn, tiết kiệm thời gian và chi phí cho gia đình bạn.",
    href: "/community/training-2",
    image: "/banners/2.png",
    title: "Bí Quyết Bảo Quản Thực Phẩm",
  },
  {
    description:
      "Chế biến các món ăn ngon từ nguyên liệu tươi sạch, giàu dinh dưỡng cho bữa cơm gia đình ấm áp.",
    href: "/community/training-3",
    image: "/banners/3.png",
    title: "Nấu Ăn Với Nguyên Liệu Tươi Sạch",
  },
  {
    description:
      "Phát triển kinh doanh trên nền tảng LiLi, tiếp cận hàng triệu khách hàng tiềm năng mỗi ngày.",
    href: "/community/training-4",
    image: "/banners/4.png",
    title: "Bán Hàng Hiệu Quả Trên LiLi",
  },
];

export default function TrainingCarousel() {
  return (
    <Carousel
      arrows
      autoPlay
      autoPlaySpeed={4000}
      responsive={responsive}
      swipeable
    >
      {trainings.map((training) => (
        <div className="px-2" key={training.href}>
          <div className="overflow-hidden rounded-lg bg-slate-800 dark:bg-slate-900">
            <Link
              className="block overflow-hidden rounded-lg"
              href={training.href}
            >
              <Image
                alt={training.title}
                className="h-48 w-full rounded-t-lg object-cover transition-transform hover:scale-105"
                height={192}
                src={training.image}
                width={400}
              />
            </Link>
            <div className="p-4">
              <h3 className="mb-2 font-bold text-slate-100 text-xl">
                {training.title}
              </h3>
              <p className="mb-4 line-clamp-3 text-slate-300 text-sm">
                {training.description}
              </p>
              <div className="flex items-center justify-between">
                <Link
                  className="font-medium text-blue-400 text-sm hover:text-blue-300"
                  href={training.href}
                >
                  Đọc thêm
                </Link>
                <Link
                  className="rounded-md bg-slate-300 px-4 py-2 font-medium text-slate-900 text-sm transition-all hover:bg-slate-200"
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
