"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";

const banners = [
  { alt: "Banner rau củ tươi", href: "/", src: "/banners/1.png" },
  { alt: "Banner giao hàng nhanh", href: "/", src: "/banners/3.png" },
];

const AUTOPLAY_INTERVAL = 3000;

export default function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback(
    (index) => emblaApi?.scrollTo(index),
    [emblaApi],
  );

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    onSelect();
    return () => emblaApi.off("select", onSelect);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const timer = setInterval(() => emblaApi.scrollNext(), AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [emblaApi]);

  return (
    <div className="relative overflow-hidden rounded-md">
      <div className="overflow-hidden rounded-md" ref={emblaRef}>
        <div className="flex">
          {banners.map((banner, index) => (
            <div className="min-w-0 flex-[0_0_100%]" key={banner.src}>
              <Link href={banner.href}>
                <Image
                  alt={banner.alt}
                  className="h-auto w-full object-cover"
                  height={384}
                  priority={index === 0}
                  src={banner.src}
                  width={712}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button
        aria-label="Slide trước"
        className="absolute top-1/2 left-2 z-10 hidden -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white transition hover:bg-black/60 md:block"
        onClick={scrollPrev}
        type="button"
      >
        <ChevronLeft size={20} />
      </button>

      <button
        aria-label="Slide tiếp theo"
        className="absolute top-1/2 right-2 z-10 hidden -translate-y-1/2 rounded-full bg-black/40 p-1.5 text-white transition hover:bg-black/60 md:block"
        onClick={scrollNext}
        type="button"
      >
        <ChevronRight size={20} />
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {banners.map((banner, index) => (
          <button
            aria-label={`Đến slide ${index + 1}`}
            className={`h-2 rounded-full transition-all ${
              index === selectedIndex ? "w-4 bg-white" : "w-2 bg-white/50"
            }`}
            key={banner.src}
            onClick={() => scrollTo(index)}
            type="button"
          />
        ))}
      </div>
    </div>
  );
}
