import Link from "next/link";

const policies = [
  "Terms and Conditions",
  "Privacy Policy",
];

const quickHelp = ["About Us", "Contact Us", "Store Locator"];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-brand-border bg-white">
      <div className="mx-auto grid max-w-[1400px] gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
        <div>
          <p className="font-[family-name:var(--font-oswald)] text-lg font-bold uppercase tracking-[0.15em] text-brand-navy">
            TIOR
          </p>
          <p className="mt-3 text-sm leading-relaxed text-brand-gray">
            Official online store for TIOR. Style with Comfort.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.15em]">
            Policies
          </h3>
          <ul className="mt-4 space-y-2">
            {policies.map((item) => {
              const href = item === "Terms and Conditions" ? "/terms-and-conditions" : item === "Privacy Policy" ? "/privacy-policy" : null;
              return (
                <li key={item}>
                  {href ? (
                    <Link href={href} className="cursor-pointer text-sm text-brand-gray transition hover:text-brand-red">
                      {item}
                    </Link>
                  ) : (
                    <span className="cursor-pointer text-sm text-brand-gray transition hover:text-brand-red">
                      {item}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.15em]">
            Quick Help
          </h3>
          <ul className="mt-4 space-y-2">
            {quickHelp.map((item) => {
              const href = item === "About Us" ? "/about" : item === "Contact Us" ? "/contact" : item === "Store Locator" ? "/store-locator" : null;
              return (
                <li key={item}>
                  {href ? (
                    <Link href={href} className="cursor-pointer text-sm text-brand-gray transition hover:text-brand-red">
                      {item}
                    </Link>
                  ) : (
                    <span className="cursor-pointer text-sm text-brand-gray transition hover:text-brand-red">
                      {item}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="border-t border-brand-border bg-brand-black py-4 text-center text-xs text-white/80">
        <div className="mb-3 flex items-center justify-center gap-4">
          {/* Facebook */}
          <Link href="https://www.facebook.com/share/18E7Enuqab/" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/30 transition hover:border-white hover:bg-white/10">
            <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
            </svg>
          </Link>
          {/* YouTube */}
          <Link href="#" aria-label="YouTube" className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/30 transition hover:border-white hover:bg-white/10">
            <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
              <polygon fill="#111" points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
            </svg>
          </Link>
          {/* Instagram */}
          <Link href="https://www.instagram.com/celary2026?igsh=Njl4bXRqMHo1bXQz" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="group flex h-8 w-8 items-center justify-center rounded-full border border-white/30 transition hover:border-white hover:bg-white/10">
            <svg className="h-4 w-4 fill-none stroke-white" viewBox="0 0 24 24" strokeWidth={1.8}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="white" stroke="none" />
            </svg>
          </Link>
        </div>
        <p className="mb-2">Copyright © TIOR | All Rights Reserved</p>
        <p className="text-[10px] text-white/50 max-w-3xl mx-auto px-4 leading-relaxed">
          Amazon Affiliate Notice: &quot;As an Amazon Associate, TIOR Brand may earn from qualifying purchases made through links on this website.&quot;
        </p>
      </div>
    </footer>
  );
}
