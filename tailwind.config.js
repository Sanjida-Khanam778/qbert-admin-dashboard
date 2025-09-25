/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nunito: ["Nunito Sans", "serif"],
        outfit: ["Outfit", "serif"],
      },
      colors: {
        primary: "#0E4269",
        secondary: "#0C517E",
        sidebar: "#F0F0F0",
        neutral: "#263133",
        background: "#F9F9FA",
        grayText: "#6C757D",
        dark: "#202224",
        gray: "#EEEEEE",
      },
    },
  },
  plugins: [],
};
