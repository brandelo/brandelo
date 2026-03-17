"use client";

import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Search,
  Upload,
  Download,
  Plus,
  Pencil,
  Trash2,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

// ✅ Supabase browser client
import { createClient } from "@/lib/supabase/client";

// ---------------- Types ----------------
type FollowUpPriority = "Hot" | "Warm" | "Cold";

type Need = {
  id: string;
  description: string;
  status: string;
};

// 👇 MATCHES your digital-marketing clients table
type ServiceType = "Web Development" | "SEO" | "SMM" | "Ads";
type FollowUpType = "Daily" | "Weekly" | "15 days" | "30 days" | "On Demand";

// This type reflects your DB schema (followUps table)
type FollowUpRow = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  source: string | null;
  priority: "hot" | "warm" | "cold"; // DB values
  last_contacted: string | null; // date (ISO string)
  project: string | null; // website / brand / campaign
  notes: string | null;

  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;

  // optional audit fields if you add later
  created_by?: string | null;
  created_by_name?: string | null;
  updated_by?: string | null;
  updated_by_name?: string | null;
};

type FollowUp = {
  id: string;
  name: string;
  email: string; // UI uses "-" when null
  phone: string;
  source: string;
  priority: FollowUpPriority;
  lastContacted: string; // dd/mm/yyyy (display)
  project: string;
  notes: string;

  // audit for UI
  editedBy?: string;
  editedAt?: string;
  createdBy?: string;
};

// ---------------- Utils ----------------
function toDisplayDate(iso?: string | null) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-GB");
}

function toOptionalDisplayDate(iso?: string | null) {
  const v = toDisplayDate(iso);
  return v === "-" ? undefined : v;
}

function todayISODate() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const priorityMapDbToUi: Record<FollowUpRow["priority"], FollowUpPriority> = {
  hot: "Hot",
  warm: "Warm",
  cold: "Cold",
};

const priorityMapUiToDb: Record<FollowUpPriority, FollowUpRow["priority"]> = {
  Hot: "hot",
  Warm: "warm",
  Cold: "cold",
};

function fromFollowUpRow(r: FollowUpRow): FollowUp {
  return {
    id: r.id,
    name: r.name,
    email: r.email ?? "-",
    phone: r.phone ?? "",
    source: r.source ?? "",
    priority: priorityMapDbToUi[r.priority] ?? "Warm",
    lastContacted: toDisplayDate(r.last_contacted ?? r.updated_at),
    project: r.project ?? "",
    notes: r.notes ?? "",

    editedBy: r.updated_by_name ?? undefined,
    editedAt: toOptionalDisplayDate(r.updated_at),
    createdBy: r.created_by_name ?? undefined,
  };
}

// ---------------- Priority Badge ----------------
function PriorityBadge({ priority }: { priority: FollowUpPriority }) {
  const styleMap: Record<
    FollowUpPriority,
    { bg: string; text: string; ring: string }
  > = {
    Hot: {
      bg: "bg-red-500/10",
      text: "text-red-600 dark:text-red-400",
      ring: "ring-red-500/20 dark:ring-red-400/30",
    },
    Warm: {
      bg: "bg-amber-400/15",
      text: "text-amber-700 dark:text-amber-400",
      ring: "ring-amber-400/30",
    },
    Cold: {
      bg: "bg-blue-500/10",
      text: "text-blue-600 dark:text-blue-400",
      ring: "ring-blue-500/20 dark:ring-blue-400/30",
    },
  };
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium followUping-none ring-1",
        styleMap[priority].bg,
        styleMap[priority].text,
        styleMap[priority].ring
      )}
    >
      {priority}
    </span>
  );
}

