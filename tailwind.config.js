/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'public-sans-regular': ['Public Sans', 'sans-serif'],
        'public-sans-bold': ['Public Sans', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontWeight: {
        'public-sans-regular': 400,
        'public-sans-bold': 700,
      }
    },
  },
  plugins: [],
}