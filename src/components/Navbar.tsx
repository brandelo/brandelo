"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import {
  Instagram, Facebook, Twitter,
  Phone, Mail, MapPin, ArrowRight,
  ChevronDown, TrendingUp, Users, Code2, Smartphone, FileText
} from "lucide-react";

// ── nav items ──────────────────────────────────────────────
type Item = { href: string; label: string };

const serviceItems = [
  { href: "/services/seo",               label: "SEO",               icon: <TrendingUp className="h-4 w-4 text-emerald-400" />, desc: "Rank #1 on Google" },
  { href: "/services/smm",               label: "SMM",               icon: <Users      className="h-4 w-4 text-pink-400"    />, desc: "Social Growth & Ads" },
  { href: "/services/web-development",    label: "Web Dev",           icon: <Code2      className="h-4 w-4 text-cyan-400"    />, desc: "Next.js & Performance" },
  { href: "/services/app-development",    label: "App Dev",           icon: <Smartphone className="h-4 w-4 text-indigo-400"  />, desc: "iOS & Android Apps" },
  { href: "/services/content-marketing",  label: "Content Marketing", icon: <FileText   className="h-4 w-4 text-orange-400"  />, desc: "Stories that Convert" },
];

const packageItems = [
  { href: "/pricing?type=seo",       label: "SEO Packages",       icon: <TrendingUp className="h-4 w-4 text-emerald-400" />, desc: "Organic Growth Tiers" },
  { href: "/pricing?type=ecommerce", label: "Ecommerce SEO",      icon: <FileText   className="h-4 w-4 text-indigo-400"  />, desc: "Online Store Success" },
  { href: "/pricing?type=smm",       label: "SMO Packages",       icon: <Users      className="h-4 w-4 text-pink-400"    />, desc: "Social Trust Building" },
  { href: "/pricing?type=web",       label: "Web Packages",       icon: <Code2      className="h-4 w-4 text-cyan-400"    />, desc: "Modern Website Design" },
];

const navItems: Item[] = [
  { href: "/",        label: "Home"    },
  { href: "/about",   label: "About"   },
  // Services & Packages have dropdowns — handled separately
  { href: "/contact", label: "Contact" },
  { href: "/blog",    label: "Blog"    },
];

