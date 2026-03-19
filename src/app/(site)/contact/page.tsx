"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight, Mail, Phone, MapPin, CheckCircle,
  ChevronDown, Clock, MessageCircle,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

const SERVICES = [
  "SEO", "Social Media Marketing", "PPC / Performance Marketing",
  "Content Marketing", "Website Development", "App Development", "Branding",
];

const COUNTRIES = [
  "India", "United States", "United Kingdom", "United Arab Emirates",
  "Canada", "Australia", "Singapore", "Germany", "France",
  "Saudi Arabia", "Qatar", "Kuwait", "Malaysia", "Nepal", "Other",
];

/* ── Scrolling marquee ── */
function Marquee() {
  const chunk = "Flaunt Your Brand Loud  ·  ";
  const row = chunk.repeat(12);
  return (
    <div className="overflow-hidden bg-[#0b0b0b] py-5 select-none">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
      >
        {[row, row].map((r, i) => (
          <span key={i} className="text-[clamp(20px,3vw,36px)] font-black uppercase tracking-tight pr-8 text-white/80">
            {r}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Form field label ── */
function FieldLabel({ label, required }: { label: string; required?: boolean }) {
  return (
    <label className="block text-[10px] font-bold uppercase tracking-[0.18em] text-black/40 mb-2">
      {label}{required && <span className="text-red-400 ml-0.5">*</span>}
    </label>
  );
}

const inputCls = `
  w-full rounded-xl border border-black/10 bg-[#F7F7F7] px-4 py-3.5 text-sm text-[#0e0e0e]
  placeholder:text-black/25 outline-none focus:border-black/30 focus:bg-white
  focus:ring-2 focus:ring-black/6 transition-all duration-200
`.trim();

/* ── Contact info row ── */
function InfoRow({ icon, label, value, href }: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-start gap-3 group">
      <div className="mt-0.5 flex-shrink-0 h-9 w-9 rounded-full bg-white/10 grid place-items-center text-white/60 group-hover:text-white group-hover:bg-white/20 transition-all">
        {icon}
      </div>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-0.5">{label}</p>
        <p className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : <div>{inner}</div>;
}

export default function ContactPage() {
  const supabase = useMemo(() => createClient(), []);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg(null);
    if (!firstName || !email || !phone || !service) {
      setErrorMsg("Please fill all required fields.");
      return;
    }
    setSubmitting(true);
    try {
      const fullName = `${firstName} ${lastName}`.trim();
      const { error } = await supabase.from("form_submissions").insert({
        form_key: "contact_project_inquiry",
        form_title: "Contact — Project Inquiry",
        status: "new",
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        full_name: fullName,
        email: email.trim(),
        phone: phone.trim(),
        service,
        message: message.trim(),
        payload: { company, city, country, newsletter, source: "contact_page" },
      });
      if (error) { setErrorMsg("Something went wrong. Please try again."); return; }
      setSent(true);
      setFirstName(""); setLastName(""); setEmail(""); setCompany("");
      setPhone(""); setService(""); setCity(""); setCountry(""); setMessage("");
    } catch {
      setErrorMsg("Unexpected error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-white text-[#0e0e0e]">

      {/* ── Dark hero strip ── */}
      <section className="relative bg-[#0b0b0b] overflow-hidden">
        {/* Gradient blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/4 w-[500px] h-[300px] rounded-full bg-indigo-600/12 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full bg-emerald-600/12 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 pt-28 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Get In Touch</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
            className="text-[clamp(40px,7vw,88px)] font-black leading-[0.95] tracking-tight text-white max-w-4xl"
          >
            Fill out the form and tell us about your{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-emerald-400 bg-clip-text text-transparent italic">
              vision.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="mt-7 text-lg text-white/40 max-w-lg leading-relaxed"
          >
            Whether you&apos;re launching, scaling, or rebranding — we&apos;re here to make it extraordinary.
          </motion.p>
        </div>

        {/* Marquee at bottom of hero */}
        <Marquee />
      </section>

      {/* ── Main Content ── */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_0.85fr] gap-12 lg:gap-16 items-start">

          {/* ── LEFT: Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.1 }}
            className="bg-white border border-black/8 rounded-3xl p-8 sm:p-10 shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/35 mb-2">
              Project Inquiry
            </p>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0e0e0e] mb-1 leading-tight">
              Let&apos;s build something great together.
            </h2>
            <p className="text-sm text-black/40 mb-8">We usually respond within 1 business day.</p>

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-5 py-16 text-center"
                >
                  <div className="h-16 w-16 rounded-full bg-emerald-50 grid place-items-center">
                    <CheckCircle className="w-9 h-9 text-emerald-500" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[#0e0e0e] mb-1">Message received!</h3>
                    <p className="text-sm text-black/45 max-w-xs">We&apos;ll review your project and get back to you shortly.</p>
                  </div>
                  <button onClick={() => setSent(false)} className="mt-2 text-xs font-semibold underline underline-offset-2 text-black/35 hover:text-black/60 transition-colors">
                    Submit another enquiry
                  </button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <FieldLabel label="First Name" required />
                    <input className={inputCls} placeholder="Rahul" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                  </div>
                  <div>
                    <FieldLabel label="Last Name" />
                    <input className={inputCls} placeholder="Sharma" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                  </div>

                  {/* Email */}
                  <div>
                    <FieldLabel label="Work Email" required />
                    <input type="email" className={inputCls} placeholder="rahul@company.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                  </div>

                  {/* Company */}
                  <div>
                    <FieldLabel label="Company Name" />
                    <input className={inputCls} placeholder="Acme Inc." value={company} onChange={(e) => setCompany(e.target.value)} />
                  </div>

                  {/* Phone */}
                  <div>
                    <FieldLabel label="Phone Number" required />
                    <input type="tel" className={inputCls} placeholder="+91 98765 43210" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>

                  {/* Service */}
                  <div>
                    <FieldLabel label="Service" required />
                    <div className="relative">
                      <select value={service} onChange={(e) => setService(e.target.value)} className={`${inputCls} appearance-none pr-10 cursor-pointer`}>
                        <option value="" disabled>Select a service</option>
                        {SERVICES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/35" />
                    </div>
                  </div>

                  {/* City */}
                  <div>
                    <FieldLabel label="City" />
                    <input className={inputCls} placeholder="Delhi" value={city} onChange={(e) => setCity(e.target.value)} />
                  </div>

                  {/* Country */}
                  <div>
                    <FieldLabel label="Country" />
                    <div className="relative">
                      <select value={country} onChange={(e) => setCountry(e.target.value)} className={`${inputCls} appearance-none pr-10 cursor-pointer`}>
                        <option value="" disabled>Select country</option>
                        {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/35" />
                    </div>
                  </div>

                  {/* Message — full width */}
                  <div className="sm:col-span-2">
                    <FieldLabel label="Tell us about your project" required />
                    <textarea rows={5} className={`${inputCls} resize-none`} placeholder="Goals, target audience, timeline, rough budget…" value={message} onChange={(e) => setMessage(e.target.value)} />
                  </div>

                  {/* Newsletter */}
                  <div className="sm:col-span-2 flex items-start gap-3 py-1">
                    <input id="nl" type="checkbox" checked={newsletter} onChange={(e) => setNewsletter(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-black/15 accent-black cursor-pointer flex-shrink-0" />
                    <label htmlFor="nl" className="text-xs text-black/40 cursor-pointer leading-relaxed">
                      Get brand growth tips and industry insights — no spam, unsubscribe anytime.
                    </label>
                  </div>

                  {errorMsg && <p className="sm:col-span-2 text-xs text-red-500 bg-red-50 rounded-lg px-4 py-2.5">{errorMsg}</p>}

                  {/* Submit */}
                  <div className="sm:col-span-2 flex items-center justify-between gap-4 pt-1 border-t border-black/6">
                    <p className="text-xs text-black/30">Your data is safe with us.</p>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="group inline-flex items-center gap-2.5 rounded-full bg-[#0e0e0e] text-white text-sm font-bold px-7 py-3.5 hover:bg-black/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-black/15"
                    >
                      {submitting ? "Sending…" : "Submit Project"}
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── RIGHT: Contact panel ── */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: EASE, delay: 0.2 }}
            className="lg:sticky lg:top-8 flex flex-col gap-5"
          >
            {/* Dark brand story card */}
            <div className="bg-[#0b0b0b] rounded-3xl p-8 lg:p-9 overflow-hidden relative">
              {/* bg orb */}
              <div className="pointer-events-none absolute -top-10 -right-10 w-52 h-52 rounded-full bg-indigo-600/15 blur-[60px]" />

              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-5">
                Why Brandelo?
              </p>
              <h2 className="text-2xl font-black text-white leading-tight mb-5">
                We don&apos;t just work with clients — we embark on <span className="italic text-white/50">creative journeys</span> together.
              </h2>
              <p className="text-sm text-white/45 leading-relaxed mb-7">
                We take your ideas, shape them to perfection, and turn them into campaigns that are impossible to ignore. Bold strategy meets stunning execution — every single time.
              </p>

              {/* Divider */}
              <div className="border-t border-white/8 mb-7" />

              <div className="flex flex-col gap-5">
                <InfoRow icon={<Mail className="h-4 w-4" />} label="Email" value="info@brandelo.com" href="mailto:info@brandelo.com" />
                <InfoRow icon={<Phone className="h-4 w-4" />} label="Phone" value="+91 96252 29696" href="tel:+919625229696" />
                <InfoRow icon={<MapPin className="h-4 w-4" />} label="Office" value="Sector 63, Noida, UP — India" />
                <InfoRow icon={<Clock className="h-4 w-4" />} label="Hours" value="Mon – Fri · 10 AM – 7 PM IST" />
              </div>

              <a
                href="mailto:info@brandelo.com"
                className="group mt-8 inline-flex items-center gap-2 rounded-full border border-white/15 text-white text-sm font-semibold px-5 py-2.5 hover:bg-white/10 transition-all"
              >
                Send an Email <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

            {/* WhatsApp card */}
            <a
              href="https://wa.me/919625229696"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 bg-[#22C55E]/8 border border-[#22C55E]/20 rounded-2xl px-6 py-5 hover:bg-[#22C55E]/12 transition-all"
            >
              <div className="h-10 w-10 rounded-full bg-[#22C55E] grid place-items-center flex-shrink-0 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#0e0e0e]">Chat on WhatsApp</p>
                <p className="text-xs text-black/45">Fastest response · Usually replies in minutes</p>
              </div>
              <ArrowRight className="h-4 w-4 text-black/30 group-hover:translate-x-0.5 transition-transform" />
            </a>

            {/* Live indicator */}
            <div className="flex items-center gap-4 bg-[#F7F7F7] border border-black/7 rounded-2xl px-6 py-5">
              <span className="relative flex-shrink-0 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
              </span>
              <div>
                <p className="text-sm font-bold text-[#0e0e0e]">We&apos;re actively responding</p>
                <p className="text-xs text-black/40">Mon–Fri · 10 AM–7 PM IST · Reply within 1 business day</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
