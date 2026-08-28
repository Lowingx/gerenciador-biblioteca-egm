import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api";
import type { Livro, Emprestimo } from "../api";
import { GradientText, StatusBadge, GradientButton, LoadingSpinner } from "../components/ui";
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
    { label: "Livros no acervo", value: totalAcervo, to: "/app/livros", color: "from-[#6B46C0] to-[#8B5CF6]" },
    { label: "Empréstimos ativos", value: emprestados, to: "/app/emprestimos", color: "from-[#00B4D8] to-[#06B6D4]" },
    { label: "Em atraso", value: atrasados, to: "/app/emprestimos", color: "from-rose-400 to-rose-500" },
  ];

  return (
    <div className="space-y-8">
      <FadeIn>
        <h1 className="font-poppins font-extrabold text-3xl text-gray-800">
          <GradientText>Dashboard</GradientText>
        </h1>
        <p className="font-inter text-gray-400 mt-1">Visão geral do acervo e empréstimos.</p>
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
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-3 shadow-lg`}>
                      <span className="text-white font-bold text-lg">{s.value}</span>
                    </div>
                    <div className="font-inter text-sm text-gray-500 font-medium">{s.label}</div>
                  </MotionCard>
                </button>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn delay={0.15}>
            <div className="grid md:grid-cols-2 gap-6">
              <MotionCard className="p-6" delay={0.08}>
                <h2 className="font-poppins font-semibold text-lg text-gray-800 mb-4">Últimos empréstimos</h2>
                {emprestimos.length === 0 ? (
                  <p className="font-inter text-gray-400 text-sm">Nenhum empréstimo ainda.</p>
                ) : (
                  <div className="space-y-3">
                    {emprestimos.slice(0, 5).map((e) => (
                      <div key={e.id} className="flex items-center justify-between py-2 border-b border-gray-100/60 last:border-0">
                        <div>
                          <div className="font-inter font-medium text-gray-700 text-sm">{e.titulo_livro || "Livro"}</div>
                          <div className="font-inter text-xs text-gray-400">RA {e.matricula}</div>
                        </div>
                        <StatusBadge status={e.status} />
                      </div>
                    ))}
                  </div>
                )}
              </MotionCard>

              <MotionCard className="p-6" delay={0.12}>
                <h2 className="font-poppins font-semibold text-lg text-gray-800 mb-4">Livros recentes</h2>
                {livros.length === 0 ? (
                  <p className="font-inter text-gray-400 text-sm">Acervo vazio.</p>
                ) : (
                  <div className="space-y-3">
                    {livros.slice(0, 5).map((l) => (
                      <div key={l.id} className="flex items-center justify-between py-2 border-b border-gray-100/60 last:border-0">
                        <div>
                          <div className="font-inter font-medium text-gray-700 text-sm">{l.titulo}</div>
                          <div className="font-inter text-xs text-gray-400">
                            {l.autores?.map((a) => a.nome).join(", ") || "Sem autor"}
                          </div>
                        </div>
                        <span className={`font-inter text-xs font-medium ${l.quantidade_disponivel === 0 ? "text-rose-500" : "text-gray-400"}`}>
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
            <GradientButton onClick={() => nav("/app/livros")} className="px-6 py-3">
              Gerenciar Livros
            </GradientButton>
          </FadeIn>
        </>
      )}
    </div>
  );
}
