import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BOUNCE = [0.34, 1.56, 0.64, 1] as const;

/* ─── Background ─── */
export function ClayBackground() {
  return (
    <div className="clay-bg">
      <div className="clay-blob" style={{ width: "45vw", height: "45vw", top: "5%", left: "0%", background: "#C7D2FE" }} />
      <div className="clay-blob" style={{ width: "35vw", height: "35vw", bottom: "0%", right: "5%", background: "#FED7AA", animationDelay: "-5s" }} />
      <div className="clay-blob" style={{ width: "30vw", height: "30vw", top: "40%", left: "55%", background: "#E0E7FF", animationDelay: "-9s" }} />
      <div className="clay-blob" style={{ width: "20vw", height: "20vw", top: "70%", left: "15%", background: "#DDD6FE", animationDelay: "-3s" }} />
    </div>
  );
}

/* ─── Gradient Text ─── */
export function GradientText({ children }: { children: ReactNode }) {
  return (
    <span className="font-heading" style={{
      background: "linear-gradient(135deg, #4F46E5, #EA580C)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
    }}>
      {children}
    </span>
  );
}

/* ─── Status Badge ─── */
export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    ativo: "clay-badge-success",
    devolvido: "clay-badge-primary",
    atrasado: "clay-badge-danger",
  };
  const cls = map[status] || "clay-badge-primary";
  return <span className={`clay-badge ${cls}`}>{status}</span>;
}

/* ─── Modal ─── */
export function MotionModal({
  open,
  onClose,
  title,
  children,
  size = "max-w-lg",
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: string;
}) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(30, 27, 75, 0.3)", backdropFilter: "blur(8px)" }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className={`clay-card ${size}`}
            style={{ width: "100%" }}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.35, ease: BOUNCE }}
          >
            <div className="px-8 pt-7 pb-6">
              <h2 className="font-heading font-bold text-2xl text-[var(--color-fg)] mb-1">{title}</h2>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Loading Spinner ─── */
export function LoadingSpinner({ text = "Carregando…" }: { text?: string }) {
  return (
    <div className="flex items-center gap-3 text-[var(--color-muted-fg)] font-body text-sm">
      <div className="clay-spinner" />
      {text}
    </div>
  );
}
