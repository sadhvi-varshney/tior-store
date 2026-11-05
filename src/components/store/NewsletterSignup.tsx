"use client";

import { useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <section className="border-t border-brand-border bg-brand-light py-12">
      <div className="mx-auto max-w-xl px-4 text-center">
        <h2 className="font-[family-name:var(--font-oswald)] text-xl font-bold uppercase tracking-[0.15em]">
          Join our Mailing List for Updates
        </h2>
        <p className="mt-2 text-sm text-brand-gray">
          Get exclusive offers and new arrival alerts.
        </p>
        {submitted ? (
          <p className="mt-6 text-sm font-semibold text-brand-red">
            Thank you for subscribing!
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-2 sm:flex-row">
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              className="flex-1 border border-brand-border bg-white px-4 py-3 text-sm outline-none focus:border-brand-navy"
            />
            <button
              type="submit"
              className="bg-brand-black px-8 py-3 text-xs font-bold uppercase tracking-[0.15em] text-white transition hover:bg-brand-red"
            >
              Submit
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