// ---------------- Reusable SidePanel ----------------
function SidePanel({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        // ✅ simple, responsive center modal
        className={cn(
          "max-w-[95vw] sm:max-w-md p-0 gap-0 border border-border bg-background shadow-xl",
          "rounded-xl"
        )}
      >
        {/* HEADER */}
        <div className="border-b border-border/60 bg-muted/40 px-4 py-3">
          <DialogHeader className="p-0">
            <DialogTitle className="text-base font-semibold followUping-none tracking-[-0.03em]">
              {title}
            </DialogTitle>
            {description ? (
              <DialogDescription className="text-[12px] followUping-snug">
                {description}
              </DialogDescription>
            ) : null}
          </DialogHeader>
        </div>

        {/* BODY – scrollable, fixed max height */}
        <div className="max-h-[75vh] overflow-y-auto px-4 py-4 text-sm">
          {children}
        </div>

        {/* FOOTER */}
        <div className="border-t border-border/60 bg-background/80 px-4 py-3">
          <DialogFooter className="flex flex-row justify-end gap-2 p-0 sm:gap-3">
            {footer}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}


// ---------------- Page ----------------
export default function FollowUpsPage() {
  const supabase = React.useMemo(() => createClient(), []);

  // data
  const [followUps, setFollowUps] = React.useState<FollowUp[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // trashed
  const [openTrash, setOpenTrash] = React.useState(false);
  const [trashedFollowUps, setTrashedFollowUps] = React.useState<FollowUp[]>([]);
  const [trashLoading, setTrashLoading] = React.useState(false);

  // filters

  const [search, setSearch] = React.useState("");
  const [priorityFilter, setPriorityFilter] =
    React.useState<"all" | FollowUpPriority>("all");

  // add/edit drawer
  const [openAddEdit, setOpenAddEdit] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);

  // form
  const [formName, setFormName] = React.useState("");
  const [formPhone, setFormPhone] = React.useState("");
  const [formEmail, setFormEmail] = React.useState("");
  const [formSource, setFormSource] = React.useState("facebook ads");
  const [formPriority, setFormPriority] =
    React.useState<FollowUpPriority>("Warm");

  // new form fields
  const [formProject, setFormProject] = React.useState("");
  const [formNotes, setFormNotes] = React.useState("");

  // Needs table state
  const [needs, setNeeds] = React.useState<Need[]>([]);
  const [newNeedText, setNewNeedText] = React.useState("");
  const [needsLoading, setNeedsLoading] = React.useState(false);

  // CSV input ref
  const csvInputRef = React.useRef<HTMLInputElement | null>(null);

  // ---- fetch
  async function fetchFollowUps() {
    setLoading(true);
    setErrorMsg(null);

    const { data, error } = await supabase
      .from("follow_ups")
      .select("*")
      .is("deleted_at", null) // soft delete
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMsg(error.message);
      setFollowUps([]);
      setLoading(false);
      return;
    }

    const normalized: FollowUp[] = (data as FollowUpRow[]).map(fromFollowUpRow);
    setFollowUps(normalized);
    setLoading(false);
  }

  async function fetchTrashed() {
    setTrashLoading(true);
    const { data, error } = await supabase
      .from("follow_ups")
      .select("*")
      .not("deleted_at", "is", null)
      .order("deleted_at", { ascending: false });

    if (error) {
      setTrashedFollowUps([]);
      setTrashLoading(false);
      return;
    }

    setTrashedFollowUps(((data as FollowUpRow[]) ?? []).map(fromFollowUpRow));
    setTrashLoading(false);
  }

  React.useEffect(() => {
    void fetchFollowUps();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- actions
  function handleResetFilters() {
    setSearch("");
    setPriorityFilter("all");
  }

  // Convert → Proposal
  async function convertToProposal(followUp: FollowUp) {
    try {
      const email = followUp.email === "-" ? null : followUp.email?.trim() || null;

      const { data: created, error: insertErr } = await supabase
        .from("proposals")
        .insert({
          name: followUp.name,
          email,
          phone: followUp.phone,
          source: followUp.source || null,
          service: "Web Development",
          status: "pending",
          project: followUp.project || null,
          notes: followUp.notes || null,
        })
        .select("id")
        .single<{ id: string }>();

      if (insertErr) {
        window.alert("Failed to convert: " + insertErr.message);
        return;
      }

      const { error: archiveErr } = await supabase
        .from("follow_ups")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", followUp.id);

      if (archiveErr) {
        window.alert(
          "Proposal created, but failed to move follow up to Trash: " +
          archiveErr.message
        );
      }

      setFollowUps((prev) => prev.filter((l) => l.id !== followUp.id));
      window.alert(
        "Converted to Proposal ✅" + (created?.id ? ` (id: ${created.id})` : "")
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      window.alert("Unexpected error: " + msg);
    }
  }

  function openEditDrawer(followUp: FollowUp) {
    setEditingId(followUp.id);
    setFormName(followUp.name);
    setFormPhone(followUp.phone);
    setFormEmail(followUp.email === "-" ? "" : followUp.email);
    setFormSource(followUp.source || "facebook ads");
    setFormPriority(followUp.priority);
    setFormProject(followUp.project || "");
    setFormNotes(followUp.notes || "");

    setNeeds([]);
    setNeedsLoading(true);
    supabase
      .from("needs")
      .select("*")
      .eq("follow_up_id", followUp.id)
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        setNeeds(data || []);
        setNeedsLoading(false);
      });

    setOpenAddEdit(true);
  }

  function openAddDrawer() {
    setEditingId(null);
    setFormName("");
    setFormPhone("");
    setFormEmail("");
    setFormSource("facebook ads");
    setFormPriority("Warm");
    setFormProject("");
    setFormNotes("");
    setNeeds([]);
    setOpenAddEdit(true);
  }

  async function moveToTrash(id: string) {
    const { error } = await supabase
      .from("follow_ups")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      window.alert("Failed moving to trash: " + error.message);
      return;
    }
    setFollowUps((prev) => prev.filter((l) => l.id !== id));
  }

  async function restoreFromTrash(id: string) {
    const { error } = await supabase
      .from("follow_ups")
      .update({ deleted_at: null })
      .eq("id", id);
    if (error) {
      window.alert("Failed to restore: " + error.message);
      return;
    }
    setTrashedFollowUps((prev) => prev.filter((l) => l.id !== id));
    await fetchFollowUps();
  }

  async function deletePermanently(id: string) {
    if (!window.confirm("Delete permanently? This cannot be undone.")) return;
    const { error } = await supabase.from("follow_ups").delete().eq("id", id);
    if (error) {
      window.alert("Failed to delete permanently: " + error.message);
      return;
    }
    setTrashedFollowUps((prev) => prev.filter((l) => l.id !== id));
  }

  async function handleSaveFollowUp() {
    if (!formName.trim() || !formPhone.trim()) {
      window.alert("Name and phone are required");
      return;
    }

    const base = {
      name: formName.trim(),
      phone: formPhone.trim(),
      email: formEmail.trim() || null,
      source: formSource.trim() || "facebook ads",
      priority: priorityMapUiToDb[formPriority],
      last_contacted: todayISODate(),
      project: formProject.trim() || null,
      notes: formNotes.trim() || null,
    };

    if (!editingId) {
      const { data, error } = await supabase
        .from("follow_ups")
        .insert(base)
        .select("*")
        .single<FollowUpRow>();
      if (error) {
        window.alert("Failed saving followUp: " + error.message);
        return;
      }
      const r = data;
      setFollowUps((prev) => [fromFollowUpRow(r), ...prev]);
    } else {
      const { data, error } = await supabase
        .from("follow_ups")
        .update({
          ...base,
        })
        .eq("id", editingId)
        .select("*")
        .single<FollowUpRow>();

      if (error) {
        window.alert("Failed updating followUp: " + error.message);
        return;
      }
      const updated = fromFollowUpRow(data);
      setFollowUps((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    }

    setOpenAddEdit(false);
  }

  async function handleAddNeed() {
    if (!newNeedText.trim() || !editingId) return;
    const { data, error } = await supabase.from("needs").insert({
      follow_up_id: editingId,
      description: newNeedText.trim(),
      status: "pending"
    }).select("*").single<Need>();

    if (error) { window.alert(error.message); return; }
    setNeeds(p => [...p, data]);
    setNewNeedText("");
  }

  async function handleDeleteNeed(id: string) {
    await supabase.from("needs").delete().eq("id", id);
    setNeeds(p => p.filter(n => n.id !== id));
  }

  // ---- CSV Export / Import
  function handleExportCsv() {
    const headers = [
      "id",
      "name",
      "email",
      "phone",
      "source",
      "priority",
      "last_contacted",
      "project",
      "notes",
    ] as const;
    const rows = filteredFollowUps.map((l) => [
      l.id,
      l.name,
      l.email === "-" ? "" : l.email,
      l.phone,
      l.source,
      l.priority,
      (() => {
        const parts = l.lastContacted.split("/");
        return parts.length === 3
          ? `${parts[2]}-${parts[1]}-${parts[0]}`
          : "";
      })(),
      l.project || "",
      l.notes?.replace(/\r?\n/g, " ") || "",
    ]);

    const csv = [
      headers.join(","),
      ...rows.map((r) => r.map(escapeCsv).join(",")),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const today = new Date().toISOString().slice(0, 10);
    const a = document.createElement("a");
    a.href = url;
    a.download = `followUps-${today}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function escapeCsv(val: string) {
    const needsQuotes = /[",\n]/.test(val);
    const out = val.replace(/"/g, '""');
    return needsQuotes ? `"${out}"` : out;
  }

  async function handleImportCsv(file: File) {
    const text = await file.text();
    const lines = text.split(/\r?\n/).filter(Boolean);
    if (lines.length === 0) {
      window.alert("Empty CSV");
      return;
    }

    const header = lines[0].split(",").map((h) => h.trim().toLowerCase());
    const idx = {
      id: header.indexOf("id"),
      name: header.indexOf("name"),
      email: header.indexOf("email"),
      phone: header.indexOf("phone"),
      source: header.indexOf("source"),
      priority: header.indexOf("priority"),
      last_contacted: header.indexOf("last_contacted"),
      project: header.indexOf("project"),
      notes: header.indexOf("notes"),
    };

    if (idx.name === -1 || idx.phone === -1) {
      window.alert('CSV must include at least "name" and "phone" columns.');
      return;
    }

    const toInsert: Array<{
      name: string;
      phone: string;
      email: string | null;
      source: string;
      priority: FollowUpRow["priority"];
      last_contacted: string;
      project: string | null;
      notes: string | null;
    }> = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = splitCsvLine(lines[i], header.length);
      if (!cols || cols.length === 0) continue;

      const name = (cols[idx.name] || "").trim();
      const phone = (cols[idx.phone] || "").trim();
      if (!name || !phone) continue;

      const email = (cols[idx.email] || "").trim() || null;
      const source =
        (cols[idx.source] || "facebook ads").trim() || "facebook ads";

      const priorityRaw =
        (idx.priority >= 0 ? cols[idx.priority] : "Warm") || "Warm";
      const priorityLower = priorityRaw.trim().toLowerCase();
      const priority: FollowUpRow["priority"] =
        priorityLower === "hot" ||
          priorityLower === "warm" ||
          priorityLower === "cold"
          ? (priorityLower as FollowUpRow["priority"])
          : "warm";

      const last_contacted_raw =
        (idx.last_contacted >= 0 ? cols[idx.last_contacted] : "")?.trim() ||
        "";
      const project =
        (idx.project >= 0 ? cols[idx.project] : "")?.trim() || null;
      const notes =
        (idx.notes >= 0 ? cols[idx.notes] : "")?.trim() || null;

      const last_contacted =
        last_contacted_raw && /^\d{4}-\d{2}-\d{2}$/.test(last_contacted_raw)
          ? last_contacted_raw
          : todayISODate();

      toInsert.push({
        name,
        phone,
        email,
        source,
        priority,
        last_contacted,
        project,
        notes,
      });
    }

    if (toInsert.length === 0) {
      window.alert("No valid rows found in CSV.");
      return;
    }

    const { data, error } = await supabase
      .from("follow_ups")
      .insert(toInsert)
      .select("*");
    if (error) {
      window.alert("Import failed: " + error.message);
      return;
    }

    const added = ((data as FollowUpRow[]) ?? []).map(fromFollowUpRow);
    setFollowUps((prev) => [...added, ...prev]);
    window.alert(`Imported ${added.length} followUp(s).`);
  }

  function splitCsvLine(line: string, expectedCols: number): string[] {
    const out: string[] = [];
    let cur = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const ch = line[i] as string;
      if (inQuotes) {
        if (ch === '"') {
          if (line[i + 1] === '"') {
            cur += '"';
            i++;
          } else {
            inQuotes = false;
          }
        } else {
          cur += ch;
        }
      } else {
        if (ch === '"') {
          inQuotes = true;
        } else if (ch === ",") {
          out.push(cur);
          cur = "";
        } else {
          cur += ch;
        }
      }
    }
    out.push(cur);
    if (expectedCols && out.length !== expectedCols) {
      while (out.length < expectedCols) out.push("");
      if (out.length > expectedCols) out.length = expectedCols;
    }
    return out.map((s) => s.trim());
  }

  // ---- computed
  const hotCount = followUps.filter((l) => l.priority === "Hot").length;
  const warmCount = followUps.filter((l) => l.priority === "Warm").length;
  const coldCount = followUps.filter((l) => l.priority === "Cold").length;

  const filteredFollowUps = React.useMemo(() => {
    return followUps.filter((followUp) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        q.length === 0
          ? true
          : [
            followUp.name,
            followUp.email,
            followUp.phone,
            followUp.source,
            followUp.priority,
            followUp.lastContacted,
            followUp.project,
            followUp.notes,
            followUp.createdBy ?? "",
            followUp.editedBy ?? "",
            followUp.editedAt ?? "",
          ]
            .join(" ")
            .toLowerCase()
            .includes(q);
      const matchesPriority =
        priorityFilter === "all" ? true : followUp.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
  }, [followUps, search, priorityFilter]);

  const tableHeaders: Array<{ key: string; label: string; className?: string }> =
    [
      {
        key: "name",
        label: "Name",
        className: "py-3 pl-4 pr-2 text-left font-medium",
      },
      {
        key: "email",
        label: "Email",
        className: "py-3 px-2 text-left font-medium",
      },
      {
        key: "phone",
        label: "Phone",
        className: "py-3 px-2 text-left font-medium",
      },
      {
        key: "source",
        label: "Source",
        className: "py-3 px-2 text-left font-medium",
      },
      {
        key: "priority",
        label: "Priority",
        className: "py-3 px-2 text-left font-medium",
      },
      {
        key: "project",
        label: "Brand / Project",
        className: "py-3 px-2 text-left font-medium",
      },
      {
        key: "notes",
        label: "Notes",
        className: "py-3 px-2 text-left font-medium",
      },
      {
        key: "last",
        label: "Last Contacted",
        className: "whitespace-nowrap py-3 px-2 text-left font-medium",
      },
      {
        key: "actions",
        label: "Actions",
        className: "py-3 px-2 text-left font-medium",
      },
    ];

  // ===========================================================
  // RENDER
  // ===========================================================
  return (
    <>
      <div
        className={cn(
          "mx-auto flex w-full max-w-[1400px] flex-col gap-6 p-4 sm:p-6",
          "bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.06)_0%,transparent_60%)]"
        )}
      >
        {/* HEADER */}
        <section className="flex flex-col gap-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col sm:flex-row sm:items-end sm:gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-semibold followUping-none tracking-[-0.03em]">
                    FollowUps
                  </h1>
                  <span className="inline-flex items-center rounded-full bg-muted/60 px-2 py-[2px] text-[10px] font-medium text-muted-foreground ring-1 ring-border">
                    Digital Marketing
                  </span>
                </div>
                <span className="followUping-none text-xs text-muted-foreground">
                  FB / Google Ads • SEO • SMM inquiries
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-2 rounded-lg border-border bg-background/50 text-[13px] shadow-sm hover:bg-background"
                onClick={handleExportCsv}
                aria-label="Export CSV"
              >
                <Download className="h-4 w-4" />
                <span>Export CSV</span>
              </Button>

              <input
                ref={csvInputRef}
                type="file"
                accept=".csv,text/csv"
                className="hidden"
                onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                  const f = e.target.files?.[0];
                  if (!f) return;
                  await handleImportCsv(f);
                  e.currentTarget.value = "";
                }}
              />
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-2 rounded-lg border-border bg-background/50 text-[13px] shadow-sm hover:bg-background"
                onClick={() => csvInputRef.current?.click()}
                aria-label="Import CSV"
              >
                <Upload className="h-4 w-4" />
                <span>Import CSV</span>
              </Button>

              <Button
                size="sm"
                className="h-9 gap-2 rounded-lg bg-indigo-600 text-[13px] font-medium text-white shadow-sm active:scale-[0.99] hover:bg-indigo-700"
                onClick={openAddDrawer}
              >
                <Plus className="h-4 w-4" />
                <span>Add FollowUp</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-2 rounded-lg border-border bg-background/50 text-[13px] shadow-sm hover:bg-background"
                onClick={async () => {
                  setOpenTrash(true);
                  await fetchTrashed();
                }}
              >
                <Trash2 className="h-4 w-4" />
                <span>Open Trash</span>
              </Button>
            </div>
          </div>
        </section>

        {/* FILTERS + STATS */}
        <Card className="border-border/60 bg-background shadow-sm">
          <CardContent className="flex flex-col gap-4 p-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex w-full flex-col gap-3 lg:max-w-[480px]">
                <div className="relative w-full">
                  <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Search className="h-4 w-4" />
                  </div>
                  <Input
                    className="h-9 rounded-lg pl-9 text-sm"
                    placeholder="Search name, email, phone, brand, notes…"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                {/* mobile filters */}
                <div className="flex flex-row items-center gap-2 sm:hidden">
                  <Select
                    value={priorityFilter}
                    onValueChange={(val) =>
                      setPriorityFilter(val as "all" | FollowUpPriority)
                    }
                  >
                    <SelectTrigger className="h-9 w-full rounded-lg text-sm">
                      <SelectValue placeholder="All Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="Hot">Hot</SelectItem>
                      <SelectItem value="Warm">Warm</SelectItem>
                      <SelectItem value="Cold">Cold</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleResetFilters}
                    className="h-9 shrink-0 rounded-lg"
                  >
                    Reset
                  </Button>
                </div>
              </div>

              {/* desktop filters */}
              <div className="hidden flex-none items-start gap-2 sm:flex">
                <Select
                  value={priorityFilter}
                  onValueChange={(val) =>
                    setPriorityFilter(val as "all" | FollowUpPriority)
                  }
                >
                  <SelectTrigger className="h-9 min-w-[130px] rounded-lg text-sm">
                    <SelectValue placeholder="All Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="Hot">Hot</SelectItem>
                    <SelectItem value="Warm">Warm</SelectItem>
                    <SelectItem value="Cold">Cold</SelectItem>
                  </SelectContent>
                </Select>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetFilters}
                  className="h-9 rounded-lg"
                >
                  Reset
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:max-w-[900px]">
              <StatCard label="Hot FollowUps" value={hotCount} tone="red" />
              <StatCard label="Warm FollowUps" value={warmCount} tone="amber" />
              <StatCard label="Cold FollowUps" value={coldCount} tone="blue" />
            </div>

            {loading && (
              <p className="text-xs text-muted-foreground">Loading…</p>
            )}
            {errorMsg && (
              <p className="text-xs text-red-500">Error: {errorMsg}</p>
            )}
          </CardContent>
        </Card>

        {/* TABLE / MOBILE LIST */}
        <Card className="overflow-hidden border-border/60 bg-background shadow-sm">
          <CardHeader className="border-b border-border/60 px-4 py-3">
            <CardTitle className="flex flex-col text-[13px] font-medium text-muted-foreground sm:flex-row sm:items-center sm:gap-2">
              <span className="text-sm font-semibold followUping-none text-foreground">
                FollowUps List
              </span>
              <span className="text-[11px] followUping-none">
                {filteredFollowUps.length} result
                {filteredFollowUps.length === 1 ? "" : "s"}
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
            {/* DESKTOP / TABLET TABLE */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[1000px] text-sm">
                <thead>
                  <tr className="border-b border-border/60 bg-muted/40 text-[11px] uppercase tracking-wide text-muted-foreground">
                    {tableHeaders.map((h) => (
                      <th key={h.key} className={h.className}>
                        {h.label}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="text-[13px]">
                  {filteredFollowUps.length === 0 ? (
                    <tr>
                      <td
                        className="px-4 py-10 text-center text-sm text-muted-foreground"
                        colSpan={tableHeaders.length}
                      >
                        {loading ? "Loading…" : "No followUps match your filters"}
                      </td>
                    </tr>
                  ) : (
                    filteredFollowUps.map((followUp, idx) => (
                      <tr
                        key={followUp.id}
                        className={cn(
                          "group border-b border-border/60 transition-colors",
                          "hover:bg-muted/30",
                          idx % 2 === 1 ? "bg-muted/10" : "bg-transparent"
                        )}
                      >
                        <td className="py-4 pl-4 pr-2 align-top font-medium followUping-[1.2]">
                          <div className="flex flex-col">
                            <span className="truncate">{followUp.name}</span>
                            <span className="text-[11px] font-normal text-muted-foreground">
                              ID #{followUp.id.slice(0, 8)}
                            </span>

                            {(followUp.editedBy || followUp.editedAt) && (
                              <div className="mt-1 text-[11px] text-muted-foreground">
                                Edited
                                {followUp.editedBy ? ` by ${followUp.editedBy}` : ""}
                                {followUp.editedAt ? ` on ${followUp.editedAt}` : ""}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="break-all py-4 px-2 align-top followUping-[1.2] text-muted-foreground">
                          {followUp.email || "-"}
                        </td>
                        <td className="whitespace-nowrap py-4 px-2 align-top followUping-[1.2]">
                          {followUp.phone || "-"}
                        </td>
                        <td className="py-4 px-2 align-top followUping-[1.2] text-muted-foreground">
                          {followUp.source || "-"}
                        </td>
                        <td className="py-4 px-2 align-top followUping-[1.2]">
                          <PriorityBadge priority={followUp.priority} />
                        </td>
                        <td className="py-4 px-2 align-top followUping-[1.2]">
                          {followUp.project || "-"}
                        </td>
                        <td className="py-4 px-2 align-top followUping-[1.2] text-muted-foreground">
                          {followUp.notes ? (
                            <span title={followUp.notes}>
                              {followUp.notes.length > 60
                                ? followUp.notes.slice(0, 60) + "…"
                                : followUp.notes}
                            </span>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="whitespace-nowrap py-4 px-2 align-top followUping-[1.2] text-muted-foreground">
                          {followUp.lastContacted}
                        </td>
                        <td className="py-4 px-2 align-top followUping-[1.2]">
                          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 whitespace-nowrap rounded-md border-border bg-background/50 px-2 text-[12px] font-medium shadow-sm hover:bg-background"
                              onClick={() => void convertToProposal(followUp)}
                              aria-label={`Convert ${followUp.name} to proposal`}
                            >
                              Convert → Proposal
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 whitespace-nowrap gap-1 rounded-md border-border bg-background/50 px-2 text-[12px] font-medium shadow-sm hover:bg-background"
                              onClick={() => openEditDrawer(followUp)}
                              aria-label={`Edit ${followUp.name}`}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 whitespace-nowrap gap-1 rounded-md border-red-300/60 bg-red-500/5 px-2 text-[12px] font-medium text-red-600 shadow-sm hover:bg-red-500/10"
                              onClick={() => void moveToTrash(followUp.id)}
                              aria-label={`Move ${followUp.name} to trash`}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span>Move to Trash</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* MOBILE: CARD LIST */}
            <div className="block md:hidden">
              {filteredFollowUps.length === 0 ? (
                <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                  {loading ? "Loading…" : "No followUps match your filters"}
                </div>
              ) : (
                <div className="space-y-3 p-3">
                  {filteredFollowUps.map((followUp) => (
                    <div
                      key={followUp.id}
                      className="rounded-lg border border-border/60 bg-background/80 p-3 text-[13px] shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="font-semibold followUping-tight">
                            {followUp.name}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            ID #{followUp.id.slice(0, 8)}
                          </div>
                        </div>
                        <PriorityBadge priority={followUp.priority} />
                      </div>

                      <div className="mt-2 space-y-1.5 text-[12px] text-muted-foreground">
                        {followUp.project && (
                          <div className="truncate">
                            <span className="font-medium text-foreground">
                              Project:
                            </span>{" "}
                            {followUp.project}
                          </div>
                        )}

                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {followUp.phone && (
                            <span className="truncate">
                              <span className="font-medium text-foreground">
                                Ph:
                              </span>{" "}
                              {followUp.phone}
                            </span>
                          )}
                          {followUp.email && followUp.email !== "-" && (
                            <span className="truncate">
                              <span className="font-medium text-foreground">
                                Email:
                              </span>{" "}
                              {followUp.email}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-x-3 gap-y-1">
                          {followUp.source && (
                            <span className="truncate">
                              <span className="font-medium text-foreground">
                                Source:
                              </span>{" "}
                              {followUp.source}
                            </span>
                          )}
                          <span>
                            <span className="font-medium text-foreground">
                              Last:
                            </span>{" "}
                            {followUp.lastContacted}
                          </span>
                        </div>

                        {followUp.notes && (
                          <div className="truncate">
                            <span className="font-medium text-foreground">
                              Notes:
                            </span>{" "}
                            {followUp.notes.length > 80
                              ? followUp.notes.slice(0, 80) + "…"
                              : followUp.notes}
                          </div>
                        )}

                        {(followUp.editedBy || followUp.editedAt) && (
                          <div className="pt-1 text-[11px] text-muted-foreground">
                            Edited
                            {followUp.editedBy ? ` by ${followUp.editedBy}` : ""}
                            {followUp.editedAt ? ` on ${followUp.editedAt}` : ""}
                          </div>
                        )}
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 flex-1 min-w-[120px] rounded-md border-border bg-background/50 px-2 text-[12px] font-medium shadow-sm hover:bg-background"
                          onClick={() => void convertToProposal(followUp)}
                        >
                          Convert → Proposal
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 flex-1 min-w-[90px] gap-1 rounded-md border-border bg-background/50 px-2 text-[12px] font-medium shadow-sm hover:bg-background"
                          onClick={() => openEditDrawer(followUp)}
                        >
                          <Pencil className="h-3.5 w-3.5" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-8 flex-1 min-w-[120px] gap-1 rounded-md border-red-300/60 bg-red-500/5 px-2 text-[12px] font-medium text-red-600 shadow-sm hover:bg-red-500/10"
                          onClick={() => void moveToTrash(followUp.id)}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          Trash
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FOOTER (shared) */}
            <div className="flex flex-col gap-3 border-t border-border/60 px-4 py-4 text-[12px] text-muted-foreground lg:flex-row lg:items-center lg:justify-between">
              <div>
                Showing{" "}
                <span className="text-foreground font-medium">
                  {filteredFollowUps.length}
                </span>{" "}
                followUps
              </div>

              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 rounded-md border-border bg-background/50 px-3 text-[12px] shadow-sm hover:bg-background"
                  disabled
                >
                  Prev
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 rounded-md border-border bg-background/50 px-3 text-[12px] shadow-sm hover:bg-background"
                  disabled
                >
                  Next
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ADD/EDIT DRAWER */}
      <SidePanel
        open={openAddEdit}
        onOpenChange={setOpenAddEdit}
        title={editingId ? "Edit FollowUp" : "Add FollowUp"}
        description={
          editingId
            ? "Update followUp details"
            : "Create a new prospect from your campaigns"
        }
        footer={
          <>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="h-9 rounded-md border-border text-[13px]"
              >
                Cancel
              </Button>
            </DialogClose>

            <Button
              className="h-9 rounded-md bg-indigo-600 text-[13px] font-medium text-white hover:bg-indigo-700"
              onClick={() => void handleSaveFollowUp()}
            >
              {editingId ? "Save Changes" : "Save FollowUp"}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 text-sm">
          <div className="grid gap-1.5">
            <Label className="text-[12px] font-medium">Client name *</Label>
            <Input
              className="h-9 text-sm"
              placeholder="eg. Acme Pvt. Ltd."
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
            />
          </div>

          <div className="grid gap-1.5">
            <Label className="text-[12px] font-medium">Phone *</Label>
            <Input
              className="h-9 text-sm"
              placeholder="+91 98765 12345"
              value={formPhone}
              onChange={(e) => setFormPhone(e.target.value)}
            />
          </div>

          <div className="grid gap-1.5">
            <Label className="text-[12px] font-medium">Email</Label>
            <Input
              className="h-9 text-sm"
              placeholder="marketing@client.com"
              value={formEmail}
              onChange={(e) => setFormEmail(e.target.value)}
            />
          </div>

          <div className="grid gap-1.5">
            <Label className="text-[12px] font-medium">Source</Label>
            <Select
              value={formSource}
              onValueChange={(val) => setFormSource(val)}
            >
              <SelectTrigger className="h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facebook ads">Facebook Ads</SelectItem>
                <SelectItem value="google ads">Google Ads</SelectItem>
                <SelectItem value="instagram dm">Instagram DM</SelectItem>
                <SelectItem value="website form">Website Form</SelectItem>
                <SelectItem value="referral">Referral</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label className="text-[12px] font-medium">Priority</Label>
            <Select
              value={formPriority}
              onValueChange={(val) => setFormPriority(val as FollowUpPriority)}
            >
              <SelectTrigger className="h-9 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Hot">Hot</SelectItem>
                <SelectItem value="Warm">Warm</SelectItem>
                <SelectItem value="Cold">Cold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Project */}
          <div className="grid gap-1.5">
            <Label className="text-[12px] font-medium">
              Brand / Project / Service
            </Label>
            <Input
              className="h-9 text-sm"
              placeholder="eg. Website revamp, SEO retainer, SMM package"
              value={formProject}
              onChange={(e) => setFormProject(e.target.value)}
            />
          </div>

          {/* Notes */}
          <div className="grid gap-1.5">
            <Label className="text-[12px] font-medium">Notes</Label>
            <textarea
              className="min-h-[84px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm"
              placeholder="Budget, requirements, timeline, call summary…"
              value={formNotes}
              onChange={(e) => setFormNotes(e.target.value)}
            />
          </div>

          <div className="grid gap-1.5">
            <Label className="text-[12px] font-medium">
              Last Contacted (auto)
            </Label>
            <Input
              className="h-9 text-sm"
              value={new Date().toLocaleDateString("en-GB")}
              readOnly
            />
            <p className="text-[11px] followUping-none text-muted-foreground">
              This will be saved as today&apos;s date.
            </p>
          </div>

          {/* NEEDS LIST (Edit mode only) */}
          {editingId && (
            <div className="grid gap-2 border-t border-border pt-4 mt-2">
              <Label className="text-[14px] font-semibold text-foreground">Needs / Requirements</Label>
              {needsLoading ? <p className="text-xs text-muted-foreground">Loading needs...</p> : (
                <div className="flex flex-col gap-2">
                  {needs.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic">No needs recorded yet.</p>
                  ) : needs.map(n => (
                    <div key={n.id} className="flex items-center justify-between rounded bg-muted/30 p-2 text-sm">
                      <span>{n.description}</span>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0 text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => void handleDeleteNeed(n.id)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2 mt-2">
                    <Input
                      className="h-8 text-sm flex-1"
                      placeholder="Add new need..."
                      value={newNeedText}
                      onChange={e => setNewNeedText(e.target.value)}
                      onKeyDown={e => { if (e.key === 'Enter') void handleAddNeed(); }}
                    />
                    <Button size="sm" className="h-8 shrink-0 bg-indigo-600 hover:bg-indigo-700 text-white" onClick={() => void handleAddNeed()}>
                      Add
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </SidePanel>

      {/* TRASH DRAWER */}
      <SidePanel
        open={openTrash}
        onOpenChange={setOpenTrash}
        title="Trash"
        description="FollowUps you’ve moved to trash. Restore or delete permanently."
        footer={
          <>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="h-9 rounded-md border-border text-[13px]"
              >
                Close
              </Button>
            </DialogClose>
          </>
        }
      >
        {trashLoading ? (
          <p className="text-xs text-muted-foreground">Loading trash…</p>
        ) : trashedFollowUps.length === 0 ? (
          <div className="flex flex-col items-center gap-2 text-center text-sm text-muted-foreground">
            <RotateCcw className="h-5 w-5" />
            Nothing in trash
          </div>
        ) : (
          <div className="space-y-2">
            {trashedFollowUps.map((t) => (
              <div
                key={t.id}
                className="flex items-start justify-between rounded-md border border-border/60 p-2 text-sm"
              >
                <div className="min-w-0">
                  <div className="truncate font-medium">{t.name}</div>
                  <div className="truncate text-[12px] text-muted-foreground">
                    {t.phone} • {t.email || "-"} • {t.source} •{" "}
                    <span className="uppercase">{t.priority}</span>
                    {t.project ? <> • {t.project}</> : null}
                  </div>
                  {t.notes ? (
                    <div className="truncate text-[12px] text-muted-foreground">
                      📝 {t.notes}
                    </div>
                  ) : null}
                </div>
                <div className="ml-2 flex shrink-0 items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2"
                    onClick={() => void restoreFromTrash(t.id)}
                  >
                    <RotateCcw className="mr-1 h-3.5 w-3.5" /> Restore
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 px-2 border-red-300/60 bg-red-500/5 text-red-600 hover:bg-red-500/10"
                    onClick={() => void deletePermanently(t.id)}
                  >
                    <AlertTriangle className="mr-1 h-3.5 w-3.5" />
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SidePanel>
    </>
  );
}

// ---- Small presentational card
function StatCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: "red" | "amber" | "blue";
}) {
  const toneMap = {
    red: {
      ring: "ring-red-500/20 dark:ring-red-400/30",
      dot: "bg-red-500 dark:bg-red-400",
    },
    amber: {
      ring: "ring-amber-400/30",
      dot: "bg-amber-400",
    },
    blue: {
      ring: "ring-blue-500/20 dark:ring-blue-400/30",
      dot: "bg-blue-500 dark:bg-blue-400",
    },
  }[tone];

  return (
    <div className="flex items-start justify-between rounded-lg border border-border/60 bg-background/50 p-3 text-foreground shadow-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 sm:block sm:space-y-2">
      <div className="flex items-center gap-2 text-[12px] font-medium followUping-none text-muted-foreground dark:text-neutral-400">
        <span
          className={cn("h-1.5 w-1.5 rounded-full shadow-sm", toneMap.dot)}
        />
        <span>{label}</span>
      </div>
      <div
        className={cn(
          "inline-flex rounded-md px-2 py-1 text-foreground text-2xl font-semibold followUping-none tracking-[-0.04em] ring-1 dark:text-neutral-100",
          toneMap.ring
        )}
      >
        {value}
      </div>
    </div>
  );
}
