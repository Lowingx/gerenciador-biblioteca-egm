import { motion } from "framer-motion";

export default function FluidBackground() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#6B46C0] via-[#00B4D8] to-[#67E8F9] overflow-hidden">
      {/* Onda principal */}
      <div
        className="absolute inset-0 opacity-55 fluid-bg"
        style={{
          background: `
            radial-gradient(circle at 20% 30%, rgba(103,232,249,0.85) 0%, transparent 50%),
            radial-gradient(circle at 75% 65%, rgba(0,180,216,0.75) 0%, transparent 50%),
            radial-gradient(circle at 40% 85%, rgba(107,70,192,0.6) 0%, transparent 50%)
          `,
          backgroundSize: "250% 250%",
        }}
      />

      {/* Onda secundária mais lenta */}
      <div
        className="absolute inset-0 opacity-35 fluid-bg2"
        style={{
          background: `
            radial-gradient(circle at 65% 25%, rgba(255,255,255,0.4) 0%, transparent 45%),
            radial-gradient(circle at 30% 75%, rgba(103,232,249,0.5) 0%, transparent 50%)
          `,
          backgroundSize: "300% 300%",
        }}
      />

      {/* Brilho que varre lentamente */}
      <motion.div
        className="absolute inset-0 opacity-20"
        animate={{ x: ["-150%", "350%"] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
        }}
      />
    </div>
  );
}
