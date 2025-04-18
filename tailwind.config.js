// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export const content = [
  './pages/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
  './app/**/*.{js,ts,jsx,tsx}',
];
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        basteleur: ['var(--font-basteleur)'],
        sans: ['var(--font-basteleur)'], // This makes Basteleur the default font
      },
    },
  },
};
export const plugins = [];
