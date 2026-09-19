"use client";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";

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

export default function CategoryCarousel({ products = [] }) {
  if (products.length === 0) {
    return null;
  }

  return (
    <Carousel
      arrows
      autoPlay
      autoPlaySpeed={3000}
      responsive={responsive}
      swipeable
    >
      {products.map((product, index) => (
        <div className="px-2" key={product.id ?? index}>
          <ProductCard product={product} />
        </div>
      ))}
    </Carousel>
  );
}
