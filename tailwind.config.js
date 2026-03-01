/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'val-bg': '#0f1923',
        'val-accent': '#ff4655',
        'val-text': '#ece8e1',
        'val-dark': '#1a2535',
        'val-border': '#2a3a4a',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
