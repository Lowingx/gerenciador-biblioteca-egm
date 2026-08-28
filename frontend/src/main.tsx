import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import "./design.css";
import { AuthProvider } from "./AuthContext";
import { hasToken } from "./api";
import { RequireAuth } from "./RequireAuth";
import LoginPage from "./pages/LoginPage";
import AppShell from "./components/AppShell";
import Dashboard from "./pages/Dashboard";
import LivrosPage from "./pages/LivrosPage";
import EmprestimosPage from "./pages/EmprestimosPage";
import CatalogoPage from "./pages/CatalogoPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/app"
            element={
              <RequireAuth>
                <AppShell />
              </RequireAuth>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="livros" element={<LivrosPage />} />
            <Route path="emprestimos" element={<EmprestimosPage />} />
            <Route path="catalogo" element={<CatalogoPage />} />
          </Route>
          <Route path="*" element={<Navigate to={hasToken() ? "/app" : "/login"} replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
