"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type CategoryItem = {
  id: number;
  name: string;
  image: string | null;
};

type CategoryShowcaseProps = {
  onSelectCategory?: (category: string) => void;
};

export function CategoryShowcase({ onSelectCategory }: CategoryShowcaseProps) {
  const [categories, setCategories] = useState<CategoryItem[]>([]);

  useEffect(() => {
    void fetch("/api/categories")
      .then((res) => res.json())
      .then((data: CategoryItem[]) => setCategories(data));
  }, []);

  const withImages = categories.filter((cat) => cat.image);

  if (withImages.length === 0) return null;

  const handleCategoryClick = (event: React.MouseEvent<HTMLAnchorElement>, categoryName: string) => {
    event.preventDefault();
    if (onSelectCategory) {
      onSelectCategory(categoryName);
    }
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
      <h2 className="mb-8 text-center font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-[0.15em] text-brand-black">
        Explore The Categories
      </h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {withImages.map((item) => (
          <a
            key={item.id}
            href="#products"
            onClick={(e) => handleCategoryClick(e, item.name)}
            className="group relative block aspect-[4/5] overflow-hidden"
          >
            <Image
              src={item.image!}
              alt={item.name}
              fill
              sizes="(max-width: 640px) 50vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <span className="absolute bottom-4 left-4 font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-wider text-white">
              {item.name}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
