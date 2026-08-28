import { useEffect, useState, useCallback } from "react";
import { api } from "../api";
import type { Livro } from "../api";
import { GradientText, StatusBadge, LoadingSpinner, MotionModal } from "../components/ui";
import { MotionCard, Stagger, StaggerItem, FadeIn } from "../motion";
import { useAuth } from "../AuthContext";

export default function LivrosPage() {
  const { user } = useAuth();
  const isAdmin = user?.is_admin;
  const [livros, setLivros] = useState<Livro[]>([]);
  const [autores, setAutores] = useState<{ id: number; nome: string }[]>([]);
  const [categorias, setCategorias] = useState<{ id: number; nome: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editLivro, setEditLivro] = useState<Livro | null>(null);
  const [form, setForm] = useState({ titulo: "", autor: "", editora: "", quantidade: 1 });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [filters, setFilters] = useState({ q: "", autor: "", categoria: "" });

  const load = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (filters.q) params.set("q", filters.q);
      if (filters.autor) params.set("autor", filters.autor);
      if (filters.categoria) params.set("categoria", filters.categoria);
      const qs = params.toString();
      const [l, a, c] = await Promise.all([
        api.get<Livro[]>(`/livros/${qs ? `?${qs}` : ""}`),
        api.get<{ id: number; nome: string }[]>("/autores/"),
        api.get<{ id: number; nome: string }[]>("/categorias/"),
      ]);
      setLivros(l);
      setAutores(a);
      setCategorias(c);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [filters]);

  useEffect(() => { load(); }, [load]);

  const openNew = () => { setEditLivro(null); setForm({ titulo: "", autor: "", editora: "", quantidade: 1 }); setShowModal(true); };
  const openEdit = (l: Livro) => { setEditLivro(l); setForm({ titulo: l.titulo, autor: l.autores?.[0]?.nome || "", editora: l.editora?.nome || "", quantidade: l.quantidade_total }); setShowModal(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      if (editLivro) {
        await api.put(`/livros/${editLivro.id}`, { titulo: form.titulo, quantidade_total: form.quantidade });
      } else {
        await api.post("/livros/", { titulo: form.titulo, quantidade_total: form.quantidade });
      }
      setShowModal(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar livro");
    } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Remover este livro?")) return;
    try {
      await api.del(`/livros/${id}`);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao remover livro");
    }
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading font-bold text-3xl text-[var(--color-fg)]"><GradientText>Livros</GradientText></h1>
            <p className="font-body text-[var(--color-muted-fg)] mt-1">Gerencie o acervo da biblioteca.</p>
          </div>
          <button onClick={openNew} className="clay-btn clay-btn-accent">+ Novo Livro</button>
        </div>
      </FadeIn>

      {loading ? <LoadingSpinner /> : (
        <>
          {error && (
            <div className="clay-badge clay-badge-danger w-full justify-center py-3 text-sm">{error}</div>
          )}

          {/* Filters */}
          <FadeIn>
            <div className="flex flex-wrap gap-3 mb-4">
              <input
                className="clay-input flex-1 min-w-[160px]"
                placeholder="Buscar por título..."
                value={filters.q}
                onChange={(e) => setFilters({ ...filters, q: e.target.value })}
              />
              <select
                className="clay-input min-w-[140px]"
                value={filters.autor}
                onChange={(e) => setFilters({ ...filters, autor: e.target.value })}
              >
                <option value="">Todos os autores</option>
                {autores.map((a) => <option key={a.id} value={a.nome}>{a.nome}</option>)}
              </select>
              <select
                className="clay-input min-w-[140px]"
                value={filters.categoria}
                onChange={(e) => setFilters({ ...filters, categoria: e.target.value })}
              >
                <option value="">Todas as categorias</option>
                {categorias.map((c) => <option key={c.id} value={c.nome}>{c.nome}</option>)}
              </select>
            </div>
          </FadeIn>

          <Stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {livros.map((l) => (
            <StaggerItem key={l.id}>
              <MotionCard className="p-5" hover>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--color-primary)] flex items-center justify-center border-2 border-[#4338CA] shadow-md">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                  <StatusBadge status={l.quantidade_disponivel > 0 ? "ativo" : "atrasado"} />
                </div>
                <h3 className="font-heading font-bold text-[var(--color-fg)] text-lg mb-1">{l.titulo}</h3>
                <p className="font-body text-sm text-[var(--color-muted-fg)] mb-3">
                  {l.autores?.map((a) => a.nome).join(", ") || "Sem autor"}
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="clay-badge clay-badge-primary">{l.quantidade_disponivel}/{l.quantidade_total} disponível</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(l)} className="clay-btn clay-btn-ghost text-xs flex-1">Editar</button>
                  {isAdmin && (
                    <button onClick={() => handleDelete(l.id)} className="clay-btn clay-btn-ghost text-xs text-[var(--color-destructive)] border-[var(--color-destructive)]/30 hover:bg-red-50">Remover</button>
                  )}
                </div>
              </MotionCard>
            </StaggerItem>
          ))}
        </Stagger>
        </>
      )}

      <MotionModal open={showModal} onClose={() => setShowModal(false)} title={editLivro ? "Editar Livro" : "Novo Livro"}>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <label className="block">
            <span className="font-body text-xs font-bold text-[var(--color-muted-fg)] uppercase tracking-wider mb-1.5 block">Título</span>
            <input className="clay-input" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} required />
          </label>
          <label className="block">
            <span className="font-body text-xs font-bold text-[var(--color-muted-fg)] uppercase tracking-wider mb-1.5 block">Quantidade</span>
            <input type="number" min={1} className="clay-input" value={form.quantidade} onChange={(e) => setForm({ ...form, quantidade: +e.target.value })} required />
          </label>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="clay-btn clay-btn-ghost flex-1">Cancelar</button>
            <button type="submit" disabled={saving} className="clay-btn clay-btn-primary flex-1 disabled:opacity-60">
              {saving ? "Salvando…" : "Salvar"}
            </button>
          </div>
        </form>
      </MotionModal>
    </div>
  );
}
