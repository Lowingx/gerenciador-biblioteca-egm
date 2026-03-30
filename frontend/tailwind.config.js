/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'egm-bg': '#F1F3F5',
        'egm-card': '#DEE2E6',
      },
      borderRadius: {
        'egm': '2.5rem',
      }
    },
  },
  plugins: [],
}
