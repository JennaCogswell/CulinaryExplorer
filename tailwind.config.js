/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-gold": "#9C8712",
        "light-gold": "#F1E188",
        "rust-brown": "#724110",
        "light-brown": "#A3865E",
        "ash-grey": "#A4A291",
        "forest-green": "#4F5830",
        "light-black": "#373737",
        black: "#000000",
        white: "#ffffff",
      },
    },
    fontFamily: {},
  },
  variants: {
    width: ["responsive", "hover", "focus"],
  },
  plugins: [],
};
