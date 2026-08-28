import { useEffect, useState } from "react";
import { api } from "../api";
import type { Emprestimo } from "../api";
import { GradientText, StatusBadge, LoadingSpinner, MotionModal } from "../components/ui";
import { MotionCard, Stagger, StaggerItem, FadeIn } from "../motion";

export default function EmprestimosPage() {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ matricula: "", livro_id: 0 });
  const [saving, setSaving] = useState(false);

  const load = () => {
    api.get<Emprestimo[]>("/emprestimos/").then(setEmprestimos).catch(() => {}).finally(() => setLoading(false));
  };
  useEffect(load, []);

  const handleEmprestar = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.post("/emprestimos/", { matricula: form.matricula, livro_id: form.livro_id });
      setShowModal(false);
      setForm({ matricula: "", livro_id: 0 });
      load();
    } catch { /* ignore */ } finally { setSaving(false); }
  };

  const handleDevolver = async (id: number) => {
    await api.put(`/emprestimos/${id}/devolver`);
    load();
  };

  return (
    <div className="space-y-6">
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading font-bold text-3xl text-[var(--color-fg)]"><GradientText>Empréstimos</GradientText></h1>
            <p className="font-body text-[var(--color-muted-fg)] mt-1">Registre e acompanhe empréstimos.</p>
          </div>
          <button onClick={() => setShowModal(true)} className="clay-btn clay-btn-accent">+ Novo Empréstimo</button>
        </div>
      </FadeIn>

      {loading ? <LoadingSpinner /> : (
        <Stagger className="space-y-3">
          {emprestimos.length === 0 ? (
            <FadeIn><p className="font-body text-[var(--color-muted-fg)] text-sm">Nenhum empréstimo registrado.</p></FadeIn>
          ) : emprestimos.map((e) => (
            <StaggerItem key={e.id}>
              <MotionCard className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3" hover>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-[var(--radius-sm)] flex items-center justify-center border-2 shadow-md ${e.status === "ativo" ? "bg-[var(--color-success)] border-[#15803D]" : e.status === "atrasado" ? "bg-[var(--color-destructive)] border-[#991B1B]" : "bg-[var(--color-primary)] border-[#4338CA]"}`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
                  </div>
                  <div>
                    <div className="font-body font-bold text-[var(--color-fg)] text-sm">{e.titulo_livro || "Livro"}</div>
                    <div className="font-body text-xs text-[var(--color-muted-fg)]">RA {e.matricula} · {new Date(e.data_emprestimo).toLocaleDateString("pt-BR")}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <StatusBadge status={e.status} />
                  {e.status === "ativo" && (
                    <button onClick={() => handleDevolver(e.id)} className="clay-btn clay-btn-primary text-xs py-1.5 px-3">Devolver</button>
                  )}
                  {e.multa && e.multa > 0 && (
                    <span className="clay-badge clay-badge-danger">R$ {e.multa.toFixed(2)}</span>
                  )}
                </div>
              </MotionCard>
            </StaggerItem>
          ))}
        </Stagger>
      )}

      <MotionModal open={showModal} onClose={() => setShowModal(false)} title="Novo Empréstimo">
        <form onSubmit={handleEmprestar} className="space-y-4 mt-4">
          <label className="block">
            <span className="font-body text-xs font-bold text-[var(--color-muted-fg)] uppercase tracking-wider mb-1.5 block">RA do Aluno</span>
            <input className="clay-input" value={form.matricula} onChange={(e) => setForm({ ...form, matricula: e.target.value })} required />
          </label>
          <label className="block">
            <span className="font-body text-xs font-bold text-[var(--color-muted-fg)] uppercase tracking-wider mb-1.5 block">ID do Livro</span>
            <input type="number" min={1} className="clay-input" value={form.livro_id || ""} onChange={(e) => setForm({ ...form, livro_id: +e.target.value })} required />
          </label>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => setShowModal(false)} className="clay-btn clay-btn-ghost flex-1">Cancelar</button>
            <button type="submit" disabled={saving} className="clay-btn clay-btn-primary flex-1 disabled:opacity-60">
              {saving ? "Salvando…" : "Emprestar"}
            </button>
          </div>
        </form>
      </MotionModal>
    </div>
  );
}
