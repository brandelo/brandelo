// src/app/admin/dashboard/page.tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowDownRight,
  ArrowUpRight,
  Activity,
  Users,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/server"; // your async server client

type Lead = {
  id: string;
  full_name: string;
  email: string | null;
  phone: string | null;
  source: string | null;
  status: string;
  created_at: string;
};

type Submission = {
  id: string;
  form_key: string;
  form_title: string | null;
  status: string;
  submitted_at: string;
};

export default async function DashboardPage() {
  // IMPORTANT: your createClient is async
  const supabase = await createClient();

  // ---- Aggregated data + lists ----
  const [
    leadsAgg,
    activeClientsAgg,
    openFormsAgg,
    publishedPostsAgg,
    recentLeadsRes,
    recentSubmissionsRes,
  ] = await Promise.all([
    supabase.from("leads").select("*", { count: "exact", head: true }),
    supabase
      .from("clients")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
    supabase
      .from("form_submissions")
      .select("*", { count: "exact", head: true })
      .in("status", ["new", "reviewed"]),
    supabase
      .from("blog_posts")
      .select("*", { count: "exact", head: true })
      .eq("status", "published"),
    supabase
      .from("leads")
      .select("id, full_name, email, phone, source, status, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("form_submissions")
      .select("id, form_key, form_title, status, submitted_at")
      .order("submitted_at", { ascending: false })
      .limit(5),
  ]);

  const totalLeads = leadsAgg.count ?? 0;
  const activeClients = activeClientsAgg.count ?? 0;
  const openForms = openFormsAgg.count ?? 0;
  const publishedPosts = publishedPostsAgg.count ?? 0;

  const recentLeads = (recentLeadsRes.data as Lead[]) ?? [];
  const recentSubmissions = (recentSubmissionsRes.data as Submission[]) ?? [];

  return (
    <div className="space-y-6">
      {/* Header + Actions */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
            Overview
          </h1>
          <p className="text-xs text-muted-foreground md:text-sm">
            Quick snapshot of what&apos;s happening in Brandelo today ✨
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {/* <Button variant="outline" size="sm" className="rounded-full">
            Download report
          </Button> */}
          {/* <Button
            size="sm"
            className="rounded-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-400 text-xs font-semibold text-slate-950 shadow-md shadow-indigo-500/40 hover:opacity-90"
          >
            + New item
          </Button> */}
        </div>
      </div>

      {/* Stat cards */}
      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total leads"
          value={totalLeads.toString()}
          trend="+12.4%"
          trendType="up"
          icon={Users}
          helper="All time"
        />
        <StatCard
          label="Active clients"
          value={activeClients.toString()}
          trend="+3.1%"
          trendType="up"
          icon={Activity}
          helper="Currently active"
        />
        <StatCard
          label="Open form submissions"
          value={openForms.toString()}
          trend="+8.1%"
          trendType="up"
          icon={CreditCard}
          helper="New + reviewed"
        />
        <StatCard
          label="Published blog posts"
          value={publishedPosts.toString()}
          trend="+1 this week"
          trendType="up"
          icon={TrendingUp}
          helper="Public content"
        />
      </section>

      {/* Middle: chart + recent form submissions */}
      <section className="grid gap-4 lg:grid-cols-3">
        {/* Fake chart card (pure CSS bars) */}
        <Card className="lg:col-span-2 border-slate-200 bg-gradient-to-b from-indigo-50 via-sky-50 to-emerald-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <div>
              <CardTitle className="flex items-center gap-2 text-sm font-medium text-slate-900">
                Traffic overview
                <Badge
                  variant="outline"
                  className="h-5 rounded-full border-indigo-200 bg-white/80 px-2 text-[10px] font-normal text-indigo-600"
                >
                  Live
                </Badge>
              </CardTitle>
              <CardDescription className="text-xs text-slate-600">
                Visitors & engagement across the last 12 days.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white/80 px-2 py-1 md:inline-flex">
                <span className="h-1.5 w-6 rounded-full bg-gradient-to-r from-indigo-400 to-emerald-400" />
                Sessions
              </span>
              <select className="h-8 rounded-full border border-slate-200 bg-white/90 px-2 text-[11px] outline-none">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>This year</option>
              </select>
            </div>
          </CardHeader>
          <CardContent>
            {/* Bars */}
            <div className="mt-1 flex h-44 items-end gap-2 md:gap-3">
              {[
                30, 45, 38, 60, 75, 50, 90, 70, 55, 80, 95, 65,
              ].map((h, idx) => (
                <div key={idx} className="flex flex-1 flex-col gap-1">
                  <div
                    className="rounded-t-xl bg-gradient-to-t from-indigo-500 via-sky-500 to-emerald-400 shadow-[0_0_16px_rgba(56,189,248,0.45)] transition-transform hover:-translate-y-1"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-center text-[10px] text-slate-500">
                    {idx % 2 === 0 ? `D${idx + 1}` : ""}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-600">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                <span>Calm</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
                <span>Focus</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span>Peak energy</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent form submissions */}
        <Card className="border-slate-200 bg-white">
          <CardHeader className="space-y-1 pb-3">
            <CardTitle className="text-sm font-medium">
              Recent form submissions
            </CardTitle>
            <CardDescription className="text-xs">
              Website & landing pages se aayi latest entries.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentSubmissions.length === 0 && (
              <p className="text-xs text-muted-foreground">
                No Form Submitted Yet.
              </p>
            )}

            {recentSubmissions.map((s) => (
              <ActivityItem
                key={s.id}
                title={s.form_title || s.form_key}
                description={`Status: ${s.status}`}
                time={formatDateTime(s.submitted_at)}
                type={mapFormStatusToActivityType(s.status)}
              />
            ))}
          </CardContent>
        </Card>
      </section>

      {/* Recent leads table / cards */}
      <section>
        <Card className="border-slate-200 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <div className="space-y-1">
              <CardTitle className="text-sm font-medium">
                Latest leads
              </CardTitle>
              <CardDescription className="text-xs">
                Fresh leads captured from all sources.
              </CardDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 text-[11px] text-slate-500 hover:text-slate-900"
            >
              View all →
            </Button>
          </CardHeader>

          <CardContent>
            {/* DESKTOP / TABLET: TABLE VIEW */}
            <div className="hidden md:block overflow-x-auto">
              <Table className="min-w-[720px]">
                <TableCaption className="text-[11px] text-muted-foreground">
                  Lead data powered by your Supabase tables.
                </TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[260px]">Lead</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Created
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentLeads.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8 border border-slate-200">
                            <AvatarFallback className="bg-slate-100 text-[11px] text-slate-700">
                              {getInitials(row.full_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="space-y-0.5">
                            <p className="text-xs font-medium md:text-sm">
                              {row.full_name}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                              ID: #{row.id.slice(0, 8)}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="align-middle text-xs">
                        <div className="space-y-0.5">
                          <p>{row.email || "—"}</p>
                          <p className="text-[11px] text-muted-foreground">
                            {row.phone || ""}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell className="align-middle text-xs capitalize">
                        <Badge
                          variant="outline"
                          className="rounded-full border-slate-200 bg-slate-50 text-[11px]"
                        >
                          {row.source || "unknown"}
                        </Badge>
                      </TableCell>
                      <TableCell className="align-middle text-xs">
                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-full border px-2 py-0 text-[11px] capitalize",
                            getLeadStatusColor(row.status)
                          )}
                        >
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden align-middle text-[11px] text-muted-foreground md:table-cell">
                        {formatDateTime(row.created_at)}
                      </TableCell>
                      <TableCell className="align-middle text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 rounded-full border-slate-200 text-[11px]"
                        >
                          Open
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}

                  {recentLeads.length === 0 && (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="py-6 text-center text-xs text-muted-foreground"
                      >
                        No Leads Yet – First Pick the data from Forms
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* MOBILE: CARD LIST VIEW */}
            <div className="block md:hidden">
              {recentLeads.length === 0 ? (
                <p className="py-4 text-center text-xs text-muted-foreground">
                  No Leads Yet – First Pick the data from Forms
                </p>
              ) : (
                <div className="space-y-3">
                  {recentLeads.map((row) => (
                    <div
                      key={row.id}
                      className="rounded-lg border border-slate-200 bg-slate-50 p-3 text-[13px]"
                    >
                      {/* Top: avatar + name + status */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8 border border-slate-200">
                            <AvatarFallback className="bg-slate-100 text-[11px] text-slate-700">
                              {getInitials(row.full_name)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {row.full_name}
                            </p>
                            <p className="text-[10px] text-muted-foreground">
                              ID: #{row.id.slice(0, 8)}
                            </p>
                          </div>
                        </div>

                        <Badge
                          variant="outline"
                          className={cn(
                            "rounded-full border px-2 py-0 text-[10px] capitalize",
                            getLeadStatusColor(row.status)
                          )}
                        >
                          {row.status}
                        </Badge>
                      </div>

                      {/* Contact + source + date */}
                      <div className="mt-2 space-y-1.5 text-[12px] text-slate-700">
                        <div className="space-y-0.5">
                          <div className="truncate">
                            <span className="font-medium text-slate-900">
                              Email:
                            </span>{" "}
                            {row.email || "—"}
                          </div>
                          {row.phone && (
                            <div className="truncate">
                              <span className="font-medium text-slate-900">
                                Phone:
                              </span>{" "}
                              {row.phone}
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <Badge
                            variant="outline"
                            className="rounded-full border-slate-200 bg-white text-[10px] capitalize"
                          >
                            {row.source || "unknown"}
                          </Badge>
                          <span className="text-[10px] text-muted-foreground">
                            {formatDateTime(row.created_at)}
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-3 flex justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 rounded-full border-slate-200 px-3 text-[11px]"
                        >
                          Open
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <p className="mt-3 text-center text-[11px] text-muted-foreground">
                Lead data powered by your Supabase tables.
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

/* ----------------- Small components & helpers ----------------- */

type StatCardProps = {
  label: string;
  value: string;
  trend: string;
  trendType: "up" | "down";
  helper: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
};

function StatCard({
  label,
  value,
  trend,
  trendType,
  helper,
  icon: Icon,
}: StatCardProps) {
  const isUp = trendType === "up";
  return (
    <Card className="border-slate-200 bg-white shadow-sm transition-colors hover:border-indigo-200">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-[0.17em]">
          {label}
        </CardTitle>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-50 text-indigo-500">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-end justify-between gap-2">
          <div className="space-y-1">
            <p className="text-lg font-semibold text-slate-900 md:text-xl">
              {value}
            </p>
            <p className="text-[11px] text-muted-foreground">{helper}</p>
          </div>
          <div
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px]",
              isUp
                ? "bg-emerald-50 text-emerald-600"
                : "bg-rose-50 text-rose-600"
            )}
          >
            {isUp ? (
              <ArrowUpRight className="h-3 w-3" />
            ) : (
              <ArrowDownRight className="h-3 w-3" />
            )}
            <span>{trend}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

type ActivityType = "success" | "info" | "warning" | "neutral";

type ActivityItemProps = {
  title: string;
  description: string;
  time: string;
  type: ActivityType;
};

function ActivityItem({ title, description, time, type }: ActivityItemProps) {
  const color =
    type === "success"
      ? "bg-emerald-500"
      : type === "info"
      ? "bg-sky-500"
      : type === "warning"
      ? "bg-amber-500"
      : "bg-slate-400";

  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={cn("h-2 w-2 rounded-full", color)} />
          <p className="font-medium text-slate-900">{title}</p>
        </div>
        <span className="text-[10px] text-muted-foreground">{time}</span>
      </div>
      <p className="mt-1 text-[11px] text-muted-foreground">{description}</p>
    </div>
  );
}

/* ----------------- helper fns ----------------- */

function formatDateTime(value: string) {
  try {
    return new Date(value).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  } catch {
    return value;
  }
}

function getInitials(name: string) {
  if (!name) return "LD";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function getLeadStatusColor(status: string) {
  switch (status) {
    case "new":
      return "border-sky-200 bg-sky-50 text-sky-700";
    case "contacted":
      return "border-amber-200 bg-amber-50 text-amber-700";
    case "qualified":
      return "border-emerald-200 bg-emerald-50 text-emerald-700";
    case "won":
      return "border-emerald-300 bg-emerald-50 text-emerald-800";
    case "lost":
      return "border-rose-200 bg-rose-50 text-rose-700";
    default:
      return "border-slate-200 bg-slate-50 text-slate-600";
  }
}

function mapFormStatusToActivityType(status: string): ActivityType {
  switch (status) {
    case "converted":
      return "success";
    case "new":
    case "reviewed":
      return "info";
    case "spam":
    case "rejected":
      return "warning";
    default:
      return "neutral";
  }
}
