"use client";

import Link from "next/link";
import { AnnouncementBar } from "@/components/store/AnnouncementBar";
import { SiteFooter } from "@/components/store/SiteFooter";

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="mb-10 text-center text-sm tracking-[0.15em] text-brand-gray font-semibold">
              Last Updated: [1st June, 2026]
            </p>
            
            <div className="space-y-8 text-sm sm:text-base leading-relaxed text-brand-gray">
              <p>
                Welcome to TIOR (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). This Privacy Policy explains how we collect, use, disclose, and protect your information when you visit our website.
              </p>
              <p>
                By using our website, you agree to the practices described in this Privacy Policy.
              </p>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">1. Information We Collect</h2>
                
                <h3 className="font-semibold text-brand-navy mt-4 mb-2">Information You Provide</h3>
                <p>We may collect information that you voluntarily provide, including:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Name</li>
                  <li>Email address</li>
                  <li>Contact information</li>
                  <li>Messages submitted through contact forms</li>
                  <li>Feedback, inquiries, or support requests</li>
                </ul>

                <h3 className="font-semibold text-brand-navy mt-4 mb-2">Information Collected Automatically</h3>
                <p>When you visit our website, certain information may be collected automatically, including:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>Operating system</li>
                  <li>Referring website</li>
                  <li>Pages viewed</li>
                  <li>Date and time of visit</li>
                  <li>Click activity on our website</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">2. How We Use Your Information</h2>
                <p>We may use collected information to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Operate and maintain our website</li>
                  <li>Improve user experience</li>
                  <li>Respond to inquiries and support requests</li>
                  <li>Analyze website traffic and performance</li>
                  <li>Detect and prevent fraud or unauthorized activity</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">3. Affiliate Links and Third-Party Websites</h2>
                <p>TIOR participates in affiliate programs, including the Amazon Associates Program.</p>
                <p className="mt-2">When you click affiliate links on our website, you may be redirected to Amazon or other third-party websites.</p>
                <p className="mt-2">We do not control and are not responsible for:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Privacy practices of third-party websites</li>
                  <li>Information collected by third parties</li>
                  <li>Cookies placed by third-party websites</li>
                  <li>Transactions conducted on third-party platforms</li>
                </ul>
                <p className="mt-2">We encourage you to review the privacy policies of any third-party websites you visit.</p>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">4. Cookies and Tracking Technologies</h2>
                <p>Our website may use cookies and similar technologies to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Improve website functionality</li>
                  <li>Remember user preferences</li>
                  <li>Analyze website traffic</li>
                  <li>Measure affiliate link performance</li>
                  <li>Enhance user experience</li>
                </ul>
                <p className="mt-2">Cookies are small files stored on your device.</p>
                <p className="mt-2">You can modify your browser settings to refuse cookies or notify you when cookies are being used. However, some website features may not function properly if cookies are disabled.</p>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">5. Amazon Affiliate Program</h2>
                <p>TIOR participates in the Amazon Services LLC Associates Program and other affiliate programs.</p>
                <p className="mt-2">Amazon and other affiliate partners may use cookies and tracking technologies to determine whether a purchase originated from our referral link.</p>
                <p className="mt-2">These technologies are controlled by the respective affiliate partner and are subject to their privacy policies.</p>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">6. Analytics Services</h2>
                <p>We may use third-party analytics services such as:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Google Analytics</li>
                  <li>Search Console</li>
                  <li>Other traffic analysis tools</li>
                </ul>
                <p className="mt-2">These services may collect information regarding your use of the website to help us understand visitor behavior and improve our services.</p>
                <p className="mt-2">Google&apos;s use of information is governed by its own privacy policies.</p>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">7. Data Sharing</h2>
                <p>We do not sell, rent, or trade your personal information to third parties.</p>
                <p className="mt-2">We may share information only in the following situations:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>With service providers assisting website operations</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect our rights, users, or website security</li>
                  <li>In connection with a business transfer, merger, or acquisition</li>
                </ul>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">8. Data Security</h2>
                <p>We implement reasonable technical and organizational measures to protect your information.</p>
                <p className="mt-2">However, no method of internet transmission or electronic storage is completely secure. Therefore, we cannot guarantee absolute security of your information.</p>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">9. Data Retention</h2>
                <p>We retain personal information only for as long as necessary to:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Provide requested services</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes</li>
                  <li>Enforce our agreements</li>
                </ul>
                <p className="mt-2">When information is no longer required, it will be deleted or anonymized where reasonably practicable.</p>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">10. Your Rights</h2>
                <p>Depending on applicable laws, you may have rights regarding your personal information, including:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Access to your information</li>
                  <li>Correction of inaccurate information</li>
                  <li>Deletion of personal information</li>
                  <li>Restriction of processing</li>
                  <li>Objection to certain uses of information</li>
                  <li>Withdrawal of consent where applicable</li>
                </ul>
                <p className="mt-2">To exercise any applicable rights, please contact us using the details below.</p>
              </section>

              <section>
                <h2 className="mb-3 font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-wide text-brand-navy">11. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time.</p>
                <p className="mt-2">Any changes will be posted on this page with an updated &quot;Last Updated&quot; date.</p>
                <p className="mt-2">Your continued use of the website after changes are posted constitutes acceptance of the revised Privacy Policy.</p>
              </section>

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
