import { Navigate } from "react-router-dom";
import { hasToken } from "./api";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  if (!hasToken()) return <Navigate to="/login" replace />;
  return <>{children}</>;
}
