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
  FileText,
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
type ProposalStatus = "pending" | "accepted" | "rejected";

type ServiceType = "Web Development" | "SEO" | "SMM" | "Ads";

type ProposalRow = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  service: string | null;
  status: "pending" | "accepted" | "rejected";
  source: string | null;
  project: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
};

type ProposalPdfRow = {
  id: string;
  proposal_id: string;
  file_name: string;
  file_url: string;
  uploaded_at: string;
};

type Proposal = {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  status: ProposalStatus;
  source: string;
  project: string;
  notes: string;
  createdAt: string;

  // for local state matching latest PDF visually
  latestPdfUrl?: string;
};

// ---------------- Utils ----------------
function toDisplayDate(iso?: string | null) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  return d.toLocaleDateString("en-GB");
}

function todayISODate() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function fromProposalRow(r: ProposalRow): Proposal {
  return {
    id: r.id,
    name: r.name,
    email: r.email ?? "-",
    phone: r.phone ?? "",
    service: r.service ?? "Web Development",
    status: r.status ?? "pending",
    source: r.source ?? "",
    project: r.project ?? "",
    notes: r.notes ?? "",
    createdAt: toDisplayDate(r.created_at),
  };
}

// ---------------- Status Badge ----------------
function StatusBadge({ status }: { status: string }) {
  const styleMap: Record<
    string,
    { bg: string; text: string; ring: string }
  > = {
    pending: {
      bg: "bg-amber-400/15",
      text: "text-amber-700 dark:text-amber-400",
      ring: "ring-amber-400/30",
    },
    accepted: {
      bg: "bg-emerald-500/10",
      text: "text-emerald-600 dark:text-emerald-400",
      ring: "ring-emerald-500/20 dark:ring-emerald-400/30",
    },
    rejected: {
      bg: "bg-red-500/10",
      text: "text-red-600 dark:text-red-400",
      ring: "ring-red-500/20 dark:ring-red-400/30",
    },
  };

  const style = styleMap[status?.toLowerCase()] || styleMap.pending;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium leading-none ring-1 capitalize",
        style.bg,
        style.text,
        style.ring
      )}
    >
      {status || "Pending"}
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
        className={cn(
          "max-w-[95vw] sm:max-w-md p-0 gap-0 border border-border bg-background shadow-xl",
          "rounded-xl"
        )}
      >
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


