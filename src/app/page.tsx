"use client";

import { useEffect, useMemo, useState } from "react";
import { AnnouncementBar } from "@/components/store/AnnouncementBar";
import { CategoryShowcase } from "@/components/store/CategoryShowcase";
import { FlashSaleBanner } from "@/components/store/FlashSaleBanner";
import { HeroCarousel } from "@/components/store/HeroCarousel";
import { MainNav } from "@/components/store/MainNav";
import { ProductCard } from "@/components/store/ProductCard";
import { ProductQuickView } from "@/components/store/ProductQuickView";
import { SiteFooter } from "@/components/store/SiteFooter";
import { SiteHeader } from "@/components/store/SiteHeader";
import { Product } from "@/lib/productStore";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    setSelectedTag(null);
    setSearchQuery("");
  };

  useEffect(() => {
    const loadData = async () => {
      const [productsResponse, categoriesResponse] = await Promise.all([
        fetch("/api/products"),
        fetch("/api/categories"),
      ]);

      if (productsResponse.ok) {
        const productData = (await productsResponse.json()) as Product[];
        setProducts(productData);
      }

      if (categoriesResponse.ok) {
        const categoryData = (await categoriesResponse.json()) as Array<{
          name: string;
        }>;
        setCategories(categoryData.map((category) => category.name));
      }
    };

    void loadData();
  }, []);

  const visibleProducts = useMemo(() => {
    let filtered = products;

    if (selectedTag) {
      filtered = filtered.filter((p) => p.tag && p.tag.includes(selectedTag));
    } else if (selectedCategory !== "All") {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      filtered = filtered.filter((p) => p.name.toLowerCase().includes(q));
    }

    return filtered;
  }, [products, selectedCategory, selectedTag, searchQuery]);

  const sectionTitle = useMemo(() => {
    if (searchQuery.trim()) return `Results for "${searchQuery.trim()}"`;
    if (selectedTag === "bestseller") return "Best Sellers";
    if (selectedTag === "new_arrival") return "New Arrivals";
    if (selectedCategory !== "All") return selectedCategory;
    return "All Products";
  }, [selectedCategory, selectedTag, searchQuery]);

  return (
    <>
      <AnnouncementBar />
      <SiteHeader
        onMenuToggle={() => setMobileMenuOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (q.trim()) {
            document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
          }
        }}
      />
      <MainNav
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      <HeroCarousel />
      <FlashSaleBanner />
      <CategoryShowcase onSelectCategory={handleSelectCategory} />

      <section id="products" className="mx-auto max-w-[1400px] px-4 py-12 lg:px-8">
        <div className="mb-8 flex flex-col items-center justify-between gap-4 border-b border-brand-border pb-6 sm:flex-row">
          <h2 className="font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-[0.15em] text-brand-black">
            {sectionTitle}
          </h2>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => handleSelectCategory("All")}
              className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition ${
                selectedCategory === "All" && !selectedTag && !searchQuery
                  ? "bg-brand-black text-white"
                  : "border border-brand-border text-brand-black hover:border-brand-black"
              }`}
            >
              All
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleSelectCategory(category)}
                className={`px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] transition ${
                  selectedCategory === category && !selectedTag
                    ? "bg-brand-black text-white"
                    : "border border-brand-border text-brand-black hover:border-brand-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {visibleProducts.length === 0 ? (
          <p className="py-16 text-center text-brand-gray">
            No products found. Try a different category or search term.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {visibleProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onView={(item) => {
                  setSelectedProduct(item);
                  setActiveImage(item.images[0]);
                }}
              />
            ))}
          </div>
        )}
      </section>

      <SiteFooter />

      {selectedProduct && (
        <ProductQuickView
          product={selectedProduct}
          activeImage={activeImage}
          onClose={() => setSelectedProduct(null)}
          onImageSelect={setActiveImage}
        />
      )}
    </>
  );
}
