import type { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

function WaveSVG({ color, d, className }: { color: string; d: string; className: string }) {
  return (
    <svg className={`cosine-wave ${className}`} viewBox="0 0 1440 320" preserveAspectRatio="none">
      <path fill={color} d={d} />
    </svg>
  );
}

export function CosineBackground() {
  return (
    <div className="cosine-bg">
      <div className="fluid-blob" style={{
        width: "40vw", height: "40vw", top: "10%", left: "5%",
        background: "rgba(103,232,249,0.4)"
      }} />
      <div className="fluid-blob" style={{
        width: "35vw", height: "35vw", bottom: "5%", right: "10%",
        background: "rgba(107,70,192,0.35)",
        animationDelay: "-4s"
      }} />
      <div className="fluid-blob" style={{
        width: "25vw", height: "25vw", top: "50%", left: "50%",
        background: "rgba(0,180,216,0.25)",
        animationDelay: "-8s"
      }} />

      <WaveSVG color="rgba(255,255,255,0.08)" className="cosine-wave-1"
        d="M0,224 C360,160 720,288 1080,192 C1260,160 1380,224 1440,208 L1440,320 L0,320 Z" />
      <WaveSVG color="rgba(103,232,249,0.12)" className="cosine-wave-2"
        d="M0,256 C240,224 480,288 720,256 C960,224 1200,288 1440,256 L1440,320 L0,320 Z" />
      <WaveSVG color="rgba(107,70,192,0.1)" className="cosine-wave-3"
        d="M0,288 C180,256 360,320 540,288 C720,256 900,320 1080,288 C1260,256 1380,288 1440,272 L1440,320 L0,320 Z" />

      <div className="cosine-overlay" />

      <motion.div
        className="absolute inset-0 opacity-[0.04]"
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        style={{
          background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)",
        }}
      />
    </div>
  );
}

export function GradientText({ children }: { children: ReactNode }) {
  return <span className="gradient-text">{children}</span>;
}

export function GlassCard({
  children,
  className = "",
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div className={`card-glass rounded-2xl ${glow ? "card-glow" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function GradientButton({
  children,
  loading,
  disabled,
  className = "",
  ...props
}: {
  children: ReactNode;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      {...props}
      disabled={disabled || loading}
      className={`btn-gradient font-poppins font-semibold rounded-xl text-white tracking-wide flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {loading ? (
        <>
          <span className="spinner-sm" />
          <span>Carregando…</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="font-inter text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}

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
          style={{ background: "rgba(40, 20, 80, 0.4)", backdropFilter: "blur(8px)" }}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="card-glass rounded-3xl"
            style={{ width: "100%", maxWidth: size }}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="px-8 pt-7 pb-6">
              <h2 className="font-poppins font-bold text-2xl text-gray-800 mb-1">{title}</h2>
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const map: Record<string, { bg: string; text: string; dot: string }> = {
    ativo: { bg: "bg-sky-50", text: "text-sky-700", dot: "bg-sky-400" },
    devolvido: { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-400" },
    atrasado: { bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-400" },
  };
  const s = map[status] || map.ativo;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
      {status}
    </span>
  );
}

export function LoadingSpinner({ text = "Carregando…" }: { text?: string }) {
  return (
    <div className="flex items-center gap-3 text-gray-400 font-inter text-sm">
      <div className="w-5 h-5 border-2 border-gray-300 border-t-[#6B46C0] rounded-full animate-spin" />
      {text}
    </div>
  );
}
