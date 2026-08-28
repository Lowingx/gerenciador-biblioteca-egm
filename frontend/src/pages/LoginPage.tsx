import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ClayBackground, GradientText } from "../components/ui";
import { useAuth } from "../AuthContext";
import { FadeIn } from "../motion";

const BOUNCE = [0.34, 1.56, 0.64, 1] as const;

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

export default function LoginPage() {
  const [ra, setRa] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(ra.trim(), password);
      navigate("/app");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha no login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ClayBackground />

      <div className="relative flex items-center justify-center min-h-screen px-4 py-10" style={{ zIndex: 1 }}>
        <FadeIn delay={0.1} y={30}>
          <motion.div
            className="clay-card overflow-hidden"
            style={{ maxWidth: 440, width: "100%" }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25, ease: BOUNCE }}
          >
            <div className="px-10 py-10">
              {/* Logo */}
              <FadeIn delay={0.15}>
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-[var(--radius-lg)] bg-[var(--color-primary)] flex items-center justify-center border-4 border-[#4338CA] shadow-[var(--shadow-clay)]">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                  </div>
                </div>
              </FadeIn>

              {/* Title */}
              <FadeIn delay={0.2}>
                <h1 className="font-heading font-bold text-center text-[var(--color-fg)] mb-1 text-[1.75rem] leading-tight">
                  Bem-vindo ao <GradientText>GBE</GradientText>
                </h1>
                <p className="font-body text-center text-[var(--color-muted-fg)] text-sm mb-8">Faça login para continuar</p>
              </FadeIn>

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="clay-badge clay-badge-danger w-full justify-center mb-4 py-3 text-sm"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <FadeIn delay={0.25}>
                  <label className="block">
                    <span className="font-body text-xs font-bold text-[var(--color-muted-fg)] uppercase tracking-wider mb-1.5 block">RA</span>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                      </span>
                      <input
                        type="text"
                        value={ra}
                        onChange={(e) => setRa(e.target.value)}
                        placeholder="Registro do Aluno"
                        required
                        className="clay-input pl-12"
                      />
                    </div>
                  </label>
                </FadeIn>

                <FadeIn delay={0.3}>
                  <label className="block">
                    <span className="font-body text-xs font-bold text-[var(--color-muted-fg)] uppercase tracking-wider mb-1.5 block">Senha</span>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-primary)]">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                      </span>
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Sua senha"
                        required
                        className="clay-input pl-12 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-muted-fg)] hover:text-[var(--color-primary)] transition-colors"
                        tabIndex={-1}
                      >
                        <EyeIcon open={showPassword} />
                      </button>
                    </div>
                  </label>
                </FadeIn>

                <FadeIn delay={0.35}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="clay-btn clay-btn-primary w-full py-3 text-base disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="clay-spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                        <span>Entrando…</span>
                      </>
                    ) : (
                      "Entrar"
                    )}
                  </button>
                </FadeIn>
              </form>

              {/* Links */}
              <FadeIn delay={0.4}>
                <div className="flex justify-between mt-6">
                  <button type="button" onClick={() => setShowForgotModal(true)} className="font-body text-sm text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors font-bold">
                    Esqueceu a senha?
                  </button>
                  <button type="button" onClick={() => setShowHelpModal(true)} className="font-body text-sm text-[var(--color-primary)] hover:text-[var(--color-accent)] transition-colors font-bold">
                    Ajuda
                  </button>
                </div>
              </FadeIn>
            </div>
          </motion.div>
        </FadeIn>
      </div>

      {/* Forgot Modal */}
      <AnimatePresence>
        {showForgotModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(30, 27, 75, 0.3)", backdropFilter: "blur(8px)" }}
            onClick={() => setShowForgotModal(false)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="clay-card max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: BOUNCE }}
            >
              <div className="px-8 pt-8 pb-6 text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--color-accent)] flex items-center justify-center mx-auto mb-4 border-3 border-[#C2410C] shadow-[var(--shadow-clay)]">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" /></svg>
                </div>
                <h2 className="font-heading font-bold text-2xl text-[var(--color-fg)] mb-2">Esqueceu a senha?</h2>
                <p className="font-body text-[var(--color-muted-fg)] leading-relaxed">Fale com o bibliotecário da escola para redefinir sua senha.</p>
              </div>
              <div className="px-8 pb-8">
                <button onClick={() => setShowForgotModal(false)} className="clay-btn clay-btn-primary w-full py-3">Fechar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelpModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(30, 27, 75, 0.3)", backdropFilter: "blur(8px)" }}
            onClick={() => setShowHelpModal(false)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          >
            <motion.div
              className="clay-card max-w-sm w-full"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ duration: 0.3, ease: BOUNCE }}
            >
              <div className="px-8 pt-8 pb-6 text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--color-primary)] flex items-center justify-center mx-auto mb-4 border-3 border-[#4338CA] shadow-[var(--shadow-clay)]">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h2 className="font-heading font-bold text-2xl text-[var(--color-fg)] mb-2">Ajuda</h2>
                <p className="font-body text-[var(--color-muted-fg)] leading-relaxed">Consulte o monitor ou bibliotecário responsável.</p>
              </div>
              <div className="px-8 pb-8">
                <button onClick={() => setShowHelpModal(false)} className="clay-btn clay-btn-primary w-full py-3">Fechar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
