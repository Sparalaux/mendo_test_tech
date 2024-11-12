/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        logincadre: "url('../public/images/logincadre.png')",
        buttoncadre: "url('../public/images/buttoncadre.png')",
      },
      fontFamily: {
        justicefest: ['JusticeFest', 'sans-serif'],
        doodles: ['Doodles', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
