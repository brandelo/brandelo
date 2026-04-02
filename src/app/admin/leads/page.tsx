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
type LeadPriority = "Hot" | "Warm" | "Cold";

// DB Schema
type LeadRow = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  source: string | null;
  priority: "hot" | "warm" | "cold";
  last_contacted: string | null;
  project: string | null;
  notes: string | null;

  lead_type: "email" | "contact";
  subject_line: string | null;
  email_body: string | null;

  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;

  created_by_name?: string | null;
  updated_by_name?: string | null;
};

// UI Schema
type Lead = {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: string;
  priority: LeadPriority;
  lastContacted: string;
  project: string;
  notes: string;

  leadType: "email" | "contact";
  subjectLine: string;
  emailBody: string;

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

const priorityMapDbToUi: Record<LeadRow["priority"], LeadPriority> = {
  hot: "Hot",
  warm: "Warm",
  cold: "Cold",
};

const priorityMapUiToDb: Record<LeadPriority, LeadRow["priority"]> = {
  Hot: "hot",
  Warm: "warm",
  Cold: "cold",
};

function fromLeadRow(r: LeadRow): Lead {
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
    leadType: r.lead_type ?? "contact",
    subjectLine: r.subject_line ?? "",
    emailBody: r.email_body ?? "",

    editedBy: r.updated_by_name ?? undefined,
    editedAt: toOptionalDisplayDate(r.updated_at),
    createdBy: r.created_by_name ?? undefined,
  };
}

