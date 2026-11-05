"use client";

import Image from "next/image";
import { Product } from "@/lib/productStore";
import { CloseIcon } from "./icons";

type ProductQuickViewProps = {
  product: Product;
  activeImage: string | null;
  onClose: () => void;
  onImageSelect: (url: string) => void;
};

export function ProductQuickView({
  product,
  activeImage,
  onClose,
  onImageSelect,
}: ProductQuickViewProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4">
      <div className="relative max-h-[95vh] w-full max-w-5xl overflow-y-auto bg-white">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center bg-white shadow-md"
          aria-label="Close"
        >
          <CloseIcon />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="bg-brand-light p-4 sm:p-6">
            <div className="relative aspect-square w-full">
              <Image
                src={activeImage ?? product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="mt-4 grid grid-cols-4 gap-2">
              {product.images.map((imageUrl) => (
                <button
                  key={imageUrl}
                  type="button"
                  onClick={() => onImageSelect(imageUrl)}
                  className={`relative aspect-square overflow-hidden border-2 ${
                    (activeImage ?? product.image) === imageUrl
                      ? "border-brand-red"
                      : "border-transparent"
                  }`}
                >
                  <Image
                    src={imageUrl}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4 p-6 sm:p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red">
              {product.category}
            </p>
            <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-wide text-brand-black sm:text-3xl">
              {product.name}
            </h2>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-bold">
                {(() => {
                  const n = Number.parseFloat(product.price.replace(/[^0-9.]/g, ""));
                  return Number.isNaN(n) ? product.price : `₹${n.toFixed(2)}`;
                })()}
              </p>
              <p className="text-sm text-amber-700">
                {"★".repeat(Math.round(product.rating))}{" "}
                <span className="text-brand-gray">({product.rating})</span>
              </p>
            </div>
            <p className="text-sm leading-relaxed text-brand-gray">
              {product.description}
            </p>
            <a
              href={product.amazonUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto block bg-brand-red py-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-white transition hover:bg-brand-navy"
            >
              Buy Now
            </a>
            <p className="text-center text-[10px] uppercase tracking-wider text-brand-gray">
              Secure Checkout
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
