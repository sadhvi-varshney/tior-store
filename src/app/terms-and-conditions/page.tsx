"use client";

import Link from "next/link";
import { AnnouncementBar } from "@/components/store/AnnouncementBar";
import { SiteFooter } from "@/components/store/SiteFooter";

export default function TermsAndConditionsPage() {
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
        <div className="mx-auto max-w-[900px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="bg-white p-8 sm:p-12 shadow-sm border border-brand-border">
            <h1 className="mb-4 text-center font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase tracking-wide text-brand-navy sm:text-4xl">
              Terms and Conditions
            </h1>
            <p className="mb-10 text-center text-sm tracking-[0.15em] text-brand-gray font-semibold">
              Last Updated: [1st June, 2026]
            </p>
            
            <div className="space-y-8 text-sm sm:text-base leading-relaxed text-brand-gray">
              <p>
                Welcome to TIOR (&quot;Website&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). By accessing and using this website, you agree to comply with and be bound by these Terms and Conditions. If you do not agree with these terms, please do not use our website.
              </p>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">1. About Our Website</h2>
                <p>TIOR provides information, reviews, recommendations, and listings of products available through third-party marketplaces, including Amazon. Our website serves as a product discovery and referral platform.</p>
                <p className="mt-2">We do not directly sell, ship, store, manufacture, or fulfill orders for the products displayed on this website unless explicitly stated otherwise.</p>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">2. Affiliate Disclosure</h2>
                <p>Some links on this website are affiliate links. This means that if you click on a product link and make a purchase through Amazon or another third-party platform, we may earn a commission at no additional cost to you.</p>
                <p className="mt-2">Our participation in affiliate programs does not influence our product recommendations, reviews, or rankings.</p>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">3. Product Information</h2>
                <p>We strive to provide accurate and up-to-date product descriptions, specifications, pricing, availability, and images. However:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Product information is provided by third-party sellers or marketplaces.</li>
                  <li>Prices and availability may change without notice.</li>
                  <li>We do not guarantee the accuracy, completeness, or reliability of any product information displayed on our website.</li>
                  <li>Users should verify all product details directly on the Amazon product page before making a purchase.</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">4. Purchases Through Third-Party Websites</h2>
                <p>When you click on a product link, you may be redirected to Amazon or another third-party website. Any purchase transaction, payment, shipping, returns, refunds, warranties, or customer service matters are handled solely by the respective third-party platform.</p>
                <p className="mt-2">TIOR is not responsible for:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Product quality or performance</li>
                  <li>Order fulfillment</li>
                  <li>Delivery delays</li>
                  <li>Payment processing</li>
                  <li>Returns and refunds</li>
                  <li>Warranty claims</li>
                  <li>Customer support provided by third parties</li>
                </ul>
                <p className="mt-2">Your purchases are governed by the terms, conditions, and policies of the third-party platform where the transaction occurs.</p>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">5. Intellectual Property</h2>
                <p>All content on this website, including but not limited to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Text</li>
                  <li>Logos</li>
                  <li>Graphics</li>
                  <li>Website design</li>
                  <li>Images created by TIOR</li>
                  <li>Articles and reviews</li>
                </ul>
                <p className="mt-2">is the property of TIOR unless otherwise stated and is protected by applicable intellectual property laws. You may not reproduce, distribute, modify, or commercially exploit any content without prior written permission.</p>
                <p className="mt-2">Product names, trademarks, and brand names displayed belong to their respective owners.</p>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">6. User Conduct</h2>
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Use the website for any unlawful purpose.</li>
                  <li>Attempt to gain unauthorized access to the website.</li>
                  <li>Distribute malicious software or harmful code.</li>
                  <li>Interfere with the operation or security of the website.</li>
                  <li>Copy or scrape content without permission.</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">7. Disclaimer of Warranties</h2>
                <p>The website and all content are provided on an &quot;as is&quot; and &quot;as available&quot; basis.</p>
                <p className="mt-2">To the fullest extent permitted by law, TIOR makes no warranties regarding:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Accuracy of content</li>
                  <li>Product information</li>
                  <li>Website availability</li>
                  <li>Website security</li>
                  <li>Fitness for a particular purpose</li>
                </ul>
                <p className="mt-2">We do not guarantee uninterrupted or error-free access to the website.</p>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">8. Limitation of Liability</h2>
                <p>To the maximum extent permitted by applicable law, TIOR shall not be liable for any:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Direct damages</li>
                  <li>Indirect damages</li>
                  <li>Incidental damages</li>
                  <li>Consequential damages</li>
                  <li>Loss of profits</li>
                  <li>Loss of data</li>
                </ul>
                <p className="mt-2">arising from your use of the website or your purchase of products through third-party platforms.</p>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">9. External Links</h2>
                <p>Our website may contain links to third-party websites, including Amazon. We do not control or endorse the content, policies, products, or services offered by third-party websites and are not responsible for their practices.</p>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">10. Privacy</h2>
                <p>Your use of the website is also governed by our Privacy Policy. By using the website, you consent to the collection and use of information as described in the Privacy Policy.</p>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">11. Changes to These Terms</h2>
                <p>We reserve the right to modify these Terms and Conditions at any time without prior notice. Updated versions will be posted on this page with a revised &quot;Last Updated&quot; date.</p>
                <p className="mt-2">Continued use of the website after changes are posted constitutes acceptance of the updated terms.</p>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">12. Governing Law</h2>
                <p>These Terms and Conditions shall be governed by and interpreted in accordance with the laws of India, without regard to conflict of law principles.</p>
                <p className="mt-2">Any disputes arising from the use of this website shall be subject to the exclusive jurisdiction of the courts located in Bangalore, Karnataka, India.</p>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">13. Contact Us</h2>
                <p>If you have any questions regarding these Terms and Conditions, please contact us:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><strong>TIOR</strong></li>
                  <li><strong>Email:</strong> <a href="mailto:tagas0011@gmail.com" className="hover:text-brand-red transition">tagas0011@gmail.com</a></li>
                </ul>
              </section>

              <div className="mt-8 rounded-sm bg-brand-light p-6 text-center text-sm border border-brand-border">
                <p className="font-semibold text-brand-navy">Amazon Affiliate Notice:</p>
                <p className="mt-2 italic text-brand-gray">
                  &quot;As an Amazon Associate, TIOR may earn from qualifying purchases made through links on this website.&quot;
                </p>
              </div>

            </div>
            
            <div className="mt-12 flex justify-center">
              <Link 
                href="/"
                className="inline-block bg-brand-black px-8 py-4 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-brand-red"
              >
                Return to Store
              </Link>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
