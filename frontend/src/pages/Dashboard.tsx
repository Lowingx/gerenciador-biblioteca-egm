import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import type { Livro, Emprestimo } from "../api";
import { GradientText, StatusBadge, LoadingSpinner } from "../components/ui";
import { MotionCard, Stagger, StaggerItem, FadeIn } from "../motion";

export default function Dashboard() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  useEffect(() => {
    Promise.all([api.get<Livro[]>("/livros/"), api.get<Emprestimo[]>("/emprestimos/")])
      .then(([l, e]) => { setLivros(l); setEmprestimos(e); })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const totalAcervo = livros.reduce((a, b) => a + b.quantidade_total, 0);
  const emprestados = emprestimos.filter((e) => e.status === "ativo").length;
  const atrasados = emprestimos.filter((e) => e.status === "ativo" && e.multa && e.multa > 0).length;

  const stats = [
    { label: "Livros no acervo", value: totalAcervo, to: "/app/livros", icon: "📚", color: "bg-[var(--color-primary)]", border: "border-[#4338CA]" },
    { label: "Empréstimos ativos", value: emprestados, to: "/app/emprestimos", icon: "📖", color: "bg-[var(--color-accent)]", border: "border-[#C2410C]" },
    { label: "Em atraso", value: atrasados, to: "/app/emprestimos", icon: "⚠️", color: "bg-[var(--color-destructive)]", border: "border-[#991B1B]" },
  ];

  return (
    <div className="space-y-8">
      <FadeIn>
        <h1 className="font-heading font-bold text-3xl text-[var(--color-fg)]">
          <GradientText>Dashboard</GradientText>
        </h1>
        <p className="font-body text-[var(--color-muted-fg)] mt-1">Visão geral do acervo e empréstimos.</p>
      </FadeIn>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <Stagger className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {stats.map((s) => (
              <StaggerItem key={s.label}>
                <button onClick={() => nav(s.to)} className="text-left w-full">
                  <MotionCard className="p-6 cursor-pointer" hover>
                    <div className={`w-12 h-12 rounded-[var(--radius-md)] ${s.color} flex items-center justify-center mb-3 border-3 ${s.border} shadow-[var(--shadow-clay)] text-xl`}>
                      {s.icon}
                    </div>
                    <div className="font-heading font-bold text-2xl text-[var(--color-fg)]">{s.value}</div>
                    <div className="font-body text-sm text-[var(--color-muted-fg)] font-semibold">{s.label}</div>
                  </MotionCard>
                </button>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn delay={0.15}>
            <div className="grid md:grid-cols-2 gap-6">
              <MotionCard className="p-6" delay={0.08}>
                <h2 className="font-heading font-semibold text-lg text-[var(--color-fg)] mb-4">Últimos empréstimos</h2>
                {emprestimos.length === 0 ? (
                  <p className="font-body text-[var(--color-muted-fg)] text-sm">Nenhum empréstimo ainda.</p>
                ) : (
                  <div className="space-y-3">
                    {emprestimos.slice(0, 5).map((e) => (
                      <div key={e.id} className="flex items-center justify-between py-3 px-4 rounded-[var(--radius-md)] bg-[var(--color-muted)] border-2 border-[var(--color-border)]">
                        <div>
                          <div className="font-body font-bold text-[var(--color-fg)] text-sm">{e.titulo_livro || "Livro"}</div>
                          <div className="font-body text-xs text-[var(--color-muted-fg)]">RA {e.matricula}</div>
                        </div>
                        <StatusBadge status={e.status} />
                      </div>
                    ))}
                  </div>
                )}
              </MotionCard>

              <MotionCard className="p-6" delay={0.12}>
                <h2 className="font-heading font-semibold text-lg text-[var(--color-fg)] mb-4">Livros recentes</h2>
                {livros.length === 0 ? (
                  <p className="font-body text-[var(--color-muted-fg)] text-sm">Acervo vazio.</p>
                ) : (
                  <div className="space-y-3">
                    {livros.slice(0, 5).map((l) => (
                      <div key={l.id} className="flex items-center justify-between py-3 px-4 rounded-[var(--radius-md)] bg-[var(--color-muted)] border-2 border-[var(--color-border)]">
                        <div>
                          <div className="font-body font-bold text-[var(--color-fg)] text-sm">{l.titulo}</div>
                          <div className="font-body text-xs text-[var(--color-muted-fg)]">
                            {l.autores?.map((a) => a.nome).join(", ") || "Sem autor"}
                          </div>
                        </div>
                        <span className={`clay-badge ${l.quantidade_disponivel === 0 ? "clay-badge-danger" : "clay-badge-success"}`}>
                          {l.quantidade_disponivel}/{l.quantidade_total}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </MotionCard>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <button onClick={() => nav("/app/livros")} className="clay-btn clay-btn-primary px-6 py-3 text-base">
              Gerenciar Livros
            </button>
          </FadeIn>
        </>
      )}
    </div>
  );
}
