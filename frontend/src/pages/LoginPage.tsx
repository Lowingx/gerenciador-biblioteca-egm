import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CosineBackground, GradientText } from "../components/ui";
import { useAuth } from "../AuthContext";
import { FadeIn } from "../motion";

const EASE = [0.22, 1, 0.36, 1] as const;

function EyeIcon({ open }: { open: boolean }) {
  return open ? (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ) : (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" strokeLinecap="round" />
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
      <CosineBackground />

      <div className="relative flex items-center justify-center min-h-screen px-4 py-10" style={{ zIndex: 1 }}>
        <FadeIn delay={0.1} y={30}>
          <motion.div
            className="card-glow rounded-3xl"
            whileHover={{ scale: 1.005 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-[0_8px_60px_rgba(107,70,192,0.18)] px-10 py-10 w-full" style={{ maxWidth: 420, minWidth: 320 }}>
              <FadeIn delay={0.2}>
                <div className="flex justify-center mb-6">
                  <img src="/Icons/logo-gbe.png" alt="GBE" className="h-20 w-auto object-contain drop-shadow-md" />
                </div>
              </FadeIn>

              <FadeIn delay={0.3}>
                <h1 className="font-poppins font-extrabold text-center text-gray-800 mb-1 text-[1.65rem] leading-tight">
                  Bem-vindo ao <GradientText>GBE</GradientText>
                </h1>
                <p className="font-inter text-center text-gray-400 text-sm mb-8">Faça login para continuar</p>
              </FadeIn>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="font-inter text-sm text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 mb-4"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                <FadeIn delay={0.35}>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-[#6B46C0] pointer-events-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </span>
                    <input
                      type="text"
                      value={ra}
                      onChange={(e) => setRa(e.target.value)}
                      placeholder="RA (Registro do Aluno)"
                      required
                      className="input-field font-inter w-full pl-11 pr-4 py-3 rounded-xl text-gray-700 text-sm"
                    />
                  </div>
                </FadeIn>

                <FadeIn delay={0.4}>
                  <div className="relative flex items-center">
                    <span className="absolute left-3.5 text-[#6B46C0] pointer-events-none">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Senha"
                      required
                      className="input-field font-inter w-full pl-11 pr-12 py-3 rounded-xl text-gray-700 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 text-gray-400 hover:text-[#00B4D8] transition-colors"
                      tabIndex={-1}
                    >
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                </FadeIn>

                <FadeIn delay={0.45}>
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn-gradient font-poppins font-semibold w-full py-3 rounded-xl text-white text-base tracking-wide mt-2 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="spinner-sm" />
                        <span>Entrando…</span>
                      </>
                    ) : (
                      "Entrar"
                    )}
                  </button>
                </FadeIn>
              </form>

              <FadeIn delay={0.5}>
                <div className="flex justify-between mt-6">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="font-inter text-sm text-[#00B4D8] hover:text-[#6B46C0] transition-colors"
                  >
                    Esqueceu sua senha?
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowHelpModal(true)}
                    className="font-inter text-sm text-[#00B4D8] hover:text-[#6B46C0] transition-colors"
                  >
                    Precisa de ajuda?
                  </button>
                </div>
              </FadeIn>
            </div>
          </motion.div>
        </FadeIn>
      </div>

      <AnimatePresence>
        {showForgotModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(40, 20, 80, 0.4)", backdropFilter: "blur(8px)" }}
            onClick={() => setShowForgotModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="card-glass rounded-3xl w-full max-w-[380px] mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <div className="px-8 pt-8 pb-6 text-center">
                <h2 className="font-poppins font-bold text-2xl text-gray-800 mb-3">Esqueceu sua senha?</h2>
                <p className="font-inter text-gray-500 leading-relaxed">Entre em contato com o administrador da biblioteca para redefinir sua senha.</p>
              </div>
              <div className="px-8 pb-8">
                <button onClick={() => setShowForgotModal(false)} className="btn-gradient w-full py-3.5 rounded-2xl font-poppins font-semibold text-white">Fechar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHelpModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(40, 20, 80, 0.4)", backdropFilter: "blur(8px)" }}
            onClick={() => setShowHelpModal(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="card-glass rounded-3xl w-full max-w-[380px] mx-4 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              <div className="px-8 pt-8 pb-6 text-center">
                <h2 className="font-poppins font-bold text-2xl text-gray-800 mb-3">Precisa de ajuda?</h2>
                <p className="font-inter text-gray-500 leading-relaxed">Consulte o monitor da biblioteca ou o bibliotecário responsável.</p>
              </div>
              <div className="px-8 pb-8">
                <button onClick={() => setShowHelpModal(false)} className="btn-gradient w-full py-3.5 rounded-2xl font-poppins font-semibold text-white">Fechar</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
