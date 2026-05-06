import { useState, useEffect, useRef } from "react";

function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    let animId: number;
    let t = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const VEILS = [
      { yCenter: 0.50, height: 0.78, amp: 0.13, freq: 0.75, speed: 0.18, phase: 0.00, alpha: 0.14 },
      { yCenter: 0.45, height: 0.66, amp: 0.17, freq: 0.85, speed: 0.24, phase: 1.30, alpha: 0.22 },
      { yCenter: 0.55, height: 0.54, amp: 0.20, freq: 0.95, speed: 0.30, phase: 2.60, alpha: 0.28 },
      { yCenter: 0.48, height: 0.40, amp: 0.22, freq: 1.05, speed: 0.38, phase: 4.00, alpha: 0.38 },
    ];

    const STEPS = 200; /* FIXME */

    function wave(nx: number, amp: number, freq: number, tPhase: number, H: number) {
      return H * (
        amp * Math.sin(freq * 2 * Math.PI * nx - tPhase) +
        amp * 0.35 * Math.sin(freq * 2 * Math.PI * nx * 1.7 - tPhase * 1.2 + 0.9) +
        amp * 0.15 * Math.sin(freq * 2 * Math.PI * nx * 2.9 - tPhase * 0.85 + 2.0)
      );
    }

    function drawVeil(W: number, H: number, yCenter: number, height: number, amp: number, freq: number, travelPhase: number, alpha: number) {
      const halfH = (height * H) / 2;
      const cy0 = yCenter * H;

      const topPts: [number, number][] = [];
      const botPts: [number, number][] = [];

      for (let i = 0; i <= STEPS; i++) {
        const nx = i / STEPS;
        const x = nx * W;
        topPts.push([x, cy0 - halfH + wave(nx, amp, freq, travelPhase, H)]);
        botPts.push([x, cy0 + halfH + wave(nx, amp * 0.80, freq, travelPhase + 0.6, H)]);
      }

      ctx.beginPath();
      ctx.moveTo(topPts[0][0], topPts[0][1]);
      for (let i = 1; i <= STEPS; i++) ctx.lineTo(topPts[i][0], topPts[i][1]);
      for (let i = STEPS; i >= 0; i--) ctx.lineTo(botPts[i][0], botPts[i][1]);
      ctx.closePath();

      const yTop = cy0 - halfH;
      const yBot = cy0 + halfH;
      const grad = ctx.createLinearGradient(0, yTop, 0, yBot);
      grad.addColorStop(0.00, `rgba(190,235,255,0.00)`);
      grad.addColorStop(0.15, `rgba(195,238,255,${alpha * 0.5})`);
      grad.addColorStop(0.40, `rgba(210,245,255,${alpha})`);
      grad.addColorStop(0.60, `rgba(210,245,255,${alpha})`);
      grad.addColorStop(0.85, `rgba(195,238,255,${alpha * 0.5})`);
      grad.addColorStop(1.00, `rgba(190,235,255,0.00)`);
      ctx.fillStyle = grad;
      ctx.fill();

      const glowLayers: [number, number][] = [
        [40, 0.025], [18, 0.07], [7, 0.18], [2.5, 0.50], [0.8, 1.00],
      ];
      for (const [lw, la] of glowLayers) {
        ctx.beginPath();
        ctx.moveTo(topPts[0][0], topPts[0][1]);
        for (let i = 1; i <= STEPS; i++) ctx.lineTo(topPts[i][0], topPts[i][1]);
        ctx.strokeStyle = `rgba(220,248,255,${Math.min(alpha * la * 1.5, 1)})`;
        ctx.lineWidth = lw;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.stroke();
      }

      for (const [lw, la] of glowLayers) {
        ctx.beginPath();
        ctx.moveTo(botPts[0][0], botPts[0][1]);
        for (let i = 1; i <= STEPS; i++) ctx.lineTo(botPts[i][0], botPts[i][1]);
        ctx.strokeStyle = `rgba(200,240,255,${Math.min(alpha * la * 0.8, 1)})`;
        ctx.lineWidth = lw;
        ctx.lineJoin = "round";
        ctx.lineCap = "round";
        ctx.stroke();
      }
    }

    function draw() {
      const W = canvas.width;
      const H = canvas.height;
      t += 0.008;

      const bg = ctx.createLinearGradient(0, 0, W, 0);
      bg.addColorStop(0.00, "#4a3a8a");
      bg.addColorStop(0.38, "#3060c0");
      bg.addColorStop(0.72, "#1a9ad4");
      bg.addColorStop(1.00, "#0bbfe0");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      const rightGlow = ctx.createRadialGradient(W * 0.85, H * 0.5, 0, W * 0.85, H * 0.5, W * 0.5);
      rightGlow.addColorStop(0.0, "rgba(160,235,255,0.015)");
      rightGlow.addColorStop(1.0, "rgba(160,235,255,0.00)");
      ctx.fillStyle = rightGlow;
      ctx.fillRect(0, 0, W, H);

      for (const v of VEILS) {
        const tPhase = v.phase + v.speed * t;
        const yc = v.yCenter + 0.03 * Math.sin(t * 0.15 + v.phase * 0.8);
        const amp = v.amp * (1 + 0.12 * Math.sin(t * 0.20 + v.phase));
        drawVeil(W, H, yc, v.height, amp, v.freq, tPhase, v.alpha);
      }

      animId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}

function PencilIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L7.5 19.213l-4.5 1.318 1.318-4.5L16.862 3.487z" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}

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
  const [mounted, setMounted] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 80);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@400;500&display=swap');
        * { box-sizing: border-box; }
        .font-poppins { font-family: 'Poppins', sans-serif; }
        .font-inter   { font-family: 'Inter',   sans-serif; }
        .gradient-text {
          background: linear-gradient(90deg, #6B46C0, #00B4D8, #67E8F9);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .btn-gradient {
          background: linear-gradient(110deg, #6B46C0 0%, #00B4D8 60%, #67E8F9 100%);
          background-size: 200% auto;
          transition: background-position 0.5s ease, transform 0.15s ease, box-shadow 0.3s ease;
        }
        .btn-gradient:hover:not(:disabled) {
          background-position: right center;
          transform: translateY(-1px);
          box-shadow: 0 8px 32px rgba(0,180,216,0.45);
        }
        .btn-gradient:active:not(:disabled) { transform: translateY(0); }
        .card-enter {
          opacity: 0;
          transform: translateY(32px) scale(0.97);
          transition: opacity 0.65s cubic-bezier(.22,1,.36,1), transform 0.65s cubic-bezier(.22,1,.36,1);
        }
        .card-enter.visible { opacity: 1; transform: translateY(0) scale(1); }
        .input-field:focus {
          outline: none;
          border-color: #00B4D8;
          box-shadow: 0 0 0 3px rgba(0,180,216,0.18);
        }
        @keyframes spin { to { transform: rotate(360deg); } }
        .spinner {
          width: 20px; height: 20px;
          border: 2.5px solid rgba(255,255,255,0.35);
          border-top-color: #fff;
          border-radius: 50%;
          animation: spin 0.75s linear infinite;
        }
        .card-glow {
          position: relative;
        }
        .card-glow::before {
          content: '';
          position: absolute;
          inset: -1px;
          border-radius: inherit;
          background: linear-gradient(110deg, #6B46C0, #00B4D8, #67E8F9, #6B46C0);
          background-size: 300% 300%;
          animation: borderShimmer 6s linear infinite;
          z-index: -1;
          opacity: 0.55;
          filter: blur(1px);
        }
        @keyframes borderShimmer {
          0%   { background-position: 0%   50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0%   50%; }
        }
      `}</style>

      <FluidBackground />

      <div className="relative flex items-center justify-center min-h-screen px-4 py-10" style={{ zIndex: 1 }}>
        <div className={`card-enter card-glow ${mounted ? "visible" : ""}`} style={{ borderRadius: "1.5rem" }}>
          <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl px-10 py-10 w-full" style={{ maxWidth: 420, minWidth: 320 }}>
            <div className="flex justify-center mb-6">
              <img src="/Icons/logo-gbe.png" alt="GBE Logo" className="h-20 w-auto object-contain drop-shadow-md" />
            </div>

            <h1 className="font-poppins font-extrabold text-center text-gray-800 mb-1" style={{ fontSize: "1.65rem", lineHeight: 1.2 }}>
              Bem-vindo ao <span className="gradient-text">GBE</span>
            </h1>
            <p className="font-inter text-center text-gray-400 text-sm mb-8">Faça login para continuar</p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-[#6B46C0] flex items-center pointer-events-none">
                  <img src="/Icons/lapis-icon.png" alt="" className="w-5 h-5 object-contain" />
                </span>
                <input type="text" value={ra} onChange={(e) => setRa(e.target.value)} placeholder="RA (Registro do Aluno)" required className="input-field font-inter w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm transition-all duration-200 placeholder-gray-400" />
              </div>

              <div className="relative flex items-center">
                <span className="absolute left-3.5 text-[#6B46C0] flex items-center pointer-events-none">
                  <img src="/Icons/cadeado-icon.png" alt="" className="w-5 h-5 object-contain" />
                </span>
                <input type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required className="input-field font-inter w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-700 text-sm transition-all duration-200 placeholder-gray-400" />
                <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3.5 text-gray-400 hover:text-[#00B4D8] transition-colors duration-150 focus:outline-none" tabIndex={-1}>
                  <EyeIcon open={showPassword} />
                </button>
              </div>

              <button type="submit" disabled={loading} className="btn-gradient font-poppins font-semibold w-full py-3 rounded-xl text-white text-base tracking-wide mt-2 flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed">
                {loading ? (
                  <>
                    <span className="spinner" />
                    <span>Entrando…</span>
                  </>
                ) : (
                  "Entrar"
                )}
              </button>
            </form>

            <div className="flex justify-between mt-6">
              <button type="button" onClick={() => setShowForgotModal(true)} className="font-inter text-sm transition-colors duration-150 hover:underline focus:outline-none" style={{ color: "#00B4D8" }}>
                Esqueceu sua senha?
              </button>
              <button type="button" onClick={() => setShowHelpModal(true)} className="font-inter text-sm transition-colors duration-150 hover:underline focus:outline-none" style={{ color: "#00B4D8" }}>
                Precisa de ajuda?
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Esqueceu sua senha? */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md" onClick={() => setShowForgotModal(false)}>
          <div onClick={(e) => e.stopImmediatePropagation()} className="bg-white rounded-3xl shadow-2xl w-full max-w-[380px] mx-4 overflow-hidden">
            <div className="px-8 pt-8 pb-6 text-center">
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-3">Esqueceu sua senha?</h2>
              <p className="font-inter text-gray-600 leading-relaxed">Entre em contato com o administrador da biblioteca para redefinir sua senha.</p>
            </div>
            <div className="px-8 pb-8">
              <button onClick={() => setShowForgotModal(false)} className="w-full bg-gray-900 hover:bg-gray-800 transition-colors text-white py-3.5 rounded-2xl font-medium text-base">Fechar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Precisa de ajuda? */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md" onClick={() => setShowHelpModal(false)}>
          <div onClick={(e) => e.stopImmediatePropagation()} className="bg-white rounded-3xl shadow-2xl w-full max-w-[380px] mx-4 overflow-hidden">
            <div className="px-8 pt-8 pb-6 text-center">
              <h2 className="font-poppins font-bold text-2xl text-gray-900 mb-3">Precisa de ajuda?</h2>
              <p className="font-inter text-gray-600 leading-relaxed">Consulte o monitor da biblioteca ou o bibliotecário responsável.</p>
            </div>
            <div className="px-8 pb-8">
              <button onClick={() => setShowHelpModal(false)} className="w-full bg-gray-900 hover:bg-gray-800 transition-colors text-white py-3.5 rounded-2xl font-medium text-base">Fechar</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
