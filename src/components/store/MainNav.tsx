"use client";

import Link from "next/link";

type MainNavProps = {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedTag: string | null;
  onSelectTag: (tag: string | null) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

const staticLinks = [
  { label: "HOME", href: "/" },
];

export function MainNav({
  categories,
  selectedCategory,
  onSelectCategory,
  selectedTag,
  onSelectTag,
  mobileOpen,
  onCloseMobile,
}: MainNavProps) {
  const handleCategoryClick = (category: string) => {
    onSelectCategory(category);
    onSelectTag(null);
    onCloseMobile();
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleTagClick = (tag: string) => {
    onSelectTag(selectedTag === tag ? null : tag);
    onSelectCategory("All");
    onCloseMobile();
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
  <>
    <nav className="hidden border-b border-brand-border bg-brand-black lg:block">
      <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-0 px-4 lg:px-8">
        {staticLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="px-4 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white transition hover:bg-brand-red"
          >
            {link.label}
          </Link>
        ))}

        {/* Tag filters */}
        <button
          type="button"
          onClick={() => handleTagClick("new_arrival")}
          className={`px-4 py-3.5 text-[11px] font-semibold tracking-[0.15em] transition ${
            selectedTag === "new_arrival"
              ? "bg-brand-red text-white"
              : "text-white hover:bg-brand-red"
          }`}
        >
          NEW ARRIVALS
        </button>
        <button
          type="button"
          onClick={() => handleTagClick("bestseller")}
          className={`px-4 py-3.5 text-[11px] font-semibold tracking-[0.15em] transition ${
            selectedTag === "bestseller"
              ? "bg-brand-red text-white"
              : "text-white hover:bg-brand-red"
          }`}
        >
          BEST SELLERS
        </button>
        <Link
          href="#products"
          className="px-4 py-3.5 text-[11px] font-semibold tracking-[0.15em] text-white transition hover:bg-brand-red"
        >
          SALE
        </Link>

        {/* Category pills */}
        {categories.map((category) => {
          const isActive = selectedCategory === category && !selectedTag;
          return (
            <button
              key={category}
              type="button"
              onClick={() => handleCategoryClick(category)}
              className={`px-4 py-3.5 text-[11px] font-semibold tracking-[0.15em] transition ${
                isActive
                  ? "bg-brand-red text-white"
                  : "text-white hover:bg-brand-red"
              }`}
            >
              {category.toUpperCase()}
            </button>
          );
        })}
      </div>
    </nav>

    {mobileOpen && (
      <div className="fixed inset-0 z-50 lg:hidden">
        <button
          type="button"
          className="absolute inset-0 bg-black/50"
          onClick={onCloseMobile}
          aria-label="Close menu"
        />
        <div className="absolute left-0 top-0 h-full w-[min(320px,85vw)] overflow-y-auto bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-brand-border bg-brand-black px-4 py-4 text-white">
            <span className="font-[family-name:var(--font-oswald)] text-lg font-bold tracking-[0.2em]">
              MENU
            </span>
            <button type="button" onClick={onCloseMobile} className="text-sm font-semibold uppercase">
              Close
            </button>
          </div>
          <div className="p-4">
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-brand-gray">
              Shop
            </p>
            <button
              type="button"
              onClick={() => handleCategoryClick("All")}
              className="block w-full border-b border-brand-border py-3 text-left text-sm font-semibold uppercase"
            >
              Shop All
            </button>
            <button
              type="button"
              onClick={() => handleTagClick("new_arrival")}
              className="block w-full border-b border-brand-border py-3 text-left text-sm font-semibold uppercase"
            >
              New Arrivals
            </button>
            <button
              type="button"
              onClick={() => handleTagClick("bestseller")}
              className="block w-full border-b border-brand-border py-3 text-left text-sm font-semibold uppercase"
            >
              Best Sellers
            </button>
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryClick(category)}
                className="block w-full border-b border-brand-border py-3 text-left text-sm font-semibold uppercase"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>
    )}
  </>
  );
}
