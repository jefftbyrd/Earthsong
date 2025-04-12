// tailwind.config.js

// const config = {
//   theme: {
//     extend: {
//       fontFamily: {
//         basteleur: ['var(--font-basteleur)'],
//       },
//     },
//   },
// };

// export default config;

/** @type {import('tailwindcss').Config} */
export const content = [
  './pages/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
  './app/**/*.{js,ts,jsx,tsx}',
];
export const theme = {
  extend: {
    fontFamily: {
      basteleur: ['var(--font-basteleur)'],
    },
  },
};
export const plugins = [];
