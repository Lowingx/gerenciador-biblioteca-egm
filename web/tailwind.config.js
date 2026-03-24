/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'egm-bg': '#F8F9FA',
        'egm-panel': '#E9ECEF',
      },
      borderRadius: {
        'egm': '2rem',
      }
    },
  },
  plugins: [],
}
