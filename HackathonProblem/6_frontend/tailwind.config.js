/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        titleFont : ["Nunito", "sans-serif"],
        answer: ["Titillium Web", "sans-serif"],
        question: ["Jost", "sans-serif"]
      },
      colors:{
        titleColor:"#DADADA"
      },
      height:{
        '123':'20rem',
        '456':'10rem',
      },
      width:{
        '123':'12rem',
        '456':'7rem',
      }
    },
  },
  plugins: [],
}