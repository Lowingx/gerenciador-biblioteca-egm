import { createContext, useContext, useState, useCallback } from "react";
import type { ReactNode } from "react";
import { api, setToken } from "./api";
import type { Usuario } from "./api";

interface AuthState {
  user: Usuario | null;
  login: (ra: string, senha: string) => Promise<Usuario>;
  logout: () => void;
}

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(null);

  const login = useCallback(async (ra: string, senha: string): Promise<Usuario> => {
    const res = await api.post<{ access_token: string; usuario: Usuario }>("/login", { ra, senha });
    setToken(res.access_token);
    setUser(res.usuario);
    return res.usuario;
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.post("/logout");
    } catch { /* best effort */ }
    setToken(null);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
