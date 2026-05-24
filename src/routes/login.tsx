import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({ meta: [{ title: "Studio Login — ATVAGA Designs" }, { name: "robots", content: "noindex" }] }),
});

function Login() {
  const navigate = Route.useNavigate();
  const { user, isAdmin, loading } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && user && isAdmin) navigate({ to: "/admin" });
  }, [user, isAdmin, loading, navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    if (mode === "signin") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Signed in");
      navigate({ to: "/admin" });
    } else {
      const { error } = await supabase.auth.signUp({
        email, password,
        options: { emailRedirectTo: `${window.location.origin}/admin` },
      });
      setBusy(false);
      if (error) return toast.error(error.message);
      toast.success("Account created. An administrator must grant you admin role.");
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-secondary px-6">
      <div className="w-full max-w-sm bg-background border border-border p-10">
        <p className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">Studio Access</p>
        <h1 className="mt-4 font-display text-3xl">{mode === "signin" ? "Sign in" : "Create account"}</h1>

        <form onSubmit={submit} className="mt-8 space-y-5">
          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Email</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-transparent border-b border-border focus:border-foreground py-2 outline-none text-sm" />
          </div>
          <div>
            <label className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-2">Password</label>
            <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-transparent border-b border-border focus:border-foreground py-2 outline-none text-sm" />
          </div>
          <button disabled={busy} className="w-full py-3 bg-foreground text-background text-[10px] uppercase tracking-[0.3em] disabled:opacity-60">
            {busy ? "…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="mt-6 text-[10px] uppercase tracking-[0.25em] text-muted-foreground link-underline">
          {mode === "signin" ? "Need an account? Create one" : "Have an account? Sign in"}
        </button>
      </div>
    </section>
  );
}
