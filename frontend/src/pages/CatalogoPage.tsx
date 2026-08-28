import { useEffect, useState } from "react";
import { api } from "../api";
import type { Livro } from "../api";
import { GradientText, LoadingSpinner } from "../components/ui";
import { MotionCard, Stagger, StaggerItem, FadeIn } from "../motion";

type Tab = "autores" | "editoras" | "categorias";

export default function CatalogoPage() {
  const [tab, setTab] = useState<Tab>("autores");
  const [autores, setAutores] = useState<{ id: number; nome: string }[]>([]);
  const [editoras, setEditoras] = useState<{ id: number; nome: string }[]>([]);
  const [categorias, setCategorias] = useState<{ id: number; nome: string }[]>([]);
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ nome: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get<{ id: number; nome: string }[]>("/autores/").catch(() => []),
      api.get<{ id: number; nome: string }[]>("/editoras/").catch(() => []),
      api.get<{ id: number; nome: string }[]>("/categorias/").catch(() => []),
      api.get<Livro[]>("/livros/").catch(() => []),
    ]).then(([a, e, c, l]) => { setAutores(a); setEditoras(e); setCategorias(c); setLivros(l); })
      .finally(() => setLoading(false));
  }, []);

  const getTabData = () => {
    if (tab === "autores") return { items: autores, reload: () => api.get<{ id: number; nome: string }[]>("/autores/").then(setAutores), endpoint: "/autores/" };
    if (tab === "editoras") return { items: editoras, reload: () => api.get<{ id: number; nome: string }[]>("/editoras/").then(setEditoras), endpoint: "/editoras/" };
    return { items: categorias, reload: () => api.get<{ id: number; nome: string }[]>("/categorias/").then(setCategorias), endpoint: "/categorias/" };
  };

  const { items, reload, endpoint } = getTabData();

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post(endpoint, { nome: form.nome });
      setForm({ nome: "" });
      reload();
    } catch { /* ignore */ } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Remover este item?")) return;
    const ep = tab === "autores" ? "/autores" : tab === "editoras" ? "/editoras" : "/categorias";
    await api.del(`${ep}/${id}`);
    reload();
  };

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: "autores", label: "Autores", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg> },
    { key: "editoras", label: "Editoras", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg> },
    { key: "categorias", label: "Categorias", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" /></svg> },
  ];

  return (
    <div className="space-y-6">
      <FadeIn>
        <h1 className="font-heading font-bold text-3xl text-[var(--color-fg)]"><GradientText>Catálogo</GradientText></h1>
        <p className="font-body text-[var(--color-muted-fg)] mt-1">Gerencie autores, editoras e categorias.</p>
      </FadeIn>

      {/* Tabs */}
      <FadeIn delay={0.05}>
        <div className="flex gap-2">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`clay-btn text-sm flex items-center gap-2 ${tab === t.key ? "clay-btn-primary" : "clay-btn-ghost"}`}
            >
              {t.icon}
              {t.label}
            </button>
          ))}
        </div>
      </FadeIn>

      {/* Create form */}
      <FadeIn delay={0.1}>
        <form onSubmit={handleCreate} className="flex gap-3">
          <input
            className="clay-input flex-1"
            placeholder={`Nome do ${tab === "autores" ? "autor" : tab === "editoras" ? "editora" : "categoria"}`}
            value={form.nome}
            onChange={(e) => setForm({ nome: e.target.value })}
            required
          />
          <button type="submit" disabled={saving} className="clay-btn clay-btn-accent disabled:opacity-60">
            {saving ? "Salvando…" : "+ Adicionar"}
          </button>
        </form>
      </FadeIn>

      {/* List */}
      {loading ? <LoadingSpinner /> : (
        <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item: { id: number; nome: string }) => (
            <StaggerItem key={item.id}>
              <MotionCard className="p-4 flex items-center justify-between" hover>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-[var(--radius-sm)] bg-[var(--color-primary)] flex items-center justify-center border-2 border-[#4338CA] shadow-md">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <span className="font-body font-bold text-[var(--color-fg)] text-sm">{item.nome}</span>
                </div>
                <button onClick={() => handleDelete(item.id)} className="text-[var(--color-muted-fg)] hover:text-[var(--color-destructive)] transition-colors p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </MotionCard>
            </StaggerItem>
          ))}
        </Stagger>
      )}

      {/* Livros with catalog info */}
      <FadeIn delay={0.15}>
        <h2 className="font-heading font-semibold text-lg text-[var(--color-fg)] mt-8 mb-4">Livros no acervo</h2>
      </FadeIn>
      {loading ? <LoadingSpinner /> : (
        <Stagger className="space-y-3">
          {livros.map((l) => (
            <StaggerItem key={l.id}>
              <MotionCard className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2" hover>
                <div>
                  <div className="font-body font-bold text-[var(--color-fg)]">{l.titulo}</div>
                  <div className="font-body text-xs text-[var(--color-muted-fg)]">
                    {l.autores?.map((a) => a.nome).join(", ") || "Sem autor"} · {l.editora?.nome || "Sem editora"}
                  </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {l.categoria && (
                    <span className="clay-badge clay-badge-primary">{l.categoria.nome}</span>
                  )}
                </div>
              </MotionCard>
            </StaggerItem>
          ))}
        </Stagger>
      )}
    </div>
  );
}
