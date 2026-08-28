import { useEffect, useState } from "react";
import { api } from "../api";
import type { Livro } from "../api";
import { GradientText, StatusBadge, LoadingSpinner, MotionModal } from "../components/ui";
import { MotionCard, Stagger, StaggerItem, FadeIn } from "../motion";

export default function LivrosPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editLivro, setEditLivro] = useState<Livro | null>(null);
  const [form, setForm] = useState({ titulo: "", autor: "", editora: "", quantidade: 1 });
  const [saving, setSaving] = useState(false);

  const load = () => {
    api.get<Livro[]>("/livros/").then(setLivros).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const openNew = () => { setEditLivro(null); setForm({ titulo: "", autor: "", editora: "", quantidade: 1 }); setShowModal(true); };
  const openEdit = (l: Livro) => { setEditLivro(l); setForm({ titulo: l.titulo, autor: l.autores?.[0]?.nome || "", editora: l.editora?.nome || "", quantidade: l.quantidade_total }); setShowModal(true); };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editLivro) {
        await api.put(`/livros/${editLivro.id}`, { titulo: form.titulo, quantidade_total: form.quantidade });
      } else {
        await api.post("/livros/", { titulo: form.titulo, quantidade_total: form.quantidade, quantidade_disponivel: form.quantidade });
      }
      setShowModal(false);
      load();
    } catch { /* ignore */ } finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Remover este livro?")) return;
    await api.del(`/livros/${id}`);
    load();
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
                  <button onClick={() => handleDelete(l.id)} className="clay-btn clay-btn-ghost text-xs text-[var(--color-destructive)] border-[var(--color-destructive)]/30 hover:bg-red-50">Remover</button>
                </div>
              </MotionCard>
            </StaggerItem>
          ))}
        </Stagger>
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
