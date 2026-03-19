"use client";

import Link from "next/link";
import { ArrowRight, Instagram, Facebook, Twitter, Linkedin } from "lucide-react";
import { useState, useMemo } from "react";
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
        payload: { name: name.trim(), phone: phone.trim(), source: "footer" },
      });
      if (error) { setErrorMsg("Something went wrong. Please try again."); return; }
      setName(""); setPhone("");
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
    { label: "SEO", href: "/services/seo" },
    { label: "Social Media Marketing", href: "/services/social-media" },
    { label: "PPC / Performance Ads", href: "/services/ppc" },
    { label: "Content Marketing", href: "/services/content" },
    { label: "Website Development", href: "/services/web-development" },
    { label: "App Development", href: "/services/app-development" },
  ];

  const socials = [
    { Icon: Instagram, href: "https://instagram.com/", label: "Instagram" },
    { Icon: Facebook, href: "https://facebook.com/", label: "Facebook" },
    { Icon: Twitter, href: "https://x.com/", label: "Twitter" },
    { Icon: Linkedin, href: "https://linkedin.com/", label: "LinkedIn" },
  ];

  return (
    <footer className="relative bg-[#0a0a0a] text-white overflow-hidden">
      {/* Subtle top gradient accent */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* ── Main Content ── */}
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-12 lg:px-10">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_auto_auto_1fr] lg:gap-10">

          {/* ── Col 1: Headline + Form ── */}
          <div className="lg:col-span-1">
            {/* Big headline */}
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">
              Let&apos;s plan your growth
            </p>
            <h2 className="text-[clamp(40px,5.5vw,72px)] font-black leading-[1.05] tracking-tight bg-gradient-to-br from-white via-white/90 to-white/50 bg-clip-text text-transparent mb-6">
              Master<br />The Market.
            </h2>
            <p className="text-sm text-white/50 mb-8 max-w-xs leading-relaxed">
              Leave your name &amp; number. Let&apos;s start something impactful.
            </p>

            {/* Lead form */}
            <form onSubmit={handleSubmit} className="space-y-4 max-w-sm">
              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
              />
              <input
                type="tel"
                placeholder="Your Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none focus:border-white/30 transition-colors"
              />
              {errorMsg && <p className="text-red-400 text-xs">{errorMsg}</p>}
              {successMsg && <p className="text-emerald-400 text-xs">{successMsg}</p>}
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center gap-2 rounded-full bg-white text-black text-sm font-semibold px-6 py-3 hover:bg-white/90 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending…" : "Let's build your brand"}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </form>
          </div>

          {/* ── Col 2: Quick Links ── */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-150"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 3: Our Services ── */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-6">
              Our Services
            </h3>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.label}>
                  <Link
                    href={s.href}
                    className="text-sm text-white/70 hover:text-white transition-colors duration-150"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Col 4: Address + Social ── */}
          <div className="lg:col-span-1 lg:text-right flex flex-col justify-between gap-10">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40 mb-4">
                Find Us
              </h3>
              <address className="not-italic text-sm text-white/60 leading-relaxed">
                UP, Noida<br />
                Sector 63
              </address>
              <div className="mt-5 space-y-1">
                <Link href="mailto:info@brandelo.com" className="block text-sm text-white/70 hover:text-white transition-colors">
                  info@brandelo.com
                </Link>
                <Link href="tel:+919625229696" className="block text-sm text-white/70 hover:text-white transition-colors">
                  +91 96252 29696
                </Link>
              </div>
            </div>

            {/* Socials */}
            <div className="flex gap-3 lg:justify-end">
              {socials.map(({ Icon, href, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="h-9 w-9 rounded-full border border-white/15 bg-white/5 grid place-items-center text-white/60 hover:text-white hover:border-white/30 hover:-translate-y-0.5 transition-all duration-200"
                >
                  <Icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/8">
        <div className="mx-auto max-w-7xl px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/35">
          <span>Copyright © {new Date().getFullYear()} Brandelo. All rights reserved.</span>
          <span className="hidden sm:block">GST: 09QZUPES6134H1ZL</span>
          <div className="flex gap-4">
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="/refund" className="hover:text-white/60 transition-colors">Refund</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