// ── component ──────────────────────────────────────────────
export default function Navbar() {
  const pathname  = usePathname();
  const [open,    setOpen]    = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [packagesDropdown, setPackagesDropdown] = useState(false);
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const packRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);
  const servicesActive = pathname?.startsWith("/services");
  const packagesActive = pathname?.startsWith("/pricing");

  // scroll behaviour
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 20);
      setVisible(y < lastY || y < 60);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node))
        setServicesDropdown(false);
      if (packRef.current && !packRef.current.contains(e.target as Node))
        setPackagesDropdown(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-transform duration-300 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* ── top strip ── */}
      <div className="hidden md:block bg-[#030712] border-b border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center justify-between h-9">
            <div className="flex items-center gap-6">
              <TopInfo icon={<MapPin className="h-3 w-3 text-cyan-400" />} text="Noida Sector 63, H-187" />
              <div className="w-px h-4 bg-white/10" />
              <TopInfo icon={<Mail  className="h-3 w-3 text-cyan-400" />} text="info@brandelo.com" href="mailto:info@brandelo.com" />
              <div className="w-px h-4 bg-white/10" />
              <TopInfo icon={<Phone className="h-3 w-3 text-cyan-400" />} text="+91 98714 92013" href="tel:+919871492013" />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/40 font-medium tracking-widest uppercase mr-1">Follow</span>
              <SocialIcon type="instagram" href="https://www.instagram.com/brandelo_digital/" />
              <SocialIcon type="facebook"  href="https://www.facebook.com/profile.php?id=61574286205890"  />
              <SocialIcon type="twitter"   href="https://twitter.com/"   />
            </div>
          </div>
        </div>
      </div>

      {/* ── main nav ── */}
      <div
        className={`transition-all duration-300 ${
          scrolled
            ? "bg-[#030712]/90 backdrop-blur-2xl shadow-[0_1px_40px_rgba(0,0,0,0.7)] border-b border-white/[0.06]"
            : "bg-[#030712]"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-[68px] items-center justify-between">

            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="bg-white rounded-xl px-3 py-1.5 shadow-md transition-transform group-hover:scale-[1.03] duration-200">
                <Image src="/logo.png" alt="Brandelo" width={130} height={36} className="object-contain" priority />
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {/* Home */}
              <NavLink href="/" label="Home" active={isActive("/")} />
              {/* About */}
              <NavLink href="/about" label="About" active={isActive("/about")} />

              {/* Services dropdown */}
              <div className="relative" ref={dropRef}>
                <button
                  onMouseEnter={() => setServicesDropdown(true)}
                  onMouseLeave={() => setServicesDropdown(false)}
                  onClick={() => setServicesDropdown((v) => !v)}
                  className={`relative flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                    ${servicesActive
                      ? "text-white bg-white/10"
                      : "text-white/60 hover:text-white hover:bg-white/[0.07]"
                    }`}
                >
                  Services
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${servicesDropdown ? "rotate-180" : ""}`}
                  />
                  {servicesActive && (
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400" />
                  )}
                </button>

                {/* Dropdown panel */}
                <div
                  onMouseEnter={() => setServicesDropdown(true)}
                  onMouseLeave={() => setServicesDropdown(false)}
                  className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-64 transition-all duration-200 origin-top ${
                    servicesDropdown ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  {/* Arrow */}
                  <div className="flex justify-center mb-1">
                    <div className="w-3 h-3 rotate-45 bg-[#0f1629] border-l border-t border-white/10" />
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#0f1629]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
                    <div className="p-2 flex flex-col gap-1">
                      {serviceItems.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          onClick={() => setServicesDropdown(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group
                            ${pathname?.startsWith(s.href)
                              ? "bg-white/10 text-white"
                              : "text-white/70 hover:text-white hover:bg-white/[0.07]"
                            }`}
                        >
                          <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 border border-white/10 shrink-0 group-hover:border-white/20 transition">
                            {s.icon}
                          </span>
                          <span>
                            <span className="block text-sm font-medium leading-tight">{s.label}</span>
                            <span className="block text-[11px] text-white/40">{s.desc}</span>
                          </span>
                        </Link>
                      ))}
                      {/* View all */}
                      <Link
                        href="/services"
                        onClick={() => setServicesDropdown(false)}
                        className="mt-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-white/10 text-xs font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.05] transition"
                      >
                        View all services <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Packages dropdown */}
              <div className="relative" ref={packRef}>
                <button
                  onMouseEnter={() => setPackagesDropdown(true)}
                  onMouseLeave={() => setPackagesDropdown(false)}
                  onClick={() => setPackagesDropdown((v) => !v)}
                  className={`relative flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
                    ${packagesActive
                      ? "text-white bg-white/10"
                      : "text-white/60 hover:text-white hover:bg-white/[0.07]"
                    }`}
                >
                  Packages
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${packagesDropdown ? "rotate-180" : ""}`}
                  />
                  {packagesActive && (
                    <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400" />
                  )}
                </button>

                {/* Dropdown panel */}
                <div
                  onMouseEnter={() => setPackagesDropdown(true)}
                  onMouseLeave={() => setPackagesDropdown(false)}
                  className={`absolute top-[calc(100%+8px)] left-1/2 -translate-x-1/2 w-64 transition-all duration-200 origin-top ${
                    packagesDropdown ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  {/* Arrow */}
                  <div className="flex justify-center mb-1">
                    <div className="w-3 h-3 rotate-45 bg-[#0f1629] border-l border-t border-white/10" />
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-[#0f1629]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)] overflow-hidden">
                    <div className="p-2 flex flex-col gap-1">
                      {packageItems.map((p) => (
                        <Link
                          key={p.href}
                          href={p.href}
                          onClick={() => setPackagesDropdown(false)}
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group
                            ${pathname === p.href
                              ? "bg-white/10 text-white"
                              : "text-white/70 hover:text-white hover:bg-white/[0.07]"
                            }`}
                        >
                          <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 border border-white/10 shrink-0 group-hover:border-white/20 transition">
                            {p.icon}
                          </span>
                          <span>
                            <span className="block text-sm font-medium leading-tight">{p.label}</span>
                            <span className="block text-[11px] text-white/40">{p.desc}</span>
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <NavLink href="/contact" label="Contact" active={isActive("/contact")} />
              {/* Blog */}
              <NavLink href="/blog" label="Blog" active={isActive("/blog")} />
            </nav>

            {/* CTA + mobile toggle */}
            <div className="flex items-center gap-3">
              <Link
                href="/contact"
                className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold
                           bg-gradient-to-r from-cyan-400 to-blue-500 text-white
                           shadow-[0_0_24px_rgba(34,211,238,0.35)]
                           transition-all duration-200 hover:shadow-[0_0_36px_rgba(34,211,238,0.55)] hover:-translate-y-0.5 active:translate-y-0"
              >
                Get Started
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>

              {/* burger */}
              <button
                onClick={() => setOpen((v) => !v)}
                aria-label="Toggle menu"
                aria-expanded={open}
                className="lg:hidden flex flex-col gap-[5px] p-2.5 rounded-xl bg-white/[0.07] border border-white/10 hover:bg-white/10 transition"
              >
                <span className={`block h-[1.5px] w-5 bg-white rounded-full transition-all duration-300 ${open ? "rotate-45 translate-y-[6.5px]" : ""}`} />
                <span className={`block h-[1.5px] w-5 bg-white rounded-full transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                <span className={`block h-[1.5px] w-5 bg-white rounded-full transition-all duration-300 ${open ? "-rotate-45 -translate-y-[6.5px]" : ""}`} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Drawer ── */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#030712] backdrop-blur-2xl border-b border-white/[0.07] px-6 pb-6 pt-3">
          <div className="flex flex-col gap-1">
            {/* regular links */}
            {navItems.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150
                  ${isActive(it.href)
                    ? "text-white bg-white/10 border border-white/10"
                    : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                  }`}
              >
                {isActive(it.href) && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />}
                {it.label}
              </Link>
            ))}

            {/* packages accordion */}
            <div>
              <button
                onClick={() => setMobilePackagesOpen((v) => !v)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150
                  ${packagesActive
                    ? "text-white bg-white/10 border border-white/10"
                    : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                  }`}
              >
                <span className="flex items-center gap-3">
                  {packagesActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />}
                  Packages
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobilePackagesOpen ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${mobilePackagesOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-white/10 pl-4">
                  {packageItems.map((p) => (
                    <Link
                      key={p.href}
                      href={p.href}
                      onClick={() => { setOpen(false); setMobilePackagesOpen(false); }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150
                        ${pathname === p.href
                          ? "text-white bg-white/10"
                          : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                        }`}
                    >
                      {p.icon}
                      <span>
                        <span className="block font-medium leading-tight">{p.label}</span>
                        <span className="block text-[11px] text-white/40">{p.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* services accordion */}
            <div>
              <button
                onClick={() => setServicesDropdown((v) => !v)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150
                  ${servicesActive
                    ? "text-white bg-white/10 border border-white/10"
                    : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                  }`}
              >
                <span className="flex items-center gap-3">
                  {servicesActive && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />}
                  Services
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesDropdown ? "rotate-180" : ""}`} />
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${servicesDropdown ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="ml-4 mt-1 flex flex-col gap-1 border-l border-white/10 pl-4">
                  {serviceItems.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      onClick={() => { setOpen(false); setServicesDropdown(false); }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150
                        ${pathname?.startsWith(s.href)
                          ? "text-white bg-white/10"
                          : "text-white/60 hover:text-white hover:bg-white/[0.06]"
                        }`}
                    >
                      {s.icon}
                      <span>
                        <span className="block font-medium leading-tight">{s.label}</span>
                        <span className="block text-[11px] text-white/40">{s.desc}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/[0.07]">
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold
                         bg-gradient-to-r from-cyan-400 to-blue-500 text-white
                         shadow-[0_0_20px_rgba(34,211,238,0.25)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] transition"
            >
              Get Started <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

// ── reusable nav link ──────────────────────────────────────
function NavLink({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link
      href={href}
      className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200
        ${active ? "text-white bg-white/10" : "text-white/60 hover:text-white hover:bg-white/[0.07]"}`}
    >
      {label}
      {active && (
        <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-400" />
      )}
    </Link>
  );
}

// ── top strip info ─────────────────────────────────────────
function TopInfo({ icon, text, href }: { icon: React.ReactNode; text: string; href?: string }) {
  const inner = (
    <span className="inline-flex items-center gap-1.5 text-[12px] text-white/50 hover:text-white/80 transition-colors">
      {icon}{text}
    </span>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}

// ── social icons ───────────────────────────────────────────
function SocialIcon({ type, href = "#" }: { type: "instagram" | "facebook" | "twitter"; href?: string }) {
  const icons = {
    instagram: <Instagram className="h-3 w-3" />,
    facebook:  <Facebook  className="h-3 w-3" />,
    twitter:   <Twitter   className="h-3 w-3" />,
  };
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={type}
      className="grid h-6 w-6 place-items-center rounded-full border border-white/10 text-white/40 hover:text-white/80 hover:border-white/20 transition-all duration-150"
    >
      {icons[type]}
    </a>
  );
}
