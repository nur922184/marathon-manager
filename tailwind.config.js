/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    themes: ["light", "dark", "cupcake"],
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
}

