import { useEffect, useState } from "react";
import { api } from "../api";
import { GradientText, GradientButton } from "../components/ui";
import { MotionCard, Stagger, StaggerItem } from "../motion";
import { inputCls } from "../styles";

type Kind = "autores" | "editoras" | "categorias";

interface Item { id: number; nome: string; [k: string]: unknown }

const LABELS: Record<Kind, string> = {
  autores: "Autores",
  editoras: "Editoras",
  categorias: "Categorias",
};

export default function CatalogoPage() {
  const [kind, setKind] = useState<Kind>("autores");
  const [items, setItems] = useState<Item[]>([]);
  const [novo, setNovo] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editNome, setEditNome] = useState("");
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    let active = true;
    api
      .get<Item[]>(`/${kind}/`)
      .then((r) => {
        if (active) setItems(r);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [kind, reload]);

  const criar = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!novo.trim()) return;
    await api.post(`/${kind}/`, { nome: novo.trim() });
    setNovo("");
    setReload((r) => r + 1);
  };

  const atualizar = async () => {
    if (editingId === null || !editNome.trim()) return;
    await api.put(`/${kind}/${editingId}`, { nome: editNome.trim() });
    setEditingId(null);
    setEditNome("");
    setReload((r) => r + 1);
  };

  const remover = async (id: number) => {
    if (!confirm("Excluir este item?")) return;
    await api.del(`/${kind}/${id}`);
    setReload((r) => r + 1);
  };

  return (
    <div>
      <h1 className="font-poppins font-extrabold text-3xl text-gray-800 mb-1">
        <GradientText>Catálogo</GradientText>
      </h1>
      <p className="font-inter text-gray-500 mb-8">Gerencie autores, editoras e categorias.</p>

      <div className="flex gap-2 mb-5 flex-wrap">
        {(Object.keys(LABELS) as Kind[]).map((k) => (
          <button
            key={k}
            onClick={() => setKind(k)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
              kind === k
                ? "bg-gradient-to-r from-[#6B46C0] to-[#00B4D8] text-white"
                : "bg-white/70 text-gray-600 hover:bg-white"
            }`}
          >
            {LABELS[k]}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <MotionCard className="p-6">
          <h2 className="font-poppins font-bold text-lg text-gray-800 mb-4">Novo {LABELS[kind].toLowerCase().slice(0, -1)}</h2>
          <form onSubmit={criar} className="flex gap-2">
            <input
              value={novo}
              onChange={(e) => setNovo(e.target.value)}
              placeholder="Nome"
              className={inputCls}
            />
            <GradientButton className="px-5 py-2.5" type="submit">
              +
            </GradientButton>
          </form>
        </MotionCard>

        <MotionCard className="p-6 lg:col-span-2" delay={0.08}>
          <h2 className="font-poppins font-bold text-lg text-gray-800 mb-4">
            {LABELS[kind]} ({items.length})
          </h2>
          {loading ? (
            <p className="font-inter text-gray-400">Carregando…</p>
          ) : items.length === 0 ? (
            <p className="font-inter text-gray-400">Nenhum item cadastrado.</p>
          ) : (
            <Stagger className="divide-y divide-gray-100">
              {items.map((item) => (
                <StaggerItem key={item.id} y={12}>
                  <li className="flex items-center justify-between py-2.5">
                    {editingId === item.id ? (
                      <div className="flex gap-2 flex-1">
                        <input value={editNome} onChange={(e) => setEditNome(e.target.value)} className={inputCls} />
                        <GradientButton className="px-4 py-2" onClick={atualizar}>
                          Salvar
                        </GradientButton>
                      </div>
                    ) : (
                      <>
                        <span className="font-inter text-gray-800 text-sm">{item.nome}</span>
                        <div>
                          <button
                            onClick={() => {
                              setEditingId(item.id);
                              setEditNome(item.nome);
                            }}
                            className="text-[#00B4D8] hover:underline text-sm mr-3"
                          >
                            Editar
                          </button>
                          <button onClick={() => remover(item.id)} className="text-red-500 hover:underline text-sm">
                            Excluir
                          </button>
                        </div>
                      </>
                    )}
                  </li>
                </StaggerItem>
              ))}
            </Stagger>
          )}
        </MotionCard>
      </div>
    </div>
  );
}
