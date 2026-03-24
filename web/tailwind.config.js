/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'egm-bg': '#F8F9FA',      // Fundo geral (off-white)
        'egm-panel': '#E9ECEF',   // O cinza dos blocos/cards
        'egm-accent': '#6C757D',  // Texto secundário e ícones
      },
      borderRadius: {
        'egm': '1.5rem', // O arredondamento "ultra" do PDF
      }
    },
  },
  plugins: [],
}
