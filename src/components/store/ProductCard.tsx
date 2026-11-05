"use client";

import Image from "next/image";
import { Product } from "@/lib/productStore";

type ProductCardProps = {
  product: Product;
  onView: (product: Product) => void;
};

function formatRupee(price: string) {
  const numeric = Number.parseFloat(price.replace(/[^0-9.]/g, ""));
  if (Number.isNaN(numeric)) return price;
  return `₹${numeric.toFixed(2)}`;
}

function formatStrikethrough(price: string, discountPercent: number) {
  const numeric = Number.parseFloat(price.replace(/[^0-9.]/g, ""));
  if (Number.isNaN(numeric)) return price;
  const original = numeric / (1 - discountPercent / 100);
  return `₹${original.toFixed(2)}`;
}

export function ProductCard({ product, onView }: ProductCardProps) {
  const discount = 20 + (product.id % 25);
  const tag = product.tag;

  return (
    <article className="group relative flex flex-col bg-white">
      <button
        type="button"
        onClick={() => onView(product)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-brand-light"
      >
        {/* Tag badge — replaces or stacks with discount badge */}
        <div className="absolute left-2 top-2 z-10 flex flex-col items-start gap-1">
          {tag?.includes("new_arrival") && (
            <span className="bg-brand-navy px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              New
            </span>
          )}
          {tag?.includes("bestseller") && (
            <span className="bg-amber-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              Best Seller
            </span>
          )}
          {(!tag || tag.trim() === "") && (
            <span className="bg-brand-red px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              {discount}% Off
            </span>
          )}
        </div>
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span className="absolute bottom-0 left-0 right-0 translate-y-full bg-brand-black/80 py-2 text-center text-[10px] font-bold uppercase tracking-[0.15em] text-white transition group-hover:translate-y-0">
          Quick View
        </span>
      </button>

      <div className="flex flex-1 flex-col gap-1 px-1 py-3 sm:px-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-brand-gray">
          {product.category}
        </p>
        <h3 className="line-clamp-2 text-sm font-medium leading-snug text-brand-black">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <p className="text-sm font-bold text-brand-black">{formatRupee(product.price)}</p>
          <p className="text-xs text-brand-gray line-through">
            {formatStrikethrough(product.price, discount)}
          </p>
        </div>
        <p className="text-[11px] text-amber-700">
          {"★".repeat(Math.round(product.rating))}
          <span className="ml-1 text-brand-gray">({product.rating})</span>
        </p>
        <button
          type="button"
          onClick={() => onView(product)}
          className="mt-2 w-full border border-brand-black py-2.5 text-[10px] font-bold uppercase tracking-[0.15em] transition hover:bg-brand-black hover:text-white"
        >
          View Details
        </button>
      </div>
    </article>
  );
}
