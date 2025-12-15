// app/admin/layout.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Activity,
  LayoutDashboard,
  Settings,
  Users,
  Menu,
  Sparkles,
  CircleDot,
  LogOut,
  FileText,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Leads", href: "/admin/leads", icon: Users },
  { label: "Clients", href: "/admin/clients", icon: Users },
  { label: "Forms", href: "/admin/forms", icon: Activity },
  // { label: "Blogs", href: "/admin/blogs", icon: FileText },
  { label: "Users", href: "/admin/users", icon: Users },
  // { label: "Settings", href: "/admin/settings", icon: Settings },
];

type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  avatar_url: string | null;
  role: "admin" | "user";
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = useMemo(() => createClient(), []);

  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);

  // ---- Fetch current user + profile
  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      setProfileLoading(true);
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          // not logged in -> kick to login
          if (isMounted) router.push("/auth/login");
          return;
        }

        const { data, error } = await supabase
          .from("profiles")
          .select("id, email, full_name, avatar_url, role")
          .eq("id", user.id)
          .single<Profile>();

        if (error) {
          // fallback with auth user
          if (isMounted) {
            setProfile({
              id: user.id,
              email: user.email ?? null,
              full_name: user.user_metadata?.full_name ?? null,
              avatar_url: user.user_metadata?.avatar_url ?? null,
              role: "admin", // default/fallback
            });
          }
        } else if (isMounted) {
          setProfile(data);
        }
      } finally {
        if (isMounted) setProfileLoading(false);
      }
    }

    void loadProfile();
    return () => {
      isMounted = false;
    };
  }, [supabase, router]);

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      try {
        await fetch("/api/logout", { method: "POST" });
      } catch {
        // ignore
      }
    } finally {
      router.push("/login");
    }
  }

  const displayName =
    profile?.full_name || profile?.email || "Admin User";

  const firstName = displayName.split(" ")[0] || displayName;

  const displayEmail = profile?.email || "admin@brandelo";

  const initials = (() => {
    if (profile?.full_name) {
      const parts = profile.full_name.trim().split(" ");
      if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
      return (
        (parts[0]?.charAt(0) || "") + (parts[1]?.charAt(0) || "")
      ).toUpperCase();
    }
    if (profile?.email) {
      return profile.email.charAt(0).toUpperCase();
    }
    return "BR";
  })();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* FIXED SIDEBAR (desktop) */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-slate-200 bg-white/95 bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.12),transparent_55%),radial-gradient(circle_at_bottom,rgba(52,211,153,0.12),transparent_55%)] shadow-sm backdrop-blur md:flex">
        {/* Brand bar */}
        <div className="flex h-16 items-center gap-3 border-b border-slate-200/80 px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 via-sky-500 to-emerald-400 text-white shadow-md shadow-indigo-300/50">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <p className="text-sm font-semibold tracking-tight">
              Brandelo Admin
            </p>
            <p className="text-[10px] uppercase tracking-[0.26em] text-slate-400">
              Control Center
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all duration-150",
                  active
                    ? "text-slate-900"
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                {active && (
                  <span className="absolute -left-1 top-1/2 h-6 w-1 -translate-y-1/2 rounded-full bg-gradient-to-b from-emerald-400 via-sky-400 to-indigo-400" />
                )}

                <span
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-lg border text-[13px] transition-all duration-150",
                    active
                      ? "border-indigo-200 bg-white text-indigo-600 shadow-sm shadow-indigo-200/80"
                      : "border-slate-200 bg-slate-50 text-slate-500 group-hover:border-slate-300 group-hover:text-slate-700"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span className="truncate">{item.label}</span>
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_0_4px_rgba(16,185,129,0.25)]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer / user info */}
        <div className="border-t border-slate-200/80 px-4 py-3 text-xs bg-white/80 backdrop-blur">
          <p className="mb-1 flex items-center gap-1 text-[10px] uppercase tracking-[0.26em] text-slate-400">
            <CircleDot className="h-3 w-3 text-emerald-500" />
            {profileLoading ? "Loading user…" : "Signed in"}
          </p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium truncate max-w-[140px]">
                {displayName}
              </p>
              <p className="text-[11px] text-slate-500 truncate max-w-[160px]">
                {displayEmail}
              </p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-emerald-400 text-xs font-semibold text-white">
              {initials}
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN AREA with left padding for fixed sidebar */}
      <div className="md:pl-64 flex min-h-screen">
        {/* Sidebar - Mobile Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-40 flex md:hidden">
            <div
              className="fixed inset-0 bg-black/30"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative z-50 flex w-64 flex-col border-r border-slate-200 bg-white shadow-lg">
              <div className="flex h-16 items-center justify-between border-b border-slate-200 px-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-sky-500 to-emerald-400 text-[11px] font-semibold text-white">
                    {initials}
                  </div>
                  <span className="text-sm font-semibold">
                    Brandelo Admin
                  </span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="text-xs text-slate-500 hover:text-slate-900"
                >
                  Close
                </button>
              </div>
              <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
                {navItems.map((item) => {
                  const active = pathname.startsWith(item.href);
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        active
                          ? "bg-indigo-50 text-indigo-700 border border-indigo-100"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      )}
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-md border border-slate-200 bg-slate-50 text-slate-500">
                        <Icon className="h-4 w-4" />
                      </span>
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main content column */}
        <div className="flex flex-1 flex-col">
          {/* Topbar */}
          <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 shadow-sm backdrop-blur md:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                className="inline-flex items-center justify-center rounded-md border border-slate-200 bg-white px-2 py-1 text-xs text-slate-600 shadow-sm hover:bg-slate-50 md:hidden"
              >
                <Menu className="mr-1 h-3.5 w-3.5" />
                Menu
              </button>
              <div>
                <p className="text-[10px] uppercase tracking-[0.32em] text-slate-400">
                  Brandelo Admin
                </p>
                <p className="text-sm font-medium">
                  {profileLoading ? (
                    "Loading user…"
                  ) : (
                    <>
                      Welcome back,{" "}
                      <span className="text-indigo-600 font-semibold">
                        {firstName}
                      </span>{" "}
                      👋
                    </>
                  )}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-600 md:flex">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>All systems normal</span>
              </div>

              {/* small user chip on topbar */}
              <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1 text-[11px] text-slate-600 md:flex">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-emerald-400 text-[10px] font-semibold text-white">
                  {initials}
                </div>
                <span className="max-w-[120px] truncate">{displayName}</span>
              </div>

              {/* Logout button */}
              <Button
                size="sm"
                variant="outline"
                className="h-8 gap-1 rounded-full border-slate-200 bg-white text-[11px] text-slate-700 hover:bg-slate-50"
                onClick={() => void handleLogout()}
              >
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </Button>
            </div>
          </header>

          {/* Page content */}
          <main className="flex-1 bg-slate-50 px-3 py-4 md:px-6 md:py-6">
            <div className="mx-auto max-w-6xl rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
