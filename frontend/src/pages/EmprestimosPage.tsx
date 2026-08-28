import { useEffect, useState } from "react";
import { api } from "../api";
import type { Emprestimo, Livro } from "../api";
import { GradientText, GradientButton, Field, StatusBadge, MotionModal } from "../components/ui";
import { MotionCard } from "../motion";
import { inputCls } from "../styles";

export default function EmprestimosPage() {
  const [emprestimos, setEmprestimos] = useState<Emprestimo[]>([]);
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);
  const [filter, setFilter] = useState("todos");
  const [modalOpen, setModalOpen] = useState(false);
  const [livroId, setLivroId] = useState("");
  const [matricula, setMatricula] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    Promise.all([api.get<Emprestimo[]>("/emprestimos/"), api.get<Livro[]>("/livros/")])
      .then(([e, l]) => {
        if (!active) return;
        setEmprestimos(e);
        setLivros(l);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [reload]);

  const filtered =
    filter === "todos"
      ? emprestimos
      : emprestimos.filter((e) => {
          if (filter === "ativos") return e.status === "ativo";
          if (filter === "atrasados") return e.status === "ativo" && (e.multa || 0) > 0;
          return e.status === "devolvido";
        });

  const criar = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await api.post("/emprestimos/", { livro_id: Number(livroId), matricula });
      setModalOpen(false);
      setLivroId("");
      setMatricula("");
      setReload((r) => r + 1);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao emprestar");
    } finally {
      setSaving(false);
    }
  };

  const devolver = async (id: number) => {
    try {
      await api.post(`/emprestimos/${id}/devolver`);
      setReload((r) => r + 1);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao devolver");
    }
  };

  const fmt = (s?: string | null) => {
    if (!s) return "—";
    const d = new Date(s);
    return d.toLocaleDateString("pt-BR");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-poppins font-extrabold text-3xl text-gray-800">
            <GradientText>Empréstimos</GradientText>
          </h1>
          <p className="font-inter text-gray-500">Controle de empréstimos, devoluções e multas.</p>
        </div>
        <GradientButton onClick={() => setModalOpen(true)} className="px-6 py-3">
          + Novo empréstimo
        </GradientButton>
      </div>

      <div className="flex gap-2 mb-5 flex-wrap">
        {[
          { k: "todos", label: "Todos" },
          { k: "ativos", label: "Ativos" },
          { k: "atrasados", label: "Atrasados" },
          { k: "devolvidos", label: "Devolvidos" },
        ].map((f) => (
          <button
            key={f.k}
            onClick={() => setFilter(f.k)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              filter === f.k
                ? "bg-gradient-to-r from-[#6B46C0] to-[#00B4D8] text-white"
                : "bg-white/70 text-gray-600 hover:bg-white"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <MotionCard className="p-6">
        {loading ? (
          <p className="font-inter text-gray-400">Carregando…</p>
        ) : filtered.length === 0 ? (
          <p className="font-inter text-gray-400">Nenhum empréstimo.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="gbe-table w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="font-poppins font-semibold text-gray-700 text-sm pb-3 pr-4">Livro</th>
                  <th className="font-poppins font-semibold text-gray-700 text-sm pb-3 pr-4">RA</th>
                  <th className="font-poppins font-semibold text-gray-700 text-sm pb-3 pr-4">Emprestado</th>
                  <th className="font-poppins font-semibold text-gray-700 text-sm pb-3 pr-4">Devolver até</th>
                  <th className="font-poppins font-semibold text-gray-700 text-sm pb-3 pr-4">Multa</th>
                  <th className="font-poppins font-semibold text-gray-700 text-sm pb-3 pr-4">Status</th>
                  <th className="font-poppins font-semibold text-gray-700 text-sm pb-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id} className="border-b border-gray-100">
                    <td className="font-inter text-gray-800 text-sm py-3 pr-4">{e.titulo_livro || "—"}</td>
                    <td className="font-inter text-gray-600 text-sm py-3 pr-4">{e.matricula}</td>
                    <td className="font-inter text-gray-600 text-sm py-3 pr-4">{fmt(e.data_emprestimo)}</td>
                    <td className="font-inter text-gray-600 text-sm py-3 pr-4">{fmt(e.data_devolucao_prevista)}</td>
                    <td className="font-inter text-sm py-3 pr-4">
                      {e.multa && e.multa > 0 ? (
                        <span className="text-red-600 font-semibold">R$ {e.multa.toFixed(2)}</span>
                      ) : (
                        <span className="text-gray-400">—</span>
                      )}
                    </td>
                    <td className="py-3 pr-4"><StatusBadge status={e.status} /></td>
                    <td className="font-inter text-sm py-3">
                      {e.status !== "devolvido" && (
                        <button onClick={() => devolver(e.id)} className="text-[#00B4D8] hover:underline">
                          Devolver
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </MotionCard>

      <MotionModal open={modalOpen} onClose={() => setModalOpen(false)} title="Novo empréstimo">
        <form onSubmit={criar} className="space-y-4 mt-4">
          {error && (
            <div className="font-inter text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">{error}</div>
          )}
          <Field label="Livro">
            <select
              required
              value={livroId}
              onChange={(e) => setLivroId(e.target.value)}
              className={inputCls}
            >
              <option value="">Selecione…</option>
              {livros
                .filter((l) => l.quantidade_disponivel > 0)
                .map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.titulo} ({l.quantidade_disponivel} disp.)
                  </option>
                ))}
            </select>
          </Field>
          <Field label="RA do aluno">
            <input required value={matricula} onChange={(e) => setMatricula(e.target.value)} placeholder="Ex: 2024-001" className={inputCls} />
          </Field>
          <div className="flex gap-3 pt-2">
            <GradientButton loading={saving} className="flex-1 py-3" type="submit">
              Emprestar
            </GradientButton>
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="font-inter font-medium flex-1 py-3 rounded-xl border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      </MotionModal>
    </div>
  );
}
