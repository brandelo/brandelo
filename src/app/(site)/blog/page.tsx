"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Clock, Tag, Search } from "lucide-react";
import Link from "next/link";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type Category = "All" | "SEO" | "Marketing" | "Branding" | "Technology" | "Design";

type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: Exclude<Category, "All">;
  cover: string;
  author: string;
  authorAvatar: string;
  date: string;
  readTime: string;
  featured?: boolean;
};

const POSTS: Post[] = [
  {
    id: "p1",
    slug: "how-to-rank-1-on-google-in-2024",
    title: "How to Rank #1 on Google in 2025: A Complete SEO Playbook",
    excerpt:
      "SEO has changed dramatically. Forget keyword stuffing — modern rankings are won through topic authority, E-E-A-T signals, and technical excellence. Here's what actually works.",
    category: "SEO",
    cover: "https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?q=80&w=1200&auto=format&fit=crop",
    author: "Shaurya Sarin",
    authorAvatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=100&auto=format&fit=crop",
    date: "Mar 15, 2025",
    readTime: "9 min read",
    featured: true,
  },
  {
    id: "p2",
    slug: "meta-ads-roas-guide",
    title: "Meta Ads in 2025: How to Hit 5x ROAS Without a Huge Budget",
    excerpt:
      "Most brands waste money on Meta Ads because they target wrong or creatives don't convert. This guide breaks down the exact framework we use to scale D2C brands profitably.",
    category: "Marketing",
    cover: "https://images.unsplash.com/photo-1611926653458-09294b3142bf?q=80&w=800&auto=format&fit=crop",
    author: "Shaurya Sarin",
    authorAvatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=100&auto=format&fit=crop",
    date: "Mar 10, 2025",
    readTime: "7 min read",
  },
  {
    id: "p3",
    slug: "brand-identity-mistakes",
    title: "7 Brand Identity Mistakes That Are Killing Your Business (And How to Fix Them)",
    excerpt:
      "Your brand is more than a logo. These common mistakes confuse your audience and cost you conversions — and most founders don't even realise they're making them.",
    category: "Branding",
    cover: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
    author: "Shaurya Sarin",
    authorAvatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=100&auto=format&fit=crop",
    date: "Mar 5, 2025",
    readTime: "6 min read",
  },
  {
    id: "p4",
    slug: "nextjs-website-speed",
    title: "Why Your Website's Speed Is Destroying Your SEO (And What To Do)",
    excerpt:
      "Google's Core Web Vitals are now a confirmed ranking factor. A slow site isn't just annoying — it's costing you rankings and revenue. Here's how to fix it with Next.js.",
    category: "Technology",
    cover: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
    author: "Shaurya Sarin",
    authorAvatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=100&auto=format&fit=crop",
    date: "Feb 28, 2025",
    readTime: "8 min read",
  },
  {
    id: "p5",
    slug: "ui-ux-conversion-tips",
    title: "10 UI/UX Tweaks That Double Your Website Conversion Rate",
    excerpt:
      "Small design changes can have massive conversion impact. These are the exact micro-improvements we make on client sites that consistently move the needle.",
    category: "Design",
    cover: "https://images.unsplash.com/photo-1559028006-448665bd7c7f?q=80&w=800&auto=format&fit=crop",
    author: "Shaurya Sarin",
    authorAvatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=100&auto=format&fit=crop",
    date: "Feb 20, 2025",
    readTime: "5 min read",
  },
  {
    id: "p6",
    slug: "content-marketing-strategy-2025",
    title: "The Only Content Marketing Strategy You Need in 2025",
    excerpt:
      "Content marketing doesn't mean writing 50 blog posts and hoping. It means building a system that attracts, educates, and converts. Here's the full playbook.",
    category: "Marketing",
    cover: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=800&auto=format&fit=crop",
    author: "Shaurya Sarin",
    authorAvatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=100&auto=format&fit=crop",
    date: "Feb 14, 2025",
    readTime: "10 min read",
  },
  {
    id: "p7",
    slug: "local-seo-guide-india",
    title: "Local SEO for Indian Businesses: Dominate 'Near Me' Searches",
    excerpt:
      "If you run a local business in India and aren't showing up in Google Maps, you're invisible. Here's the exact step-by-step to fix your local presence.",
    category: "SEO",
    cover: "https://images.unsplash.com/photo-1526958097901-5e6d742d3371?q=80&w=800&auto=format&fit=crop",
    author: "Shaurya Sarin",
    authorAvatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=100&auto=format&fit=crop",
    date: "Feb 8, 2025",
    readTime: "7 min read",
  },
  {
    id: "p8",
    slug: "logo-design-psychology",
    title: "Logo Design Psychology: Why Colours and Shapes Change Everything",
    excerpt:
      "The psychology behind brand visuals is fascinating and powerful. Here's how top brands use colour, shape, and typography to trigger emotion and build trust.",
    category: "Branding",
    cover: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
    author: "Shaurya Sarin",
    authorAvatar: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=100&auto=format&fit=crop",
    date: "Jan 30, 2025",
    readTime: "6 min read",
  },
];

