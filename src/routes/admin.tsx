import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { Trash2, Plus, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  component: Admin,
  head: () => ({ meta: [{ title: "Studio CMS — Asti Designs" }, { name: "robots", content: "noindex" }] }),
});

function Admin() {
  const navigate = useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [tab, setTab] = useState<"leads" | "portfolio">("leads");

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/login" });
  }, [user, loading, navigate]);

  if (loading) return <Centered>Loading…</Centered>;
  if (!user) return null;
  if (!isAdmin) return (
    <Centered>
      <p className="font-display text-2xl">Awaiting admin access</p>
      <p className="mt-2 text-sm text-muted-foreground max-w-sm text-center">Your account is signed in but does not yet have admin privileges. Contact the studio owner to grant access.</p>
      <button onClick={() => supabase.auth.signOut()} className="mt-6 text-[10px] uppercase tracking-[0.3em] link-underline">Sign out</button>
    </Centered>
  );

  return (
    <div className="min-h-screen bg-secondary">
      <header className="bg-background border-b border-border">
        <div className="container-luxe flex items-center justify-between h-16">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-display text-xl">Asti</span>
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
          {(["leads","portfolio"] as const).map(t => (
            <button key={t} onClick={() => setTab(t)} className={`py-4 text-[10px] uppercase tracking-[0.3em] border-b-2 transition ${tab === t ? "border-foreground" : "border-transparent text-muted-foreground"}`}>
              {t}
            </button>
          ))}
        </div>
      </header>

      <div className="container-luxe py-10">
        {tab === "leads" ? <LeadsPanel /> : <PortfolioPanel />}
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
      <h2 className="font-display text-3xl mb-6">Leads <span className="text-muted-foreground text-base">· {leads.length}</span></h2>
      {isLoading ? <p className="text-sm text-muted-foreground">Loading…</p> : leads.length === 0 ? (
        <div className="bg-background border border-border p-10 text-center text-muted-foreground text-sm">No leads yet.</div>
      ) : (
        <div className="space-y-3">
          {leads.map(l => (
            <div key={l.id} className="bg-background border border-border p-6 grid md:grid-cols-12 gap-4">
              <div className="md:col-span-3">
                <p className="font-display text-lg">{l.name}</p>
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

  const add = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    const slug = newTitle.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const { error } = await supabase.from("portfolio_items").insert({
      title: newTitle.trim(),
      slug,
      category: newCat,
      display_order: (items[items.length - 1]?.display_order ?? 0) + 1,
    });
    if (error) return toast.error(error.message);
    setNewTitle("");
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
      <h2 className="font-display text-3xl mb-6">Portfolio</h2>
      <form onSubmit={add} className="bg-background border border-border p-6 flex flex-wrap gap-3 items-end mb-6">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">New technique</label>
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
            <div className="md:col-span-1 aspect-square placeholder-tile" />
            <input defaultValue={it.title} onBlur={e => e.target.value !== it.title && update(it.id, { title: e.target.value })} className="md:col-span-3 bg-transparent border-b border-border focus:border-foreground py-2 outline-none text-sm" />
            <input defaultValue={it.category} onBlur={e => e.target.value !== it.category && update(it.id, { category: e.target.value })} className="md:col-span-2 bg-transparent border-b border-border focus:border-foreground py-2 outline-none text-sm" />
            <input defaultValue={it.image_url ?? ""} placeholder="Image URL" onBlur={e => update(it.id, { image_url: e.target.value || null })} className="md:col-span-4 bg-transparent border-b border-border focus:border-foreground py-2 outline-none text-sm" />
            <input type="number" defaultValue={it.display_order} onBlur={e => update(it.id, { display_order: Number(e.target.value) })} className="md:col-span-1 bg-transparent border-b border-border focus:border-foreground py-2 outline-none text-sm" />
            <button onClick={() => remove(it.id)} className="md:col-span-1 text-muted-foreground hover:text-destructive justify-self-end"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
      <p className="mt-6 text-xs text-muted-foreground">Tip: paste any image URL in the Image URL field. Click outside the field to save.</p>
    </div>
  );
}
