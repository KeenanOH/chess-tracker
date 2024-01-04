/** @type {import('tailwindcss').Config} */
export default {
  content:  [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      text: "#0A0B0B",
      background: "#FAFBFB",
      primary: "#77909B",
      secondary: "#A7BCC5",
      accent: "#8BACBA",
      transparent: "transparent",
      red: "#D30000"
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
      'display': ['Montserrat', 'sans-serif'],
      'body': ['Montserrat', 'sans-serif'],
    }
  },
  plugins: [],
}

