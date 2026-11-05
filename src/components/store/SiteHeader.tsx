"use client";

import Link from "next/link";
import { MenuIcon, SearchIcon } from "./icons";

type SiteHeaderProps = {
  onMenuToggle: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export function SiteHeader({ onMenuToggle, searchQuery, onSearchChange }: SiteHeaderProps) {
  return (
    <header className="border-b border-brand-border bg-white">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-4 py-4 lg:px-8">
        {/* Mobile: hamburger */}
        <button
          type="button"
          onClick={onMenuToggle}
          className="shrink-0 lg:hidden"
          aria-label="Open menu"
        >
          <MenuIcon />
        </button>

        {/* Logo */}
        <Link href="/" className="flex shrink-0 items-center lg:mr-6">
          <img
            src="/tior-logo.jpg"
            alt="TIOR - Style with Comfort"
            className="h-10 sm:h-12 w-auto object-contain"
          />
        </Link>

        {/* Search bar */}
        <div className="relative flex flex-1 max-w-md items-center">
          <span className="pointer-events-none absolute left-3 text-brand-gray">
            <SearchIcon className="h-4 w-4" />
          </span>
          <input
            id="site-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search products…"
            className="w-full border border-brand-border bg-brand-light py-2 pl-9 pr-4 text-sm outline-none transition focus:border-brand-navy focus:bg-white"
          />
        </div>

        {/* Spacer for mobile symmetry */}
        <div className="w-6 shrink-0 lg:hidden" aria-hidden />
      </div>
    </header>
  );
}