// ---------------- Priority Badge ----------------
function PriorityBadge({ priority }: { priority: LeadPriority }) {
  const styleMap: Record<
    LeadPriority,
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
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium leading-none ring-1",
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
      <DialogContent className="max-w-[95vw] sm:max-w-md p-0 gap-0 border border-border bg-background shadow-xl rounded-xl">
        <div className="border-b border-border/60 bg-muted/40 px-4 py-3">
          <DialogHeader className="p-0">
            <DialogTitle className="text-base font-semibold leading-none tracking-[-0.03em]">
              {title}
            </DialogTitle>
            {description ? (
              <DialogDescription className="text-[12px] leading-snug">
                {description}
              </DialogDescription>
            ) : null}
          </DialogHeader>
        </div>
        <div className="max-h-[75vh] overflow-y-auto px-4 py-4 text-sm">
          {children}
        </div>
        <div className="border-t border-border/60 bg-background/80 px-4 py-3">
          <DialogFooter className="flex flex-row justify-end gap-2 p-0 sm:gap-3">
            {footer}
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---------------- Row Component ----------------
function LeadRowItems({
  lead,
  type,
  onEdit,
  onTrash,
  onConvert,
}: {
  lead: Lead;
  type: "email" | "contact";
  onEdit: () => void;
  onTrash: () => void;
  onConvert: () => void;
}) {
  return (
    <>
      <td className="py-4 pl-4 pr-2 align-top font-medium leading-[1.2]">
        <div className="flex flex-col">
          <span className="truncate">{lead.name}</span>
          <span className="text-[11px] font-normal text-muted-foreground">
            ID #{lead.id.slice(0, 8)}
          </span>
          {(lead.editedBy || lead.editedAt) && (
            <div className="mt-1 text-[11px] text-muted-foreground">
              Edited
              {lead.editedBy ? ` by ${lead.editedBy}` : ""}
              {lead.editedAt ? ` on ${lead.editedAt}` : ""}
            </div>
          )}
        </div>
      </td>
      <td className="break-all py-4 px-2 align-top leading-[1.2] text-muted-foreground">
        {lead.email || "-"}
      </td>
      <td className="whitespace-nowrap py-4 px-2 align-top leading-[1.2]">
        {lead.phone || "-"}
      </td>
      <td className="py-4 px-2 align-top leading-[1.2] text-muted-foreground">
        {lead.source || "-"}
      </td>
      <td className="py-4 px-2 align-top leading-[1.2]">
        <PriorityBadge priority={lead.priority} />
      </td>
      <td className="py-4 px-2 align-top leading-[1.2]">
        {lead.project || "-"}
      </td>

      {type === "email" && (
        <>
          <td className="py-4 px-2 align-top leading-[1.2] text-muted-foreground max-w-[150px]">
            <span title={lead.subjectLine} className="truncate block">
              {lead.subjectLine || "-"}
            </span>
          </td>
          <td className="py-4 px-2 align-top leading-[1.2] text-muted-foreground max-w-[200px]">
            {lead.emailBody ? (
              <span title={lead.emailBody}>
                {lead.emailBody.length > 40
                  ? lead.emailBody.slice(0, 40) + "…"
                  : lead.emailBody}
              </span>
            ) : (
              "-"
            )}
          </td>
        </>
      )}

      <td className="py-4 px-2 align-top leading-[1.2] text-muted-foreground">
        {lead.notes ? (
          <span title={lead.notes}>
            {lead.notes.length > 50
              ? lead.notes.slice(0, 50) + "…"
              : lead.notes}
          </span>
        ) : (
          "-"
        )}
      </td>
      <td className="whitespace-nowrap py-4 px-2 align-top leading-[1.2] text-muted-foreground">
        {lead.lastContacted}
      </td>
      <td className="py-4 px-2 align-top leading-[1.2]">
        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
          <Button
            size="sm"
            variant="outline"
            className="h-8 whitespace-nowrap rounded-md border-border bg-background/50 px-2 text-[12px] font-medium shadow-sm hover:bg-background"
            onClick={onConvert}
          >
            Convert → Follow Up
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="h-8 whitespace-nowrap gap-1 rounded-md border-border bg-background/50 px-2 text-[12px] font-medium shadow-sm hover:bg-background"
            onClick={onEdit}
          >
            <Pencil className="h-3.5 w-3.5" />
            Edit
          </Button>

          <Button
            size="sm"
            variant="outline"
            className="h-8 whitespace-nowrap gap-1 rounded-md border-red-300/60 bg-red-500/5 px-2 text-[12px] font-medium text-red-600 shadow-sm hover:bg-red-500/10"
            onClick={onTrash}
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span>Move to Trash</span>
          </Button>
        </div>
      </td>
    </>
  );
}

// ---------------- Mobile Card ----------------
function MobileLeadCard({
  lead,
  onEdit,
  onTrash,
  onConvert,
}: {
  lead: Lead;
  onEdit: () => void;
  onTrash: () => void;
  onConvert: () => void;
}) {
  return (
    <div className="rounded-lg border border-border/60 bg-background/80 p-3 text-[13px] shadow-sm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <div className="font-semibold leading-tight">{lead.name}</div>
          <div className="text-[11px] text-muted-foreground">ID #{lead.id.slice(0, 8)}</div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <PriorityBadge priority={lead.priority} />
          <span className="text-[10px] uppercase font-bold text-muted-foreground/60">{lead.leadType}</span>
        </div>
      </div>

      <div className="mt-2 space-y-1.5 text-[12px] text-muted-foreground">
        {lead.project && (
          <div className="truncate">
            <span className="font-medium text-foreground">Project:</span> {lead.project}
          </div>
        )}
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          {lead.phone && (
            <span><span className="font-medium text-foreground">Ph:</span> {lead.phone}</span>
          )}
          {lead.email && lead.email !== "-" && (
            <span><span className="font-medium text-foreground">Email:</span> {lead.email}</span>
          )}
        </div>
        {lead.leadType === "email" && lead.subjectLine && (
          <div className="truncate italic">
             <span className="font-medium text-foreground not-italic">Sub:</span> {lead.subjectLine}
          </div>
        )}
        <div className="flex flex-wrap gap-x-3 gap-y-1">
          <span><span className="font-medium text-foreground">Source:</span> {lead.source}</span>
          <span><span className="font-medium text-foreground">Last:</span> {lead.lastContacted}</span>
        </div>
        {lead.notes && (
          <div className="truncate">
            <span className="font-medium text-foreground">Notes:</span> {lead.notes}
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" variant="outline" className="h-8 flex-1 min-w-[120px] text-[11px]" onClick={onConvert}>
          Convert → Follow Up
        </Button>
        <Button size="sm" variant="outline" className="h-8 flex-1 min-w-[70px] text-[11px]" onClick={onEdit}>
          <Pencil className="h-3.5 w-3.5 mr-1" /> Edit
        </Button>
        <Button size="sm" variant="outline" className="h-8 flex-1 min-w-[100px] text-[11px] text-red-600 border-red-200 hover:bg-red-50" onClick={onTrash}>
          <Trash2 className="h-3.5 w-3.5 mr-1" /> Trash
        </Button>
      </div>
    </div>
  );
}

// ---------------- Page ----------------
export default function LeadsPage() {
  const supabase = React.useMemo(() => createClient(), []);

  // data
  const [leads, setLeads] = React.useState<Lead[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // trashed
  const [openTrash, setOpenTrash] = React.useState(false);
  const [trashedLeads, setTrashedLeads] = React.useState<Lead[]>([]);
  const [trashLoading, setTrashLoading] = React.useState(false);

  // filters
  const [search, setSearch] = React.useState("");
  const [priorityFilter, setPriorityFilter] =
    React.useState<"all" | LeadPriority>("all");

  // add/edit drawer
  const [openAddEdit, setOpenAddEdit] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);

  // form
  const [formName, setFormName] = React.useState("");
  const [formPhone, setFormPhone] = React.useState("");
  const [formEmail, setFormEmail] = React.useState("");
  const [formSource, setFormSource] = React.useState("facebook ads");
  const [formPriority, setFormPriority] =
    React.useState<LeadPriority>("Warm");
  const [formProject, setFormProject] = React.useState("");
  const [formNotes, setFormNotes] = React.useState("");
  
  const [formLeadType, setFormLeadType] = React.useState<"email" | "contact">("contact");
  const [formSubjectLine, setFormSubjectLine] = React.useState("");
  const [formEmailBody, setFormEmailBody] = React.useState("");

  const csvInputRef = React.useRef<HTMLInputElement | null>(null);

  // ---- Fetch
  async function fetchLeads() {
    setLoading(true);
    setErrorMsg(null);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }
    setLeads((data as LeadRow[]).map(fromLeadRow));
    setLoading(false);
  }

  async function fetchTrashed() {
    setTrashLoading(true);
    const { data, error } = await supabase
      .from("leads")
      .select("*")
      .not("deleted_at", "is", null)
      .order("deleted_at", { ascending: false });

    if (error) {
      setTrashedLeads([]);
      setTrashLoading(false);
      return;
    }
    setTrashedLeads((data as LeadRow[]).map(fromLeadRow));
    setTrashLoading(false);
  }

  React.useEffect(() => {
    void fetchLeads();
  }, []);

  // ---- Actions
  function handleResetFilters() {
    setSearch("");
    setPriorityFilter("all");
  }

  async function convertToFollowUp(lead: Lead) {
    try {
      const email = lead.email === "-" ? null : lead.email?.trim() || null;
      const { data: created, error: insertErr } = await supabase
        .from("follow_ups")
        .insert({
          name: lead.name,
          email,
          phone: lead.phone,
          source: lead.source || null,
          priority: priorityMapUiToDb[lead.priority],
          project: lead.project || null,
          notes: lead.notes || null,
          last_contacted: todayISODate(),
          lead_type: lead.leadType,
          subject_line: lead.leadType === "email" ? lead.subjectLine : null,
          email_body: lead.leadType === "email" ? lead.emailBody : null,
        })
        .select("id")
        .single<{ id: string }>();

      if (insertErr) {
        window.alert("Failed to convert: " + insertErr.message);
        return;
      }
      await supabase.from("leads").update({ deleted_at: new Date().toISOString() }).eq("id", lead.id);
      setLeads((prev) => prev.filter((l) => l.id !== lead.id));
      window.alert("Converted to Follow Up ✅");
    } catch (e) {
      window.alert("Unexpected error");
    }
  }

  function openEditDrawer(lead: Lead) {
    setEditingId(lead.id);
    setFormName(lead.name);
    setFormPhone(lead.phone);
    setFormEmail(lead.email === "-" ? "" : lead.email);
    setFormSource(lead.source || "facebook ads");
    setFormPriority(lead.priority);
    setFormProject(lead.project || "");
    setFormNotes(lead.notes || "");
    setFormLeadType(lead.leadType);
    setFormSubjectLine(lead.subjectLine);
    setFormEmailBody(lead.emailBody);
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
    setFormLeadType("contact");
    setFormSubjectLine("");
    setFormEmailBody("");
    setOpenAddEdit(true);
  }

  async function moveToTrash(id: string) {
    const { error } = await supabase.from("leads").update({ deleted_at: new Date().toISOString() }).eq("id", id);
    if (error) {
      window.alert("Failed moving to trash: " + error.message);
      return;
    }
    setLeads((prev) => prev.filter((l) => l.id !== id));
  }

  async function restoreFromTrash(id: string) {
    const { error } = await supabase.from("leads").update({ deleted_at: null }).eq("id", id);
    if (error) {
      window.alert("Failed to restore: " + error.message);
      return;
    }
    setTrashedLeads((prev) => prev.filter((l) => l.id !== id));
    await fetchLeads();
  }

  async function deletePermanently(id: string) {
    if (!window.confirm("Delete permanently? This cannot be undone.")) return;
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) {
      window.alert("Failed to delete permanently: " + error.message);
      return;
    }
    setTrashedLeads((prev) => prev.filter((l) => l.id !== id));
  }

  async function handleSaveLead() {
    if (!formName.trim() || !formPhone.trim()) {
      window.alert("Name and phone are required");
      return;
    }

    const payload = {
      name: formName.trim(),
      phone: formPhone.trim(),
      email: formEmail.trim() || null,
      source: formSource.trim() || "facebook ads",
      priority: priorityMapUiToDb[formPriority],
      last_contacted: todayISODate(),
      project: formProject.trim() || null,
      notes: formNotes.trim() || null,
      lead_type: formLeadType,
      subject_line: formLeadType === "email" ? formSubjectLine.trim() : null,
      email_body: formLeadType === "email" ? formEmailBody.trim() : null,
    };

    if (!editingId) {
      const { data, error } = await supabase.from("leads").insert(payload).select("*").single<LeadRow>();
      if (error) {
        window.alert("Failed saving lead: " + error.message);
        return;
      }
      setLeads((prev) => [fromLeadRow(data), ...prev]);
    } else {
      const { data, error } = await supabase.from("leads").update(payload).eq("id", editingId).select("*").single<LeadRow>();
      if (error) {
        window.alert("Failed updating lead: " + error.message);
        return;
      }
      const updated = fromLeadRow(data);
      setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    }
    setOpenAddEdit(false);
  }

  // ---- CSV logic (simplistic update)
  function handleExportCsv() {
    const headers = ["id","name","email","phone","source","priority","last_contacted","project","type","subject"];
    const rows = filteredLeads.map(l => [l.id, l.name, l.email, l.phone, l.source, l.priority, l.lastContacted, l.project, l.leadType, l.subjectLine]);
    const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${new Date().toISOString().slice(0,10)}.csv`;
    a.click();
  }

  async function handleImportCsv(file: File) {
     window.alert("Import logic skipped in this refactor. Use manual entry or update SQL.");
  }

  // ---- Computed
  const hotCount = leads.filter((l) => l.priority === "Hot").length;
  const warmCount = leads.filter((l) => l.priority === "Warm").length;
  const coldCount = leads.filter((l) => l.priority === "Cold").length;

  const filteredLeads = React.useMemo(() => {
    return leads.filter((lead) => {
      const q = search.toLowerCase().trim();
      const matchesSearch = q === "" ? true : [lead.name, lead.email, lead.phone, lead.project].join(" ").toLowerCase().includes(q);
      const matchesPriority = priorityFilter === "all" ? true : lead.priority === priorityFilter;
      return matchesSearch && matchesPriority;
    });
  }, [leads, search, priorityFilter]);

  const emailLeads = filteredLeads.filter(l => l.leadType === "email");
  const contactLeads = filteredLeads.filter(l => l.leadType === "contact");

  const commonHeaders = [
    { key: "name", label: "Name", className: "py-3 pl-4 pr-2 text-left font-medium" },
    { key: "email", label: "Email", className: "py-3 px-2 text-left font-medium" },
    { key: "phone", label: "Phone", className: "py-3 px-2 text-left font-medium" },
    { key: "source", label: "Source", className: "py-3 px-2 text-left font-medium" },
    { key: "priority", label: "Priority", className: "py-3 px-2 text-left font-medium" },
    { key: "project", label: "Brand / Project", className: "py-3 px-2 text-left font-medium" },
  ];

  const emailSectionHeaders = [
    ...commonHeaders,
    { key: "subject", label: "Subject", className: "py-3 px-2 text-left font-medium" },
    { key: "body", label: "Email Body", className: "py-3 px-2 text-left font-medium" },
    { key: "notes", label: "Notes", className: "py-3 px-2 text-left font-medium" },
    { key: "last", label: "Last Contacted", className: "py-3 px-2 text-left font-medium" },
    { key: "actions", label: "Actions", className: "py-3 px-2 text-left font-medium" },
  ];

  const contactSectionHeaders = [
    ...commonHeaders,
    { key: "notes", label: "Notes", className: "py-3 px-2 text-left font-medium" },
    { key: "last", label: "Last Contacted", className: "py-3 px-2 text-left font-medium" },
    { key: "actions", label: "Actions", className: "py-3 px-2 text-left font-medium" },
  ];

  return (
    <>
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 p-4 sm:p-6 bg-[radial-gradient(circle_at_20%_20%,hsl(var(--primary)/0.06)_0%,transparent_60%)]">
        
        {/* Header */}
        <section className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold tracking-tight">Leads Management</h1>
            <p className="text-sm text-muted-foreground">Manage your inbound campaign leads</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleExportCsv} className="h-9 gap-2">
              <Download className="h-4 w-4" /> Export CSV
            </Button>
            <Button size="sm" onClick={openAddDrawer} className="h-9 gap-2 bg-indigo-600 hover:bg-indigo-700">
              <Plus className="h-4 w-4" /> Add Lead
            </Button>
            <Button variant="outline" size="sm" onClick={() => { setOpenTrash(true); fetchTrashed(); }} className="h-9 gap-2">
              <Trash2 className="h-4 w-4" /> Trash
            </Button>
          </div>
        </section>

        {/* Filters/Stats */}
        <Card className="border-border/60">
          <CardContent className="p-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9 h-10" placeholder="Search leads..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex gap-2">
                <StatCard label="Hot" value={hotCount} tone="red" />
                <StatCard label="Warm" value={warmCount} tone="amber" />
                <StatCard label="Cold" value={coldCount} tone="blue" />
              </div>
              <Select value={priorityFilter} onValueChange={(v) => setPriorityFilter(v as any)}>
                <SelectTrigger className="w-[140px] h-10"><SelectValue placeholder="Priority" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="Hot">Hot</SelectItem>
                  <SelectItem value="Warm">Warm</SelectItem>
                  <SelectItem value="Cold">Cold</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="ghost" size="sm" onClick={handleResetFilters} className="h-10 text-xs">Reset</Button>
            </div>
          </CardContent>
        </Card>

        {/* Email Leads Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 px-1">
            <div className="h-5 w-1.5 rounded-full bg-indigo-600" />
            <h2 className="text-xl font-bold tracking-tight">Email Based Leads</h2>
            <span className="text-xs font-semibold bg-indigo-50 text-indigo-700 px-2.5 py-0.5 rounded-full ring-1 ring-indigo-200">
              {emailLeads.length} Total
            </span>
          </div>

          <Card className="overflow-hidden border-border/60 shadow-lg">
            <CardContent className="p-0">
               {/* Desktop */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border/60 text-[11px] uppercase font-bold text-muted-foreground">
                      {emailSectionHeaders.map(h => <th key={h.key} className={h.className}>{h.label}</th>)}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {emailLeads.length === 0 ? (
                      <tr><td colSpan={emailSectionHeaders.length} className="py-12 text-center text-muted-foreground">No email leads found</td></tr>
                    ) : (
                      emailLeads.map((l, i) => (
                        <tr key={l.id} className={cn("hover:bg-muted/30 transition-colors", i % 2 && "bg-muted/5")}>
                          <LeadRowItems lead={l} type="email" onEdit={() => openEditDrawer(l)} onTrash={() => moveToTrash(l.id)} onConvert={() => convertToFollowUp(l)} />
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {/* Mobile */}
              <div className="md:hidden p-3 space-y-3">
                {emailLeads.map(l => <MobileLeadCard key={l.id} lead={l} onEdit={() => openEditDrawer(l)} onTrash={() => moveToTrash(l.id)} onConvert={() => convertToFollowUp(l)} />)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Leads Section */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2 px-1">
            <div className="h-5 w-1.5 rounded-full bg-emerald-600" />
            <h2 className="text-xl font-bold tracking-tight">Contact Based Leads</h2>
            <span className="text-xs font-semibold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full ring-1 ring-emerald-200">
              {contactLeads.length} Total
            </span>
          </div>

          <Card className="overflow-hidden border-border/60 shadow-lg">
            <CardContent className="p-0">
              {/* Desktop */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-muted/50 border-b border-border/60 text-[11px] uppercase font-bold text-muted-foreground">
                      {contactSectionHeaders.map(h => <th key={h.key} className={h.className}>{h.label}</th>)}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/40">
                    {contactLeads.length === 0 ? (
                      <tr><td colSpan={contactSectionHeaders.length} className="py-12 text-center text-muted-foreground">No contact leads found</td></tr>
                    ) : (
                      contactLeads.map((l, i) => (
                        <tr key={l.id} className={cn("hover:bg-muted/30 transition-colors", i % 2 && "bg-muted/5")}>
                          <LeadRowItems lead={l} type="contact" onEdit={() => openEditDrawer(l)} onTrash={() => moveToTrash(l.id)} onConvert={() => convertToFollowUp(l)} />
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
              {/* Mobile */}
              <div className="md:hidden p-3 space-y-3">
                {contactLeads.map(l => <MobileLeadCard key={l.id} lead={l} onEdit={() => openEditDrawer(l)} onTrash={() => moveToTrash(l.id)} onConvert={() => convertToFollowUp(l)} />)}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center pb-8 border-t border-border/60 pt-6">
           <p className="text-xs text-muted-foreground">Found {filteredLeads.length} leads in total</p>
        </div>
      </div>

      {/* Side Panels */}
      <SidePanel
        open={openAddEdit}
        onOpenChange={setOpenAddEdit}
        title={editingId ? "Edit Lead" : "Add Lead"}
        description={editingId ? "Modify specific details for this prospect" : "Create a new lead manually"}
        footer={
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setOpenAddEdit(false)}>Cancel</Button>
            <Button className="bg-indigo-600 hover:bg-indigo-700" onClick={handleSaveLead}>
               {editingId ? "Update Lead" : "Create Lead"}
            </Button>
          </div>
        }
      >
        <div className="space-y-4 py-2">
           <div className="space-y-2">
              <Label>Lead Type</Label>
              <Select value={formLeadType} onValueChange={(v) => setFormLeadType(v as any)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="contact">Contact Based</SelectItem>
                  <SelectItem value="email">Email Based</SelectItem>
                </SelectContent>
              </Select>
           </div>

           {formLeadType === "email" && (
             <div className="space-y-4 p-3 bg-muted/40 rounded-lg border border-border/40">
                <div className="space-y-1.5">
                  <Label>Subject Line</Label>
                  <Input placeholder="eg. Inquiry for SEO services" value={formSubjectLine} onChange={(e) => setFormSubjectLine(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Email Body</Label>
                  <textarea className="w-full min-h-[120px] rounded-md border border-input bg-background p-3 text-xs" placeholder="Paste full email यहाँ..." value={formEmailBody} onChange={(e) => setFormEmailBody(e.target.value)} />
                </div>
             </div>
           )}

           <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5"><Label>Name *</Label><Input value={formName} onChange={e => setFormName(e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Phone *</Label><Input value={formPhone} onChange={e => setFormPhone(e.target.value)} /></div>
           </div>

           <div className="space-y-1.5"><Label>Email</Label><Input value={formEmail} onChange={e => setFormEmail(e.target.value)} /></div>

           <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label>Source</Label>
                <Select value={formSource} onValueChange={setFormSource}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                  <SelectItem value="facebook ads">FB Ads</SelectItem><SelectItem value="google ads">Google Ads</SelectItem><SelectItem value="website">Website</SelectItem>
                </SelectContent></Select>
              </div>
              <div className="space-y-1.5">
                <Label>Priority</Label>
                <Select value={formPriority} onValueChange={v => setFormPriority(v as any)}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>
                  <SelectItem value="Hot">Hot</SelectItem><SelectItem value="Warm">Warm</SelectItem><SelectItem value="Cold">Cold</SelectItem>
                </SelectContent></Select>
              </div>
           </div>

           <div className="space-y-1.5"><Label>Brand / Project</Label><Input value={formProject} onChange={e => setFormProject(e.target.value)} /></div>
           <div className="space-y-1.5"><Label>Notes</Label><textarea className="w-full min-h-[60px] rounded-md border border-input bg-background p-2 text-xs" value={formNotes} onChange={e => setFormNotes(e.target.value)} /></div>
        </div>
      </SidePanel>

      <SidePanel
        open={openTrash}
        onOpenChange={setOpenTrash}
        title="Trashed Leads"
        description="Review or restore deleted leads"
        footer={<Button variant="outline" onClick={() => setOpenTrash(false)}>Close</Button>}
      >
        {trashLoading ? <p>Loading...</p> : trashedLeads.length === 0 ? <p className="text-muted-foreground text-center py-8">Trash is empty</p> : (
          <div className="divide-y divide-border/60">
            {trashedLeads.map((t) => (
              <div key={t.id} className="py-3 flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-medium truncate">{t.name}</p>
                  <p className="text-[10px] text-muted-foreground">{t.phone} | {t.leadType}</p>
                </div>
                <div className="flex gap-1.5">
                   <Button size="sm" variant="ghost" onClick={() => restoreFromTrash(t.id)}><RotateCcw className="h-4 w-4" /></Button>
                   <Button size="sm" variant="ghost" className="text-red-600" onClick={() => deletePermanently(t.id)}><Trash2 className="h-4 w-4" /></Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </SidePanel>
    </>
  );
}

function StatCard({ label, value, tone }: { label: string; value: number; tone: "red" | "amber" | "blue" }) {
  const colors = {
    red: "bg-red-500",
    amber: "bg-amber-400",
    blue: "bg-blue-500"
  };
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border/40 bg-muted/20">
      <div className={cn("h-2 w-2 rounded-full", colors[tone])} />
      <span className="text-[11px] font-bold text-muted-foreground uppercase">{label}</span>
      <span className="text-sm font-bold ml-1">{value}</span>
    </div>
  );
}
