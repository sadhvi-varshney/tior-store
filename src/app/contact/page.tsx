"use client";

import Link from "next/link";
import { AnnouncementBar } from "@/components/store/AnnouncementBar";
import { SiteFooter } from "@/components/store/SiteFooter";

export default function ContactPage() {
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
            <h1 className="mb-4 text-center font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-wide text-brand-navy sm:text-4xl">
              Contact Us
            </h1>
            <p className="mb-10 text-center text-sm uppercase tracking-[0.15em] text-brand-gray font-semibold">
              How Can We Help?
            </p>
            
            <div className="space-y-8 text-sm sm:text-base leading-relaxed text-brand-gray">
              <div>
                <p>
                  Got a question, need help with your order, or just want to know more about our products? We’re here to help you.
                </p>
                <p className="mt-4">
                  Whether you want to ask about size, product details, delivery, return, exchange, or anything else, our team is ready to assist you. Before reaching out, you can also check our FAQs if available — your answer might already be there.
                </p>
              </div>

              <div className="border-t border-brand-border pt-8">
                <h2 className="mb-4 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">
                  TIOR
                </h2>
                <p>
                  We are a fashion and lifestyle brand offering comfortable, stylish, and affordable everyday wear for women, maternity wear, innerwear, activewear, and selected lifestyle essentials under our vision of Style with Comfort.
                </p>
                <div className="mt-6">
                  <h3 className="font-bold text-brand-navy">Location:</h3>
                  <p className="mt-1">
                    Plot/Shed No 23, YOGI ESTATE 6, Nr Annu Engineering, At Jitali, Ankleshwar GIDC, Ankleshwar, Bharuch, Gujarat-393002
                  </p>
                </div>
              </div>

              <div className="border-t border-brand-border pt-8">
                <h2 className="mb-6 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">
                  Here’s How You Can Reach Us
                </h2>
                <ul className="space-y-5">
                  <li>
                    <strong className="text-brand-navy font-semibold block mb-1">Customer Support Hours:</strong>
                    Monday to Saturday: 10:00 AM – 6:00 PM
                  </li>
                  <li>
                    <strong className="text-brand-navy font-semibold block mb-1">Call / WhatsApp:</strong>
                    <a href="tel:+919924816748" className="hover:text-brand-red transition">+91 9924816748</a>
                  </li>
                  <li>
                    <strong className="text-brand-navy font-semibold block mb-1">Email:</strong>
                    <a href="mailto:tagas0011@gmail.com" className="hover:text-brand-red transition">tagas0011@gmail.com</a>
                  </li>
                  <li>
                    <strong className="text-brand-navy font-semibold block mb-1">Instagram:</strong>
                    <a href="https://www.instagram.com/celary2026?igsh=aGxzNWpiazMxOHJs" target="_blank" rel="noopener noreferrer" className="hover:text-brand-red transition break-all">
                      https://www.instagram.com/celary2026?igsh=aGxzNWpiazMxOHJs
                    </a>
                  </li>
                </ul>
              </div>

              <div className="mt-8 rounded-sm bg-brand-light p-6 text-center">
                <p className="font-semibold text-brand-navy">
                  We usually try to respond as soon as possible during working hours.
                </p>
                <p className="mt-2 text-sm">
                  Thank you for choosing TIOR.
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
