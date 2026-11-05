"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { CloseIcon } from "./icons";

export function SignupModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem("tagas_signup_dismissed");
    if (!dismissed) {
      const timer = window.setTimeout(() => setOpen(true), 1500);
      return () => window.clearTimeout(timer);
    }
  }, []);

  const dismiss = () => {
    sessionStorage.setItem("tagas_signup_dismissed", "1");
    setOpen(false);
  };

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-3xl overflow-hidden bg-white shadow-2xl">
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center bg-white/90"
          aria-label="Close"
        >
          <CloseIcon className="h-4 w-4" />
        </button>

        <div className="grid md:grid-cols-2">
          <div className="relative hidden aspect-[4/5] md:block">
            <Image
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=800&q=80"
              alt="Signup offer"
              fill
              sizes="400px"
              className="object-cover"
            />
          </div>
          <div className="p-8">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red">
              Sign Up Offer
            </p>
            <h2 className="mt-2 font-[family-name:var(--font-oswald)] text-2xl font-bold uppercase tracking-wide">
              Sign Up Form
            </h2>
            <p className="mt-2 text-sm text-brand-gray">
              Extra 10% off on your first purchase
            </p>
            <form
              className="mt-6 space-y-3"
              onSubmit={(event) => {
                event.preventDefault();
                dismiss();
              }}
            >
              <input
                type="text"
                placeholder="Name"
                required
                className="w-full border border-brand-border px-3 py-2.5 text-sm outline-none focus:border-brand-navy"
              />
              <input
                type="email"
                placeholder="Email"
                required
                className="w-full border border-brand-border px-3 py-2.5 text-sm outline-none focus:border-brand-navy"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full border border-brand-border px-3 py-2.5 text-sm outline-none focus:border-brand-navy"
              />
              <div className="flex gap-4 pt-1 text-sm">
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" defaultChecked />
                  Male
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" />
                  Female
                </label>
              </div>
              <button
                type="submit"
                className="w-full bg-brand-red py-3 text-xs font-bold uppercase tracking-[0.2em] text-white hover:bg-brand-navy"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
