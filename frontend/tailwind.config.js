/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        mint: {
          50: "#F0FDFA", // Sangat muda (background halus)
          100: "#CCFBF1", // Muda
          200: "#99F6E4", // Soft Mint
          300: "#5EEAD4", // Fresh Mint
          400: "#2DD4BF", // Medium Mint
          500: "#14B8A6", // Primary Mint (Teal-ish)
          600: "#0D9488", // Darker Mint
          700: "#0F766E",
          800: "#115E59",
          900: "#134E4A",
        },
      },
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
};
