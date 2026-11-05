"use client";

import Link from "next/link";
import { AnnouncementBar } from "@/components/store/AnnouncementBar";
import { SiteFooter } from "@/components/store/SiteFooter";

export default function AboutPage() {
  return (
    <>
      <AnnouncementBar />

      <header className="border-b border-brand-border bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center justify-center gap-4 px-4 py-6 lg:px-8">
          <Link href="/" className="flex shrink-0 items-center">
            <img
              src="/tior-logo.jpg"
              alt="TIOR - Style with Comfort"
              className="h-12 w-auto object-contain"
            />
          </Link>
        </div>
      </header>

      <main className="flex-1 bg-brand-light">
        <div className="mx-auto max-w-[800px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="bg-white p-8 sm:p-12 shadow-sm border border-brand-border">
            <h1 className="mb-10 text-center font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-wide text-brand-navy sm:text-4xl">
              About TIOR
            </h1>
            
            <div className="space-y-6 text-sm sm:text-base leading-relaxed text-brand-gray">
              <p>
                <strong className="text-brand-navy font-semibold">TIOR</strong> is a modern fashion and lifestyle brand built around the philosophy of <strong className="text-brand-navy font-semibold">Style with Comfort</strong>. We believe clothing should not only look good, but also feel comfortable, fit well, and seamlessly support your daily lifestyle.
              </p>
              
              <p>
                Our collection includes a wide range of essentials such as women’s nightwear, innerwear, maternity wear, gym wear, co-ord sets, kurtis, T-shirts, socks, and selected fashion essentials. Every product is thoughtfully curated to match the needs of today’s customers — whether it is daily wear, lounge wear, active wear, maternity comfort, or stylish casual outfits.
              </p>
              
              <p>
                At TIOR, our focus is on quality fabric, comfortable fitting, stylish designs, and affordable pricing. We work to bring products that are easy to wear, durable for regular use, and suitable for different occasions. From soft nightwear to supportive innerwear and fashionable daily outfits, TIOR aims to make everyday dressing simple, confident, and comfortable.
              </p>
              
              <p>
                We are based in Ankleshwar, Bharuch, Gujarat, and we are continuously growing with a vision to become a trusted name in everyday fashion. Our goal is to provide products that customers can rely on for comfort, quality, and style.
              </p>
            </div>
            
            <div className="mt-12 flex justify-center">
              <Link 
                href="/"
                className="inline-block bg-brand-black px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-brand-red"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
