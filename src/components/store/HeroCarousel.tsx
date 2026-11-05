"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BannerSlide, defaultBannerSlides } from "@/lib/banners";
import { ChevronLeftIcon, ChevronRightIcon } from "./icons";

export function HeroCarousel() {
  const [slides, setSlides] = useState<BannerSlide[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadBanners = async () => {
      try {
        const response = await fetch("/api/banners");
        if (response.ok) {
          const data = (await response.json()) as BannerSlide[];
          setSlides(data);
        } else {
          setSlides(
            defaultBannerSlides.map((slide, index) => ({
              ...slide,
              id: index + 1,
            })),
          );
        }
      } catch {
        setSlides(
          defaultBannerSlides.map((slide, index) => ({
            ...slide,
            id: index + 1,
          })),
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadBanners();
  }, []);

  useEffect(() => {
    if (slides.length === 0) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const goTo = (index: number) => {
    if (slides.length === 0) {
      return;
    }
    setActiveIndex((index + slides.length) % slides.length);
  };

  if (isLoading) {
    return (
      <section className="relative aspect-[16/7] w-full animate-pulse bg-brand-light sm:aspect-[16/6] lg:aspect-[16/5]" />
    );
  }

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="relative overflow-hidden bg-brand-light">
      <div className="relative aspect-[16/7] w-full sm:aspect-[16/6] lg:aspect-[16/5]">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === activeIndex ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-center">
              <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-12">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/90">
                  TIOR Official Store
                </p>
                <h2 className="mt-2 max-w-lg font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-wide text-white sm:text-5xl lg:text-6xl">
                  {slide.title}
                </h2>
                {slide.subtitle && (
                  <p className="mt-3 max-w-md text-sm text-white/90 sm:text-base">
                    {slide.subtitle}
                  </p>
                )}
                <Link
                  href={slide.href}
                  className="mt-6 inline-block bg-white px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-black transition hover:bg-brand-red hover:text-white"
                >
                  {slide.cta}
                </Link>
              </div>
            </div>
          </div>
        ))}

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/90 text-brand-black transition hover:bg-white sm:left-4"
              aria-label="Previous slide"
            >
              <ChevronLeftIcon />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center bg-white/90 text-brand-black transition hover:bg-white sm:right-4"
              aria-label="Next slide"
            >
              <ChevronRightIcon />
            </button>
          </>
        )}
      </div>

      {slides.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 transition-all ${
                index === activeIndex ? "w-8 bg-brand-red" : "w-4 bg-white/70"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
