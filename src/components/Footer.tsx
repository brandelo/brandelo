"use client";

import Link from "next/link";
import {
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";
import React, { useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function Footer() {
  const supabase = useMemo(() => createClient(), []);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMsg(null);
    setErrorMsg(null);

    if (!name.trim() || !phone.trim()) {
      setErrorMsg("Please enter your name and number.");
      return;
    }

    try {
      setSubmitting(true);

      const { error } = await supabase.from("form_submissions").insert({
        form_key: "footer_lead",
        form_title: "Footer Lead",
        status: "new",
        full_name: name.trim(),
        phone: phone.trim(),
        payload: {
          name: name.trim(),
          phone: phone.trim(),
          source: "footer",
        },
      });

      if (error) {
        setErrorMsg("Something went wrong. Please try again.");
        return;
      }

      setName("");
      setPhone("");
      setSuccessMsg("Thanks! We'll be in touch soon.");
    } catch {
      setErrorMsg("Unexpected error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Blogs", href: "/blog" },
    { label: "Work With Us", href: "/careers" },
    { label: "Get In Touch", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
  ];

  const services = [
    { label: "SEO Services", href: "/services/seo" },
    { label: "SMM Services", href: "/services/smm" },
    { label: "Web Development", href: "/services/web-development" },
    { label: "App Development", href: "/services/app-development" },
    { label: "Content Marketing", href: "/services/content-marketing" },
  ];

  const packages = [
    { label: "SEO Packages", href: "/pricing?type=seo" },
    { label: "SMM Packages", href: "/pricing?type=smm" },
    { label: "Web Packages", href: "/pricing?type=web" },
    { label: "Add-ons", href: "/pricing?type=addons" },
  ];

  const socials = [
    { Icon: Instagram, href: "https://www.instagram.com/brandelo_digital/", label: "Instagram" },
    { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61574286205890", label: "Facebook" },
    { Icon: Twitter, href: "https://x.com/", label: "Twitter" },
    { Icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] text-white">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left Block */}
          <div className="lg:col-span-4">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/40">
              Let&apos;s plan your growth
            </p>

            <h2 className="mb-5 text-[clamp(34px,4.8vw,64px)] font-black leading-[1.02] tracking-tight bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent">
              Master
              <br />
              The Market.
            </h2>

            <p className="mb-8 max-w-md text-sm leading-relaxed text-white/50">
              Leave your name and number and our team will get in touch with you.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/30"
              />

              <input
                type="tel"
                placeholder="Your Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-white/30"
              />

              {errorMsg && <p className="text-xs text-red-400">{errorMsg}</p>}
              {successMsg && (
                <p className="text-xs text-emerald-400">{successMsg}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Sending..." : "Let's build your brand"}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </form>
          </div>

          {/* Right Links Area */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
              <div>
                <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {quickLinks.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-white/70 transition-colors duration-150 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                  Our Services
                </h3>
                <ul className="space-y-3">
                  {services.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-white/70 transition-colors duration-150 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                  Our Packages
                </h3>
                <ul className="space-y-3">
                  {packages.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className="text-sm text-white/70 transition-colors duration-150 hover:text-white"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
                  Find Us
                </h3>

                <address className="not-italic text-sm leading-relaxed text-white/60">
                  UP, Noida
                  <br />
                  Sector 63
                </address>

                <div className="mt-5 space-y-2">
                  <Link
                    href="mailto:info@brandelo.com"
                    className="block text-sm text-white/70 transition-colors hover:text-white"
                  >
                    info@brandelo.com
                  </Link>

                  <Link
                    href="tel:+919871492013"
                    className="block text-sm text-white/70 transition-colors hover:text-white"
                  >
                    +91 98714 92013
                  </Link>
                </div>

                <div className="mt-6 flex gap-3">
                  {socials.map(({ Icon, href, label }) => (
                    <Link
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white/60 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:text-white"
                    >
                      <Icon className="h-4 w-4" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 text-xs text-white/35 sm:flex-row sm:items-center sm:justify-between lg:px-10">
          <div className="text-center sm:text-left">
            Copyright © {new Date().getFullYear()} Brandelo. All rights reserved.
          </div>

          <div className="text-center sm:text-left">
            GST: 09QZUPES6134H1ZL
          </div>

          <div className="flex justify-center gap-4 sm:justify-end">
            <Link href="/terms" className="transition-colors hover:text-white/60">
              Terms
            </Link>
            <Link href="/privacy" className="transition-colors hover:text-white/60">
              Privacy
            </Link>
            <Link href="/refund" className="transition-colors hover:text-white/60">
              Refund
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}