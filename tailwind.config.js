// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        basteleur: ['var(--font-basteleur)'],
        abordage: ['var(--font-abordage)'],
        sans: ['var(--font-basteleur)'],
      },
    },
  },
  plugins: [],
};
