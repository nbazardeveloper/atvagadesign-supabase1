import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import type { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import {
  Eye,
  EyeOff,
  GripVertical,
  Linkedin,
  LogOut,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type AdminTab = "leads" | "portfolio" | "team";
type TeamMember = Tables<"team_members">;
type TeamMemberInsert = TablesInsert<"team_members">;
type TeamMemberUpdate = TablesUpdate<"team_members">;

export const Route = createFileRoute("/admin")({
  component: Admin,
  head: () => ({ meta: [{ title: "Admin CMS — ATVAGA Design" }, { name: "robots", content: "noindex" }] }),
});

function Admin() {
  const navigate = Route.useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [tab, setTab] = useState<AdminTab>("leads");

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  if (loading) return <Centered>Loading…</Centered>;
  if (!user) return null;
  if (!isAdmin) return (
    <Centered>
      <p className="font-heading text-2xl">Awaiting admin access</p>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm text-center">Your account is signed in but does not yet have admin privileges. Contact the studio owner to grant access.</p>
      <button onClick={() => supabase.auth.signOut()} className="mt-6 text-[10px] uppercase tracking-[0.3em] link-underline">Sign out</button>
    </Centered>
  );

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-background border-b border-border">
        <div className="container-luxe flex items-center justify-between h-16">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-heading text-xl">ATVAGA</span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-muted-foreground">CMS</span>
          </Link>
          <div className="flex items-center gap-6">
            <span className="text-xs text-muted-foreground hidden sm:inline">{user.email}</span>
            <button onClick={() => supabase.auth.signOut().then(() => navigate({ to: "/login" }))} className="text-[10px] uppercase tracking-[0.3em] inline-flex items-center gap-2">
              <LogOut className="w-3 h-3" /> Sign out
            </button>
          </div>
        </div>
        <div className="container-luxe flex gap-6 border-t border-border">
          {(["leads", "portfolio", "team"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`py-4 text-[10px] uppercase tracking-[0.3em] border-b-2 transition ${tab === t ? "border-foreground" : "border-transparent text-muted-foreground"}`}>
              {t}
            </button>
          ))}
        </div>
      </header>

      <div className="container-luxe py-10">
        {tab === "leads" ? <LeadsPanel /> : tab === "portfolio" ? <PortfolioPanel /> : <TeamPanel />}
      </div>
    </div>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen flex flex-col items-center justify-center px-6">{children}</div>;
}

function LeadsPanel() {
  const qc = useQueryClient();
  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["leads"],
    queryFn: async () => {
      const { data, error } = await supabase.from("leads").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  const updateStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["leads"] });
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this lead?")) return;
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["leads"] });
    toast.success("Deleted");
  };

  return (
    <div>
      <h2 className="font-heading text-3xl mb-6">Leads <span className="text-muted-foreground text-base">· {leads.length}</span></h2>
      {isLoading ? <p className="text-sm text-muted-foreground">Loading…</p> : leads.length === 0 ? (
        <div className="bg-background border border-border p-10 text-center text-muted-foreground text-sm">No leads yet.</div>
      ) : (
        <div className="space-y-3">
          {leads.map(l => (
            <div key={l.id} className="bg-background border border-border p-6 grid md:grid-cols-12 gap-4">
              <div className="md:col-span-3">
                <p className="font-heading text-lg">{l.name}</p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(l.created_at).toLocaleString()}</p>
                <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-2">{l.source}</p>
              </div>
              <div className="md:col-span-3 text-sm">
                <p>{l.phone}</p>
                {l.email && <p className="text-muted-foreground">{l.email}</p>}
              </div>
              <div className="md:col-span-4 text-sm text-muted-foreground whitespace-pre-wrap">{l.project_details || "—"}</div>
              <div className="md:col-span-2 flex md:flex-col items-start gap-2">
                <select value={l.status} onChange={e => updateStatus(l.id, e.target.value)} className="text-xs border border-border px-2 py-1 bg-background">
                  <option value="new">new</option>
                  <option value="contacted">contacted</option>
                  <option value="quoted">quoted</option>
                  <option value="closed">closed</option>
                </select>
                <button onClick={() => remove(l.id)} className="text-muted-foreground hover:text-destructive" aria-label="Delete"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PortfolioPanel() {
  const qc = useQueryClient();
  const { data: items = [] } = useQuery({
    queryKey: ["portfolio_items_admin"],
    queryFn: async () => {
      const { data, error } = await supabase.from("portfolio_items").select("*").order("display_order");
      if (error) throw error;
      return data ?? [];
    },
  });

  const [newTitle, setNewTitle] = useState("");
  const [newCat, setNewCat] = useState("venetian");
  const [newImageUrl, setNewImageUrl] = useState<string | null>(null);

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const slug = newTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const { error } = await supabase.from("portfolio_items").insert({
      title: newTitle.trim(),
      slug,
      category: newCat,
      image_url: newImageUrl,
      display_order: (items[items.length - 1]?.display_order ?? 0) + 1,
    });
    if (error) return toast.error(error.message);
    setNewTitle("");
    setNewImageUrl(null);
    qc.invalidateQueries({ queryKey: ["portfolio_items_admin"] });
    qc.invalidateQueries({ queryKey: ["portfolio_items"] });
    qc.invalidateQueries({ queryKey: ["portfolio_items_home"] });
    toast.success("Added");
  };

  const update = async (id: string, patch: Partial<{ title: string; category: string; image_url: string | null; display_order: number; description: string | null; is_featured: boolean; slug: string }>) => {
    const { error } = await supabase.from("portfolio_items").update(patch).eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["portfolio_items_admin"] });
  };
  const remove = async (id: string) => {
    if (!confirm("Delete this item?")) return;
    const { error } = await supabase.from("portfolio_items").delete().eq("id", id);
    if (error) return toast.error(error.message);
    qc.invalidateQueries({ queryKey: ["portfolio_items_admin"] });
    toast.success("Deleted");
  };

  return (
    <div>
      <h2 className="font-heading text-3xl mb-6">Portfolio</h2>
      <form onSubmit={add} className="bg-background border border-border p-6 flex flex-wrap gap-4 items-end mb-6">
        <div>
          <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Image</label>
          <ImageUpload currentUrl={newImageUrl} onUpload={setNewImageUrl} bucket="project_images" />
        </div>
        <div className="flex-1 min-w-[180px]">
          <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Title</label>
          <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="Title" className="w-full bg-transparent border-b border-border focus:border-foreground py-2 outline-none text-sm" />
        </div>
        <div>
          <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Category</label>
          <input value={newCat} onChange={e => setNewCat(e.target.value)} className="bg-transparent border-b border-border focus:border-foreground py-2 outline-none text-sm" />
        </div>
        <button className="px-6 py-2.5 bg-foreground text-background text-[10px] uppercase tracking-[0.3em] inline-flex items-center gap-2"><Plus className="w-3 h-3" /> Add</button>
      </form>

      <div className="space-y-2">
        {items.map(it => (
          <div key={it.id} className="bg-background border border-border p-4 grid md:grid-cols-12 gap-3 items-center">
            <div className="md:col-span-1">
              <ImageUpload currentUrl={it.image_url} onUpload={(url) => update(it.id, { image_url: url })} bucket="project_images" />
            </div>
            <input defaultValue={it.title} onBlur={e => e.target.value !== it.title && update(it.id, { title: e.target.value })} className="md:col-span-3 bg-transparent border-b border-border focus:border-foreground py-2 outline-none text-sm" />
            <input defaultValue={it.category} onBlur={e => e.target.value !== it.category && update(it.id, { category: e.target.value })} className="md:col-span-2 bg-transparent border-b border-border focus:border-foreground py-2 outline-none text-sm" />
            <div className="md:col-span-4" />
            <input type="number" defaultValue={it.display_order} onBlur={e => update(it.id, { display_order: Number(e.target.value) })} className="md:col-span-1 bg-transparent border-b border-border focus:border-foreground py-2 outline-none text-sm" />
            <button onClick={() => remove(it.id)} className="md:col-span-1 text-muted-foreground hover:text-destructive justify-self-end"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

function TeamPanel() {
  const qc = useQueryClient();
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    bio: "",
    photo_url: "",
    linkedin_url: "",
  });

  const { data: members = [], isLoading } = useQuery({
    queryKey: ["team_members_admin"],
    queryFn: async () => {
      const { data, error } = await supabase.from("team_members").select("*").order("sort_order");
      if (error) throw error;
      return (data ?? []) as TeamMember[];
    },
  });

  const invalidateTeamQueries = async () => {
    await Promise.all([
      qc.invalidateQueries({ queryKey: ["team_members_admin"] }),
      qc.invalidateQueries({ queryKey: ["team_members_active"] }),
    ]);
  };

  const createMember = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newMember.name.trim() || !newMember.role.trim() || !newMember.bio.trim()) {
      toast.error("Name, role, and bio are required.");
      return;
    }

    setIsAdding(true);

    try {
      const payload: TeamMemberInsert = {
        name: newMember.name.trim(),
        role: newMember.role.trim(),
        bio: newMember.bio.trim(),
        photo_url: newMember.photo_url.trim() || null,
        linkedin_url: newMember.linkedin_url.trim() || null,
        sort_order: members.length > 0 ? Math.max(...members.map((member) => member.sort_order)) + 1 : 1,
        is_active: true,
      };

      const { error } = await supabase.from("team_members").insert(payload);
      if (error) throw error;

      setNewMember({ name: "", role: "", bio: "", photo_url: "", linkedin_url: "" });
      await invalidateTeamQueries();
      toast.success("Team member added");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Unable to add team member");
    } finally {
      setIsAdding(false);
    }
  };

  const updateMember = async (id: string, patch: TeamMemberUpdate, successMessage?: string) => {
    const { error } = await supabase.from("team_members").update(patch).eq("id", id);
    if (error) {
      toast.error(error.message);
      return false;
    }

    await invalidateTeamQueries();
    if (successMessage) toast.success(successMessage);
    return true;
  };

  const toggleActive = async (member: TeamMember) => {
    await updateMember(member.id, { is_active: !member.is_active }, member.is_active ? "Marked inactive" : "Marked active");
  };

  const deleteMember = async (member: TeamMember) => {
    const { error } = await supabase.from("team_members").delete().eq("id", member.id);
    if (error) {
      toast.error(error.message);
      return;
    }

    await invalidateTeamQueries();
    toast.success("Deleted");
  };

  const reorderMembers = async (targetId: string) => {
    if (!draggedId || draggedId === targetId) return;

    const sourceIndex = members.findIndex((member) => member.id === draggedId);
    const targetIndex = members.findIndex((member) => member.id === targetId);
    if (sourceIndex < 0 || targetIndex < 0) return;

    const reordered = [...members];
    const [draggedMember] = reordered.splice(sourceIndex, 1);
    reordered.splice(targetIndex, 0, draggedMember);

    const updates = reordered.map((member, index) =>
      supabase.from("team_members").update({ sort_order: index + 1 }).eq("id", member.id),
    );

    const results = await Promise.all(updates);
    const failed = results.find((result) => result.error);
    if (failed?.error) {
      toast.error(failed.error.message);
      return;
    }

    setDraggedId(null);
    await invalidateTeamQueries();
    toast.success("Team order updated");
  };

  return (
    <div>
      <div className="flex items-end justify-between gap-4 mb-6">
        <div>
          <h2 className="font-heading text-3xl">Team</h2>
          <p className="mt-2 text-sm text-muted-foreground">Manage the team grid shown on the About page.</p>
        </div>
        <p className="text-xs text-muted-foreground uppercase tracking-[0.25em]">{members.length} total</p>
      </div>

      <form onSubmit={createMember} className="bg-background border border-border p-6 grid gap-4 mb-8 lg:grid-cols-12">
        <div className="lg:col-span-3">
          <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Photo</label>
          <ImageUpload
            currentUrl={newMember.photo_url || null}
            onUpload={(url) => setNewMember((current) => ({ ...current, photo_url: url }))}
            bucket="team"
          />
        </div>

        <div className="lg:col-span-4 grid gap-4 content-start">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Name</label>
            <input
              value={newMember.name}
              onChange={(e) => setNewMember((current) => ({ ...current, name: e.target.value }))}
              className="w-full bg-transparent border-b border-border focus:border-foreground py-2 outline-none text-sm"
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Role</label>
            <input
              value={newMember.role}
              onChange={(e) => setNewMember((current) => ({ ...current, role: e.target.value }))}
              className="w-full bg-transparent border-b border-border focus:border-foreground py-2 outline-none text-sm"
              placeholder="Role or title"
            />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">LinkedIn URL</label>
            <input
              value={newMember.linkedin_url}
              onChange={(e) => setNewMember((current) => ({ ...current, linkedin_url: e.target.value }))}
              className="w-full bg-transparent border-b border-border focus:border-foreground py-2 outline-none text-sm"
              placeholder="https://www.linkedin.com/in/..."
            />
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col">
          <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Bio</label>
          <textarea
            value={newMember.bio}
            onChange={(e) => setNewMember((current) => ({ ...current, bio: e.target.value }))}
            className="min-h-[164px] w-full resize-y bg-transparent border border-border px-3 py-3 text-sm outline-none transition-colors focus:border-foreground"
            placeholder="2-3 lines about this team member"
          />
          <button disabled={isAdding} className="mt-4 self-start px-6 py-2.5 bg-foreground text-background text-[10px] uppercase tracking-[0.3em] inline-flex items-center gap-2 disabled:opacity-60">
            <Plus className="w-3 h-3" />
            {isAdding ? "Adding..." : "Add member"}
          </button>
        </div>
      </form>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : members.length === 0 ? (
        <div className="bg-background border border-border p-10 text-center text-muted-foreground text-sm">No team members yet.</div>
      ) : (
        <div className="space-y-4">
          {members.map((member) => (
            <div
              key={member.id}
              draggable
              onDragStart={() => setDraggedId(member.id)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => reorderMembers(member.id)}
              className={`bg-background border border-border p-5 transition ${draggedId === member.id ? "opacity-60" : "opacity-100"}`}
            >
              <div className="flex flex-col gap-5 xl:flex-row xl:items-start">
                <div className="flex items-start gap-4 xl:w-[280px]">
                  <button
                    type="button"
                    onMouseDown={() => setDraggedId(member.id)}
                    className="mt-1 cursor-grab text-muted-foreground hover:text-foreground"
                    aria-label={`Drag ${member.name}`}
                  >
                    <GripVertical className="w-4 h-4" />
                  </button>

                  <div className="h-18 w-18 shrink-0 overflow-hidden bg-secondary">
                    {member.photo_url ? (
                      <img src={member.photo_url} alt={member.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-[9px] uppercase tracking-[0.25em] text-muted-foreground">
                        No photo
                      </div>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{member.name}</p>
                    <p className="text-xs text-muted-foreground mt-1 truncate">{member.role}</p>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-3">Order {member.sort_order}</p>
                  </div>
                </div>

                <div className="flex-1 grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Name</label>
                    <input
                      defaultValue={member.name}
                      onBlur={(e) => e.target.value !== member.name && updateMember(member.id, { name: e.target.value.trim() })}
                      className="w-full bg-transparent border-b border-border focus:border-foreground py-2 outline-none text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Role</label>
                    <input
                      defaultValue={member.role}
                      onBlur={(e) => e.target.value !== member.role && updateMember(member.id, { role: e.target.value.trim() })}
                      className="w-full bg-transparent border-b border-border focus:border-foreground py-2 outline-none text-sm"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Bio</label>
                    <textarea
                      defaultValue={member.bio}
                      onBlur={(e) => e.target.value !== member.bio && updateMember(member.id, { bio: e.target.value.trim() })}
                      className="min-h-[96px] w-full resize-y bg-transparent border border-border px-3 py-3 text-sm outline-none transition-colors focus:border-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Photo</label>
                    <ImageUpload
                      currentUrl={member.photo_url}
                      onUpload={(url) => updateMember(member.id, { photo_url: url }, "Photo updated")}
                      bucket="team"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">LinkedIn URL</label>
                    <div className="flex items-center gap-2">
                      <input
                        defaultValue={member.linkedin_url ?? ""}
                        placeholder="https://www.linkedin.com/in/..."
                        onBlur={(e) => e.target.value !== (member.linkedin_url ?? "") && updateMember(member.id, { linkedin_url: e.target.value.trim() || null })}
                        className="w-full bg-transparent border-b border-border focus:border-foreground py-2 outline-none text-sm"
                      />
                      {member.linkedin_url ? (
                        <a href={member.linkedin_url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground" aria-label={`${member.name} LinkedIn`}>
                          <Linkedin className="w-4 h-4" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                  <div className="flex flex-wrap items-end gap-3">
                    <button
                      type="button"
                      onClick={() => toggleActive(member)}
                      className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-foreground"
                    >
                      {member.is_active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      {member.is_active ? "Active" : "Inactive"}
                    </button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button type="button" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] text-muted-foreground hover:text-destructive">
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete team member?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This removes {member.name} from the CMS and the About page.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => deleteMember(member)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="mt-6 text-xs text-muted-foreground">Drag a row by the grip icon to change the display order on the About page.</p>
    </div>
  );
}

/* ── Image Upload component ───────────────────────────────────────────── */
function ImageUpload({
  currentUrl,
  onUpload,
  bucket = "project_images",
  folder = "",
}: {
  currentUrl?: string | null;
  onUpload: (url: string) => void;
  bucket?: string;
  folder?: string;
}) {
  const [uploading, setUploading] = useState(false);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const ext = file.name.split(".").pop() ?? "jpg";
    const filename = `${Date.now()}.${ext}`;
    const path = folder ? `${folder}/${filename}` : filename;

    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: true });
    if (error) {
      toast.error("Upload failed: " + error.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(path);
    onUpload(data.publicUrl);
    setUploading(false);
    // reset input so same file can be re-selected
    e.target.value = "";
  };

  return (
    <div className="flex flex-col gap-2">
      {currentUrl && (
        <img src={currentUrl} alt="" className="h-20 w-20 object-cover border border-border" />
      )}
      <label className={`cursor-pointer inline-flex items-center gap-2 px-4 py-2 border border-border text-[10px] uppercase tracking-[0.25em] transition ${uploading ? "opacity-60 pointer-events-none" : "hover:border-foreground"}`}>
        <Upload className="w-3 h-3" />
        {uploading ? "Uploading…" : currentUrl ? "Change" : "Upload image"}
        <input type="file" accept="image/*" onChange={handleFile} className="hidden" disabled={uploading} />
      </label>
    </div>
  );
}
