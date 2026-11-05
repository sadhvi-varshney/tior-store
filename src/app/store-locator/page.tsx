"use client";

import Link from "next/link";
import { AnnouncementBar } from "@/components/store/AnnouncementBar";
import { SiteFooter } from "@/components/store/SiteFooter";

export default function StoreLocatorPage() {
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
            <h1 className="mb-8 text-center font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-wide text-brand-navy sm:text-4xl">
              Contact Us
            </h1>
            
            <div className="space-y-8 text-sm sm:text-base leading-relaxed text-brand-gray">
              <p className="text-center">
                We are always here to help you. For any questions related to products, orders, delivery, returns, or general support, you can contact the TIOR support team.
              </p>

              <div className="border-t border-brand-border pt-8">
                <ul className="space-y-6">
                  <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <strong className="text-brand-navy font-semibold w-40 shrink-0">Brand Name:</strong>
                    <span>TIOR</span>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <strong className="text-brand-navy font-semibold w-40 shrink-0">Email:</strong>
                    <a href="mailto:tagas0011@gmail.com" className="hover:text-brand-red transition">tagas0011@gmail.com</a>
                  </li>
                  <li className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <strong className="text-brand-navy font-semibold w-40 shrink-0">Phone / WhatsApp:</strong>
                    <a href="tel:+919924816748" className="hover:text-brand-red transition">+91 9924816748</a>
                  </li>
                  <li className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                    <strong className="text-brand-navy font-semibold w-40 shrink-0">Location:</strong>
                    <span>Plot/Shed No 23, YOGI ESTATE 6, Nr Annu Engineering, At JItali, Ankleshwar GIDC, Ankleshwar, Bharuch, Gujarat-393002</span>
                  </li>
                  <li className="flex flex-col sm:flex-row gap-1 sm:gap-4">
                    <strong className="text-brand-navy font-semibold w-40 shrink-0">Instagram:</strong>
                    <a href="https://www.instagram.com/celary2026?igsh=aGxzNWpiazMxOHJs" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition break-all">
                      https://www.instagram.com/celary2026?igsh=aGxzNWpiazMxOHJs
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-8 rounded-sm bg-brand-light p-6 text-center">
                <p className="font-semibold text-brand-navy">
                  Our team will try to respond to your query as soon as possible.
                </p>
              </div>
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
