// ────────────────────────────────────────────────────────────
// Cliente de API do GBE — centraliza fetch + token JWT
// ────────────────────────────────────────────────────────────

const API_URL =
  (import.meta.env.VITE_API_URL as string | undefined) || "/api";

let accessToken: string | null = localStorage.getItem("gbe_token");

export function setToken(token: string | null) {
  accessToken = token;
  if (token) localStorage.setItem("gbe_token", token);
  else localStorage.removeItem("gbe_token");
}

export function getToken() {
  return accessToken;
}

export function hasToken() {
  return Boolean(accessToken);
}

export class ApiError extends Error {
  status: number;
  detail?: string;
  constructor(status: number, detail?: string) {
    super(detail || `Erro ${status}`);
    this.status = status;
    this.detail = detail;
  }
}

async function request<T>(
  path: string,
  options: { method?: string; body?: unknown } = {},
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (accessToken) headers.Authorization = `Bearer ${accessToken}`;

  const res = await fetch(`${API_URL}${path}`, {
    method: options.method || "GET",
    headers,
    credentials: "include",
    body: options.body !== undefined ? JSON.stringify(options.body) : undefined,
  });

  if (!res.ok) {
    let detail = `Erro ${res.status}`;
    try {
      const data = await res.json();
      if (data.detail) detail = typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail);
      else if (data.message) detail = data.message;
    } catch {
      /* corpo não-JSON */
    }
    throw new ApiError(res.status, detail);
  }

  if (res.status === 204) return undefined as T;
  return (await res.json()) as T;
}

export const api = {
  get: <T>(p: string) => request<T>(p),
  post: <T>(p: string, body?: unknown) => request<T>(p, { method: "POST", body }),
  put: <T>(p: string, body?: unknown) => request<T>(p, { method: "PUT", body }),
  del: <T>(p: string) => request<T>(p, { method: "DELETE" }),
};

// ── Tipos ──────────────────────────────────────────────────

export interface Usuario {
  id: number;
  ra: string;
  nome: string;
  email: string;
  is_admin: boolean;
}

export interface Livro {
  id: number;
  titulo: string;
  isbn?: string | null;
  ano_publicacao?: number | null;
  quantidade_total: number;
  quantidade_disponivel: number;
  categoria?: { id: number; nome: string } | null;
  editora?: { id: number; nome: string } | null;
  autores?: { id: number; nome: string }[] | null;
}

export interface Emprestimo {
  id: number;
  livro_id: number;
  usuario_id?: number | null;
  matricula: string;
  data_emprestimo: string;
  data_devolucao_prevista: string;
  data_devolucao_real?: string | null;
  status: "ativo" | "devolvido" | "atrasado";
  multa?: number | null;
  titulo_livro?: string | null;
}