// ---------------- Page ----------------
export default function ProposalsPage() {
  const supabase = React.useMemo(() => createClient(), []);

  // data
  const [proposals, setProposals] = React.useState<Proposal[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  // trashed
  const [openTrash, setOpenTrash] = React.useState(false);
  const [trashedProposals, setTrashedProposals] = React.useState<Proposal[]>([]);
  const [trashLoading, setTrashLoading] = React.useState(false);

  // filters
  const [search, setSearch] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState<"all" | ProposalStatus>("all");

  // add/edit drawer
  const [openAddEdit, setOpenAddEdit] = React.useState(false);
  const [editingId, setEditingId] = React.useState<string | null>(null);

  // form
  const [formName, setFormName] = React.useState("");
  const [formPhone, setFormPhone] = React.useState("");
  const [formEmail, setFormEmail] = React.useState("");
  const [formService, setFormService] = React.useState("Web Development");
  const [formStatus, setFormStatus] = React.useState<ProposalStatus>("pending");
  const [formSource, setFormSource] = React.useState("facebook ads");
  const [formProject, setFormProject] = React.useState("");
  const [formNotes, setFormNotes] = React.useState("");

  // Pdfs state
  const [pdfs, setPdfs] = React.useState<ProposalPdfRow[]>([]);
  const [pdfsLoading, setPdfsLoading] = React.useState(false);
  const [uploadingPdf, setUploadingPdf] = React.useState(false);

  // ---- fetch
  async function fetchProposals() {
    setLoading(true);
    setErrorMsg(null);

    const { data: propsData, error } = await supabase
      .from("proposals")
      .select("*")
      .is("deleted_at", null)
      .order("created_at", { ascending: false });

    if (error) {
      setErrorMsg(error.message);
      setProposals([]);
      setLoading(false);
      return;
    }

    const { data: allPdfs } = await supabase.from("proposal_pdfs").select("*").order("uploaded_at", { ascending: false });

    const normalized: Proposal[] = (propsData as ProposalRow[]).map(r => {
      const p = fromProposalRow(r);
      const latestPdf = allPdfs?.find(pdf => pdf.proposal_id === r.id);
      if (latestPdf) {
        p.latestPdfUrl = latestPdf.file_url;
      }
      return p;
    });
    setProposals(normalized);
    setLoading(false);
  }

  async function fetchTrashed() {
    setTrashLoading(true);
    const { data, error } = await supabase
      .from("proposals")
      .select("*")
      .not("deleted_at", "is", null)
      .order("deleted_at", { ascending: false });

    if (error) {
      setTrashedProposals([]);
      setTrashLoading(false);
      return;
    }

    setTrashedProposals(((data as ProposalRow[]) ?? []).map(fromProposalRow));
    setTrashLoading(false);
  }

  React.useEffect(() => {
    void fetchProposals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- actions
  function handleResetFilters() {
    setSearch("");
    setStatusFilter("all");
  }

  // Convert → Client (DM services)
  async function convertToClient(proposal: Proposal) {
    try {
      const email = proposal.email === "-" ? null : proposal.email?.trim() || null;

      const { data: created, error: upsertErr } = await supabase
        .from("clients")
        .upsert(
          {
            name: proposal.name,
            email,
            phone: proposal.phone,
            project: proposal.project || null,
            service: (proposal.service as ServiceType) || "Web Development",
            follow_up: "On Demand", // arbitrary default once it's a client from a proposal
            joined: todayISODate(),
            active: true,
          },
          { onConflict: "phone,created_by", ignoreDuplicates: false }
        )
        .select("id")
        .single<{ id: string }>();

      if (upsertErr) {
        window.alert("Failed to convert: " + upsertErr.message);
        return;
      }

      const { error: archiveErr } = await supabase
        .from("proposals")
        .update({ deleted_at: new Date().toISOString() })
        .eq("id", proposal.id);

      if (archiveErr) {
        window.alert(
          "Client created, but failed to move proposal to Trash: " +
          archiveErr.message
        );
      }

      setProposals((prev) => prev.filter((l) => l.id !== proposal.id));
      window.alert(
        "Converted to client ✅" + (created?.id ? ` (id: ${created.id})` : "")
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e);
      window.alert("Unexpected error: " + msg);
    }
  }

  function openEditDrawer(proposal: Proposal) {
    setEditingId(proposal.id);
    setFormName(proposal.name);
    setFormPhone(proposal.phone);
    setFormEmail(proposal.email === "-" ? "" : proposal.email);
    setFormService(proposal.service || "Web Development");
    setFormStatus(proposal.status);
    setFormSource(proposal.source || "facebook ads");
    setFormProject(proposal.project || "");
    setFormNotes(proposal.notes || "");

    setOpenAddEdit(true);

    setPdfsLoading(true);
    setPdfs([]);
    supabase.from("proposal_pdfs").select("*").eq("proposal_id", proposal.id).order("uploaded_at", { ascending: false })
      .then(({ data }) => {
        setPdfs(data || []);
        setPdfsLoading(false);
      });
  }

  function openAddDrawer() {
    setEditingId(null);
    setFormName("");
    setFormPhone("");
    setFormEmail("");
    setFormService("Web Development");
    setFormStatus("pending");
    setFormSource("facebook ads");
    setFormProject("");
    setFormNotes("");
    setPdfs([]);
    setOpenAddEdit(true);
  }

  async function moveToTrash(id: string) {
    const { error } = await supabase
      .from("proposals")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      window.alert("Failed moving to trash: " + error.message);
      return;
    }
    setProposals((prev) => prev.filter((l) => l.id !== id));
  }

  async function restoreFromTrash(id: string) {
    const { error } = await supabase
      .from("proposals")
      .update({ deleted_at: null })
      .eq("id", id);
    if (error) {
      window.alert("Failed to restore: " + error.message);
      return;
    }
    setTrashedProposals((prev) => prev.filter((l) => l.id !== id));
    await fetchProposals();
  }

  async function deletePermanently(id: string) {
    if (!window.confirm("Delete permanently? This cannot be undone.")) return;
    const { error } = await supabase.from("proposals").delete().eq("id", id);
    if (error) {
      window.alert("Failed to delete permanently: " + error.message);
      return;
    }
    setTrashedProposals((prev) => prev.filter((l) => l.id !== id));
  }

  async function handleSaveProposal() {
    if (!formName.trim() || !formPhone.trim()) {
      window.alert("Name and phone are required");
      return;
    }

    const base = {
      name: formName.trim(),
      phone: formPhone.trim(),
      email: formEmail.trim() || null,
      service: formService.trim() || "Web Development",
      status: formStatus,
      source: formSource.trim() || "facebook ads",
      project: formProject.trim() || null,
      notes: formNotes.trim() || null,
    };

    if (!editingId) {
      const { data, error } = await supabase
        .from("proposals")
        .insert(base)
        .select("*")
        .single<ProposalRow>();
      if (error) {
        window.alert("Failed saving proposal: " + error.message);
        return;
      }
      setProposals((prev) => [fromProposalRow(data), ...prev]);
    } else {
      const { data, error } = await supabase
        .from("proposals")
        .update(base)
        .eq("id", editingId)
        .select("*")
        .single<ProposalRow>();

      if (error) {
        window.alert("Failed updating proposal: " + error.message);
        return;
      }
      const updated = fromProposalRow(data);
      // carry over pdf if existed
      updated.latestPdfUrl = proposals.find(p => p.id === updated.id)?.latestPdfUrl;
      setProposals((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
    }

    setOpenAddEdit(false);
  }

  async function handlePdfUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!editingId) return;
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingPdf(true);
    const path = `${editingId}/${Date.now()}_${file.name}`;
    const { error: uploadError } = await supabase.storage.from("proposals_pdfs").upload(path, file);

    if (uploadError) {
      window.alert("Upload failed: " + uploadError.message);
      setUploadingPdf(false);
      return;
    }

    const { data: urlData } = supabase.storage.from("proposals_pdfs").getPublicUrl(path);
    const publicUrl = urlData.publicUrl;

    const { data: newPdf, error: insertError } = await supabase.from("proposal_pdfs").insert({
      proposal_id: editingId,
      file_name: file.name,
      file_url: publicUrl
    }).select("*").single<ProposalPdfRow>();

    if (insertError) {
      window.alert("Failed to save record: " + insertError.message);
    } else if (newPdf) {
      setPdfs(prev => [newPdf, ...prev]);
      // Update listing with new pdf
      setProposals((prev) => prev.map((p) => p.id === editingId ? { ...p, latestPdfUrl: publicUrl } : p));
    }

    setUploadingPdf(false);
    e.target.value = ""; // clear input
  }

  async function handleDeletePdf(pdfId: string, _fileName: string) {
    // optional: also delete from storage if desired. 
    // for now we just delete DB record.
    await supabase.from("proposal_pdfs").delete().eq("id", pdfId);
    setPdfs(prev => prev.filter(p => p.id !== pdfId));
  }

  // ---- computed
  const pendingCount = proposals.filter((l) => l.status === "pending").length;
  const acceptedCount = proposals.filter((l) => l.status === "accepted").length;
  const rejectedCount = proposals.filter((l) => l.status === "rejected").length;

  const filteredProposals = React.useMemo(() => {
    return proposals.filter((proposal) => {
      const q = search.toLowerCase().trim();
      const matchesSearch =
        q.length === 0
          ? true
          : [
            proposal.name,
            proposal.email,
            proposal.phone,
            proposal.service,
            proposal.source,
            proposal.project,
            proposal.notes,
          ]
            .join(" ")
            .toLowerCase()
            .includes(q);
      const matchesStatus =
        statusFilter === "all" ? true : proposal.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [proposals, search, statusFilter]);

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
        key: "service",
        label: "Service",
        className: "py-3 px-2 text-left font-medium",
      },
      {
        key: "latest_pdf",
        label: "Proposal PDFs",
        className: "py-3 px-2 text-left font-medium",
      },
      {
        key: "status",
        label: "Status",
        className: "py-3 px-2 text-left font-medium",
      },
      {
        key: "created",
        label: "Created",
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
                  <h1 className="text-xl font-semibold leading-none tracking-[-0.03em]">
                    Proposals
                  </h1>
                </div>
                <span className="leading-none text-xs text-muted-foreground">
                  Follow Ups converted to finalized proposals
                </span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                size="sm"
                className="h-9 gap-2 rounded-lg bg-indigo-600 text-[13px] font-medium text-white shadow-sm active:scale-[0.99] hover:bg-indigo-700"
                onClick={openAddDrawer}
              >
                <Plus className="h-4 w-4" />
                <span>Add Proposal</span>
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
                    placeholder="Search name, email, phone, brand..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>

                <div className="flex flex-row items-center gap-2 sm:hidden">
                  <Select
                    value={statusFilter}
                    onValueChange={(val) =>
                      setStatusFilter(val as "all" | ProposalStatus)
                    }
                  >
                    <SelectTrigger className="h-9 w-full rounded-lg text-sm">
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="accepted">Accepted</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
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

              <div className="hidden flex-none items-start gap-2 sm:flex">
                <Select
                  value={statusFilter}
                  onValueChange={(val) =>
                    setStatusFilter(val as "all" | ProposalStatus)
                  }
                >
                  <SelectTrigger className="h-9 min-w-[130px] rounded-lg text-sm">
                    <SelectValue placeholder="All Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="accepted">Accepted</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
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
              <StatCard label="Pending" value={pendingCount} tone="amber" />
              <StatCard label="Accepted" value={acceptedCount} tone="blue" />
              <StatCard label="Rejected" value={rejectedCount} tone="red" />
            </div>

            {loading && (
              <p className="text-xs text-muted-foreground">Loading…</p>
            )}
            {errorMsg && (
              <p className="text-xs text-red-500">Error: {errorMsg}</p>
            )}
          </CardContent>
        </Card>

        {/* TABLE */}
        <Card className="overflow-hidden border-border/60 bg-background shadow-sm">
          <CardHeader className="border-b border-border/60 px-4 py-3">
            <CardTitle className="flex flex-col text-[13px] font-medium text-muted-foreground sm:flex-row sm:items-center sm:gap-2">
              <span className="text-sm font-semibold leading-none text-foreground">
                Proposals List
              </span>
              <span className="text-[11px] leading-none">
                {filteredProposals.length} result
                {filteredProposals.length === 1 ? "" : "s"}
              </span>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-0">
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
                  {filteredProposals.length === 0 ? (
                    <tr>
                      <td
                        className="px-4 py-10 text-center text-sm text-muted-foreground"
                        colSpan={tableHeaders.length}
                      >
                        {loading ? "Loading…" : "No proposals match your filters"}
                      </td>
                    </tr>
                  ) : (
                    filteredProposals.map((proposal, idx) => (
                      <tr
                        key={proposal.id}
                        className={cn(
                          "group border-b border-border/60 transition-colors",
                          "hover:bg-muted/30",
                          idx % 2 === 1 ? "bg-muted/10" : "bg-transparent"
                        )}
                      >
                        <td className="py-4 pl-4 pr-2 align-top font-medium leading-[1.2]">
                          <div className="flex flex-col">
                            <span className="truncate cursor-pointer hover:underline text-indigo-600" onClick={() => openEditDrawer(proposal)}>
                              {proposal.name}
                            </span>
                            <span className="text-[11px] font-normal text-muted-foreground">
                              ID #{proposal.id.slice(0, 8)}
                            </span>
                          </div>
                        </td>
                        <td className="break-all py-4 px-2 align-top leading-[1.2] text-muted-foreground">
                          {proposal.email || "-"}
                        </td>
                        <td className="whitespace-nowrap py-4 px-2 align-top leading-[1.2]">
                          {proposal.phone || "-"}
                        </td>
                        <td className="py-4 px-2 align-top leading-[1.2] text-muted-foreground">
                          {proposal.service || "-"}
                        </td>
                        <td className="py-4 px-2 align-top leading-[1.2]">
                          {proposal.latestPdfUrl ? (
                            <a href={proposal.latestPdfUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-indigo-600 hover:underline">
                              <FileText className="w-4 h-4" /> View PDF
                            </a>
                          ) : (
                            <span className="text-muted-foreground text-xs italic">No PDF uploaded</span>
                          )}
                        </td>
                        <td className="py-4 px-2 align-top leading-[1.2]">
                          <StatusBadge status={proposal.status} />
                        </td>
                        <td className="whitespace-nowrap py-4 px-2 align-top leading-[1.2] text-muted-foreground">
                          {proposal.createdAt}
                        </td>
                        <td className="py-4 px-2 align-top leading-[1.2]">
                          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 whitespace-nowrap rounded-md border-border bg-background/50 px-2 text-[12px] font-medium shadow-sm hover:bg-background"
                              onClick={() => void convertToClient(proposal)}
                            >
                              Convert → Client
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 whitespace-nowrap gap-1 rounded-md border-border bg-background/50 px-2 text-[12px] font-medium shadow-sm hover:bg-background"
                              onClick={() => openEditDrawer(proposal)}
                            >
                              <Pencil className="h-3.5 w-3.5" />
                              Edit
                            </Button>

                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 whitespace-nowrap gap-1 rounded-md border-red-300/60 bg-red-500/5 px-2 text-[12px] font-medium text-red-600 shadow-sm hover:bg-red-500/10"
                              onClick={() => void moveToTrash(proposal.id)}
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              <span className="hidden xl:inline">Move to Trash</span>
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="block md:hidden">
              <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                Mobile view omitted for brevity, please rotate screen or view on desktop.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ADD/EDIT DRAWER */}
      <SidePanel
        open={openAddEdit}
        onOpenChange={setOpenAddEdit}
        title={editingId ? "Proposal Details" : "Add Proposal"}
        description={editingId ? "View and edit full details & latest PDFs" : "Create a new proposal manually"}
        footer={
          <>
            <DialogClose asChild>
              <Button variant="outline" className="h-9 rounded-md border-border text-[13px]">Cancel</Button>
            </DialogClose>
            <Button className="h-9 rounded-md bg-indigo-600 text-[13px] font-medium text-white hover:bg-indigo-700" onClick={() => void handleSaveProposal()}>
              {editingId ? "Save Changes" : "Save Proposal"}
            </Button>
          </>
        }
      >
        <div className="grid gap-4 text-sm">
          <div className="grid gap-1.5">
            <Label className="text-[12px] font-medium">Client name *</Label>
            <Input className="h-9 text-sm" value={formName} onChange={(e) => setFormName(e.target.value)} />
          </div>

          <div className="grid gap-1.5">
            <Label className="text-[12px] font-medium">Phone *</Label>
            <Input className="h-9 text-sm" value={formPhone} onChange={(e) => setFormPhone(e.target.value)} />
          </div>

          <div className="grid gap-1.5">
            <Label className="text-[12px] font-medium">Email</Label>
            <Input className="h-9 text-sm" value={formEmail} onChange={(e) => setFormEmail(e.target.value)} />
          </div>

          <div className="grid gap-1.5">
            <Label className="text-[12px] font-medium">Service</Label>
            <Select value={formService} onValueChange={(val) => setFormService(val)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="SEO">SEO</SelectItem>
                <SelectItem value="SMM">SMM</SelectItem>
                <SelectItem value="Ads">Ads</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label className="text-[12px] font-medium">Status</Label>
            <Select value={formStatus} onValueChange={(val) => setFormStatus(val as ProposalStatus)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label className="text-[12px] font-medium">Brand / Project</Label>
            <Input className="h-9 text-sm" value={formProject} onChange={(e) => setFormProject(e.target.value)} />
          </div>

          <div className="grid gap-1.5">
            <Label className="text-[12px] font-medium">Notes</Label>
            <textarea className="min-h-[84px] rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm" value={formNotes} onChange={(e) => setFormNotes(e.target.value)} />
          </div>

          {editingId && (
            <div className="grid gap-2 border-t border-border pt-4 mt-2">
              <Label className="text-[14px] font-semibold text-foreground">Proposal PDFs</Label>

              <div className="flex gap-2 items-center mb-1">
                <Input type="file" accept="application/pdf" className="h-9 text-xs" onChange={(e) => void handlePdfUpload(e)} disabled={uploadingPdf} />
                {uploadingPdf && <span className="text-[10px] text-muted-foreground animate-pulse">Uploading...</span>}
              </div>

              {pdfsLoading ? <p className="text-xs text-muted-foreground">Loading PDFs...</p> : (
                <div className="flex flex-col gap-2 relative">
                  {pdfs.length === 0 ? (
                    <p className="text-xs text-muted-foreground italic">No PDFs uploaded yet. The first one you upload will be the active proposal.</p>
                  ) : pdfs.map((p, index) => (
                    <div key={p.id} className={cn("flex flex-col rounded p-2 text-sm border relative", index === 0 ? "border-indigo-500/40 bg-indigo-50/40" : "border-border bg-muted/20")}>
                      {index === 0 && <span className="absolute -top-2 left-2 px-1 text-[9px] bg-indigo-500 text-white rounded-full">Latest</span>}
                      <a href={p.file_url} target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline max-w-[200px] truncate font-medium">
                        {p.file_name}
                      </a>
                      <span className="text-[10px] text-muted-foreground">{new Date(p.uploaded_at).toLocaleString()}</span>
                      <Button variant="ghost" size="sm" className="absolute right-2 top-2 h-6 w-6 p-0 text-red-500" onClick={() => void handleDeletePdf(p.id, p.file_name)}>
                        <Trash2 className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </SidePanel>

      {/* TRASH DRAWER omitted for brevity... */}
      <SidePanel open={openTrash} onOpenChange={setOpenTrash} title="Trash" footer={<Button variant="outline" className="h-9" onClick={() => setOpenTrash(false)}>Close</Button>}>
        {trashLoading ? <p className="text-xs">Loading trash...</p> : trashedProposals.length === 0 ? <p className="text-sm">Nothing in trash</p> : (
          <div className="space-y-2">
            {trashedProposals.map((t) => (
              <div key={t.id} className="flex justify-between border border-border/60 p-2 text-sm">
                <span>{t.name}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="h-7 px-2" onClick={() => void restoreFromTrash(t.id)}>Restore</Button>
                  <Button size="sm" variant="outline" className="h-7 px-2 border-red-300 text-red-600" onClick={() => void deletePermanently(t.id)}>Delete</Button>
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
  const toneMap = {
    red: { ring: "ring-red-500/20", dot: "bg-red-500" },
    amber: { ring: "ring-amber-400/30", dot: "bg-amber-400" },
    blue: { ring: "ring-blue-500/20", dot: "bg-blue-500" },
  }[tone];

  return (
    <div className="flex items-start justify-between rounded-lg border border-border/60 bg-background/50 p-3 shadow-sm">
      <div className="flex items-center gap-2 text-[12px] font-medium text-muted-foreground">
        <span className={cn("h-1.5 w-1.5 rounded-full shadow-sm", toneMap.dot)} />
        <span>{label}</span>
      </div>
      <div className={cn("inline-flex rounded-md px-2 py-1 text-2xl font-semibold ring-1", toneMap.ring)}>
        {value}
      </div>
    </div>
  );
}
