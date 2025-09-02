/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lemon: ["Lemon", "cursive"],
        robotoCondensed: ["Roboto Condensed", "sans-serif"],
        roboto: ["Roboto", "sans-serif"]
      },
      colors: {
        hyenaPrimary: "#3E2617", // Deep brown
        hyenaTan: "#E2C08D", // Tan
        hyenaCream: "#F5E3B3", // Cream
        hyenaBlack: "#1A1A1C", // Black
        hyenaRed: "#E53935", // Red accent
      }
    }
  },
  plugins: []
};
