"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

function getTimeLeft() {
  const end = new Date();
  end.setHours(23, 59, 59, 999);
  const diff = end.getTime() - Date.now();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return { hours, minutes, seconds };
}

export function FlashSaleBanner() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    const timer = window.setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const pad = (value: number) => String(value).padStart(2, "0");

  return (
    <section className="border-y border-brand-border bg-brand-navy text-white">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 px-4 py-3 sm:flex-row lg:px-8">
        <Link
          href="#products"
          className="text-center text-xs font-bold uppercase tracking-[0.2em] hover:underline sm:text-left"
        >
          Flash Sale Ends In :
        </Link>
        <div className="flex items-center gap-2 font-[family-name:var(--font-oswald)] text-xl font-bold tracking-wider">
          <span className="min-w-[2.5rem] rounded bg-white/10 px-2 py-1 text-center">
            {pad(timeLeft.hours)}
          </span>
          <span>:</span>
          <span className="min-w-[2.5rem] rounded bg-white/10 px-2 py-1 text-center">
            {pad(timeLeft.minutes)}
          </span>
          <span>:</span>
          <span className="min-w-[2.5rem] rounded bg-white/10 px-2 py-1 text-center">
            {pad(timeLeft.seconds)}
          </span>
        </div>
        <Link
          href="#products"
          className="border border-white px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] transition hover:bg-white hover:text-brand-navy"
        >
          Shop All
        </Link>
      </div>
    </section>
  );
}
