import Link from "next/link";

export function AnnouncementBar() {
  const message =
    "Get up to 40% off on all styles";

  return (
    <div className="relative bg-brand-red text-white">
      <div className="overflow-hidden">
        <div className="animate-marquee flex w-max whitespace-nowrap py-2 text-[11px] font-semibold uppercase tracking-[0.12em] sm:text-xs">
          <span className="px-8">{message}</span>
          <span className="px-8">{message}</span>
          <span className="px-8">{message}</span>
          <span className="px-8">{message}</span>
        </div>
      </div>
      <Link
        href="#products"
        className="absolute right-0 top-0 hidden h-full items-center bg-brand-red px-4 text-[10px] font-bold uppercase tracking-wider underline sm:flex"
      >
        Shop Now
      </Link>
    </div>
  );
}