const CATEGORIES: Category[] = ["All", "SEO", "Marketing", "Branding", "Technology", "Design"];

const CATEGORY_COLORS: Record<string, string> = {
  SEO: "bg-emerald-500",
  Marketing: "bg-pink-500",
  Branding: "bg-orange-500",
  Technology: "bg-indigo-500",
  Design: "bg-teal-500",
};

/* ── Scrolling marquee ── */
function Marquee() {
  const chunk = "Marketing Tips  ·  Brand Insights  ·  Growth Strategies  ·  ";
  const row = chunk.repeat(8);
  return (
    <div className="overflow-hidden bg-[#0b0b0b] py-5 select-none border-t border-white/5">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      >
        {[row, row].map((r, i) => (
          <span key={i} className="text-[clamp(16px,2.5vw,28px)] font-black uppercase tracking-tight pr-8 text-white/30">
            {r}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ── Featured post card ── */
function FeaturedCard({ post }: { post: Post }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: EASE }}
      className="group relative grid md:grid-cols-2 gap-0 bg-white rounded-3xl overflow-hidden border border-black/8 hover:border-black/20 shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
    >
      {/* Cover */}
      <div className="relative h-64 md:h-auto overflow-hidden">
        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
        />
        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-white text-[11px] font-bold uppercase tracking-wide ${CATEGORY_COLORS[post.category]}`}>
          {post.category}
        </div>
        <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-amber-400 text-black text-[11px] font-bold uppercase tracking-wide">
          Featured
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col justify-between p-8 lg:p-10">
        <div>
          <div className="flex items-center gap-3 text-xs text-black/40 font-medium mb-4">
            <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" />{post.readTime}</span>
            <span>·</span>
            <span>{post.date}</span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-black tracking-tight leading-tight text-[#0e0e0e] mb-4 group-hover:text-black/80 transition-colors">
            {post.title}
          </h2>
          <p className="text-sm text-black/55 leading-relaxed line-clamp-3">{post.excerpt}</p>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={post.authorAvatar} alt={post.author} className="w-8 h-8 rounded-full object-cover border border-black/10" />
            <span className="text-sm font-semibold text-[#0e0e0e]">{post.author}</span>
          </div>
          <div className="flex items-center gap-1.5 text-sm font-bold text-black/30 group-hover:text-black/70 transition-colors">
            Read Article <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Blog card ── */
function BlogCard({ post, index }: { post: Post; index: number }) {
  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group bg-white rounded-3xl overflow-hidden border border-black/8 hover:border-black/20 transition-all duration-300 cursor-pointer hover:shadow-lg flex flex-col"
    >
      {/* Cover */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={post.cover}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
          loading="lazy"
        />
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-white text-[10px] font-bold uppercase tracking-wide ${CATEGORY_COLORS[post.category]}`}>
          {post.category}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-3 text-[11px] text-black/35 font-medium">
          <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{post.readTime}</span>
          <span>·</span>
          <span>{post.date}</span>
        </div>
        <h3 className="font-bold text-base tracking-tight leading-snug text-[#0e0e0e] group-hover:text-black/75 transition-colors line-clamp-2">
          {post.title}
        </h3>
        <p className="text-xs text-black/45 leading-relaxed line-clamp-2 flex-1">{post.excerpt}</p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-black/5">
          <div className="flex items-center gap-2">
            <img src={post.authorAvatar} alt={post.author} className="w-6 h-6 rounded-full object-cover border border-black/10" />
            <span className="text-xs font-semibold text-black/50">{post.author}</span>
          </div>
          <span className="flex items-center gap-1 text-xs font-bold text-black/25 group-hover:text-black/60 transition-colors">
            Read <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [search, setSearch] = useState("");

  const featured = POSTS.find((p) => p.featured);
  const rest = useMemo(() => {
    return POSTS.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = search.trim() === "" || p.title.toLowerCase().includes(search.toLowerCase()) || p.category.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch && !p.featured;
    });
  }, [activeCategory, search]);

  const showFeatured = !featured ? false : (activeCategory === "All" && search.trim() === "");

  return (
    <div className="min-h-screen bg-white text-[#0e0e0e]">

      {/* ── Dark Hero ── */}
      <section className="relative bg-[#0b0b0b] overflow-hidden">
        {/* Gradient orbs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/3 w-[600px] h-[300px] rounded-full bg-violet-600/10 blur-[130px]" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[250px] rounded-full bg-cyan-600/10 blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pt-28 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-4 py-2 backdrop-blur mb-8"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-white/55">Brandelo Blog</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.08 }}
            className="text-[clamp(36px,6vw,80px)] font-black leading-[0.95] tracking-tight text-white max-w-4xl"
          >
            Insights on{" "}
            <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent italic">
              Marketing,
            </span>{" "}
            Branding & Growth.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.2 }}
            className="mt-6 text-base sm:text-lg text-white/40 max-w-xl leading-relaxed"
          >
            Actionable strategies, real-world case studies, and expert tips to grow your brand online — written by the Brandelo team.
          </motion.p>
        </div>

        <Marquee />
      </section>

      {/* ── Filters + Search ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          {/* Category Pills */}
          <div className="w-full sm:w-auto overflow-x-auto pb-1">
            <div className="flex gap-2 w-max">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 whitespace-nowrap border ${
                    activeCategory === cat
                      ? "bg-[#0e0e0e] text-white border-[#0e0e0e] shadow-sm"
                      : "bg-white text-black/50 border-black/10 hover:text-black hover:border-black/20"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-black/30" />
            <input
              type="text"
              placeholder="Search articles…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-black/10 bg-[#F7F7F7] text-sm placeholder:text-black/30 outline-none focus:border-black/30 focus:bg-white transition-all duration-200"
            />
          </div>
        </div>
      </section>

      {/* ── Blog Content ── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 pb-24">

        {/* Featured post */}
        <AnimatePresence>
          {showFeatured && featured && (
            <motion.div
              className="mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FeaturedCard post={featured} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Post grid */}
        {rest.length > 0 ? (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {rest.map((post, i) => (
                <BlogCard key={post.id} post={post} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4 py-24 text-center"
          >
            <div className="text-5xl">🔍</div>
            <p className="text-xl font-bold text-black/40">No articles found</p>
            <p className="text-sm text-black/30">Try a different search or category.</p>
            <button
              onClick={() => { setActiveCategory("All"); setSearch(""); }}
              className="mt-2 px-5 py-2 rounded-full border border-black/10 text-sm font-semibold text-black/50 hover:text-black hover:border-black/20 transition-all"
            >
              Clear filters
            </button>
          </motion.div>
        )}
      </section>

      {/* ── Newsletter CTA ── */}
      <section className="bg-[#0b0b0b] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 right-0 w-[500px] h-[300px] rounded-full bg-violet-600/10 blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[200px] rounded-full bg-cyan-600/8 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-20 lg:py-28">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/40 mb-8"
            >
              <Tag className="h-3 w-3" /> Newsletter
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight mb-4"
            >
              Get the best marketing insights{" "}
              <span className="italic text-white/40">in your inbox.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-white/40 text-base mb-10"
            >
              Join 5,000+ marketers and founders getting weekly tips on SEO, Ads, Branding, and Growth.
            </motion.p>
            <motion.form
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.14 }}
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-5 py-3.5 rounded-full bg-white/8 border border-white/10 text-white text-sm placeholder:text-white/25 outline-none focus:border-white/25 focus:bg-white/12 transition-all"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white text-black text-sm font-bold hover:bg-white/90 transition-all shadow-lg shadow-black/20"
              >
                Subscribe <ArrowRight className="h-4 w-4" />
              </button>
            </motion.form>
            <p className="mt-4 text-xs text-white/25">No spam, ever. Unsubscribe any time.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
