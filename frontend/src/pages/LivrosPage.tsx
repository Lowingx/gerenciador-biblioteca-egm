import { useEffect, useState } from "react";
import { api } from "../api";
import type { Livro } from "../api";
import { GradientText, GradientButton, Field, MotionModal } from "../components/ui";
import { MotionCard } from "../motion";
import { inputCls } from "../styles";

interface AutorRef { id: number; nome: string }
interface CategoriaRef { id: number; nome: string }
interface EditoraRef { id: number; nome: string }

const emptyForm = {
  titulo: "",
  isbn: "",
  ano_publicacao: "",
  quantidade_total: 1,
  categoria_id: "",
  editora_id: "",
  autores_id: [] as number[],
};

export default function LivrosPage() {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [autores, setAutores] = useState<AutorRef[]>([]);
  const [categorias, setCategorias] = useState<CategoriaRef[]>([]);
  const [editoras, setEditoras] = useState<EditoraRef[]>([]);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Livro | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    Promise.all([
      api.get<Livro[]>("/livros/"),
      api.get<AutorRef[]>("/autores"),
      api.get<CategoriaRef[]>("/categorias"),
      api.get<EditoraRef[]>("/editoras"),
    ])
      .then(([l, a, c, e]) => {
        setLivros(l);
        setAutores(a);
        setCategorias(c);
        setEditoras(e);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const filtered = q
    ? livros.filter((l) => l.titulo.toLowerCase().includes(q.toLowerCase()))
    : livros;

  const openNew = () => {
    setEditing(null);
    setForm(emptyForm);
    setError("");
    setModalOpen(true);
  };

  const openEdit = (l: Livro) => {
    setEditing(l);
    setForm({
      titulo: l.titulo,
      isbn: l.isbn || "",
      ano_publicacao: l.ano_publicacao ? String(l.ano_publicacao) : "",
      quantidade_total: l.quantidade_total,
      categoria_id: l.categoria ? String(l.categoria.id) : "",
      editora_id: l.editora ? String(l.editora.id) : "",
      autores_id: l.autores?.map((a) => a.id) || [],
    });
    setError("");
    setModalOpen(true);
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const payload = {
      titulo: form.titulo,
      isbn: form.isbn || null,
      ano_publicacao: form.ano_publicacao ? Number(form.ano_publicacao) : null,
      quantidade_total: Number(form.quantidade_total) || 1,
      categoria_id: form.categoria_id ? Number(form.categoria_id) : null,
      editora_id: form.editora_id ? Number(form.editora_id) : null,
      autores_id: form.autores_id.length ? form.autores_id : null,
    };
    try {
      if (editing) await api.put(`/livros/${editing.id}`, payload);
      else await api.post("/livros/", payload);
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao salvar");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (l: Livro) => {
    if (!confirm(`Excluir "${l.titulo}"?`)) return;
    try {
      await api.del(`/livros/${l.id}`);
      load();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Erro ao excluir");
    }
  };

  const toggleAutor = (id: number) => {
    setForm((f) => ({
      ...f,
      autores_id: f.autores_id.includes(id)
        ? f.autores_id.filter((x) => x !== id)
        : [...f.autores_id, id],
    }));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-poppins font-extrabold text-3xl text-gray-800">
            <GradientText>Livros</GradientText>
          </h1>
          <p className="font-inter text-gray-500">Gerencie o acervo da biblioteca.</p>
        </div>
        <GradientButton onClick={openNew} className="px-6 py-3">
          + Novo livro
        </GradientButton>
      </div>

      <MotionCard className="p-6">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Buscar por título…"
          className={inputCls + " mb-5 max-w-sm"}
        />

        {loading ? (
          <p className="font-inter text-gray-400">Carregando…</p>
        ) : filtered.length === 0 ? (
          <p className="font-inter text-gray-400">Nenhum livro encontrado.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="gbe-table w-full text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="font-poppins font-semibold text-gray-700 text-sm pb-3 pr-4">Título</th>
                  <th className="font-poppins font-semibold text-gray-700 text-sm pb-3 pr-4">Autor</th>
                  <th className="font-poppins font-semibold text-gray-700 text-sm pb-3 pr-4">Categoria</th>
                  <th className="font-poppins font-semibold text-gray-700 text-sm pb-3 pr-4">Editora</th>
                  <th className="font-poppins font-semibold text-gray-700 text-sm pb-3 pr-4">Disp.</th>
                  <th className="font-poppins font-semibold text-gray-700 text-sm pb-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((l) => (
                  <tr key={l.id} className="border-b border-gray-100">
                    <td className="font-inter text-gray-800 text-sm py-3 pr-4">{l.titulo}</td>
                    <td className="font-inter text-gray-600 text-sm py-3 pr-4">
                      {l.autores?.map((a) => a.nome).join(", ") || "—"}
                    </td>
                    <td className="font-inter text-gray-600 text-sm py-3 pr-4">{l.categoria?.nome || "—"}</td>
                    <td className="font-inter text-gray-600 text-sm py-3 pr-4">{l.editora?.nome || "—"}</td>
                    <td className="font-inter text-gray-600 text-sm py-3 pr-4">
                      <span className={l.quantidade_disponivel === 0 ? "text-red-600 font-semibold" : ""}>
                        {l.quantidade_disponivel}/{l.quantidade_total}
                      </span>
                    </td>
                    <td className="font-inter text-sm py-3">
                      <button onClick={() => openEdit(l)} className="text-[#00B4D8] hover:underline mr-3">Editar</button>
                      <button onClick={() => remove(l)} className="text-red-500 hover:underline">Excluir</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
          </MotionCard>

      <MotionModal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Editar livro" : "Novo livro"}>
        <form onSubmit={save} className="space-y-4 mt-4">
          {error && (
            <div className="font-inter text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2">{error}</div>
          )}
          <Field label="Título">
            <input required value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} className={inputCls} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="ISBN">
              <input value={form.isbn} onChange={(e) => setForm({ ...form, isbn: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Ano">
              <input type="number" value={form.ano_publicacao} onChange={(e) => setForm({ ...form, ano_publicacao: e.target.value })} className={inputCls} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Quantidade">
              <input type="number" min={1} value={form.quantidade_total} onChange={(e) => setForm({ ...form, quantidade_total: Number(e.target.value) })} className={inputCls} />
            </Field>
            <Field label="Editora">
              <select value={form.editora_id} onChange={(e) => setForm({ ...form, editora_id: e.target.value })} className={inputCls}>
                <option value="">—</option>
                {editoras.map((e) => (
                  <option key={e.id} value={e.id}>{e.nome}</option>
                ))}
              </select>
            </Field>
          </div>
          <Field label="Categoria">
            <select value={form.categoria_id} onChange={(e) => setForm({ ...form, categoria_id: e.target.value })} className={inputCls}>
              <option value="">—</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>{c.nome}</option>
              ))}
            </select>
          </Field>
          <Field label="Autores">
            <div className="flex flex-wrap gap-2">
              {autores.length === 0 && <span className="font-inter text-sm text-gray-400">Nenhum autor cadastrado.</span>}
              {autores.map((a) => (
                <button
                  type="button"
                  key={a.id}
                  onClick={() => toggleAutor(a.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                    form.autores_id.includes(a.id)
                      ? "bg-gradient-to-r from-[#6B46C0] to-[#00B4D8] text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {a.nome}
                </button>
              ))}
            </div>
          </Field>

          <div className="flex gap-3 pt-2">
            <GradientButton loading={saving} className="flex-1 py-3" type="submit">
              {editing ? "Salvar" : "Criar"}
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

      {/* Atalho: se não houver categorias/autores/editoras, oferece criar */}
      {(categorias.length === 0 || editoras.length === 0 || autores.length === 0) && (
        <div className="mt-6">
          <MotionCard className="p-5">
            <p className="font-inter text-sm text-gray-500 mb-3">
              Criar entidades de catálogo (autores, editoras, categorias) para enriquecer os livros.
            </p>
            <a href="/app/catalogo" className="font-inter text-[#00B4D8] hover:underline text-sm">Ir para Catálogo →</a>
      </MotionCard>
        </div>
      )}
    </div>
  );
}
