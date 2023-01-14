/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  // darkMode: false, // or 'media' or 'class'
  darkMode: "media", // or 'media' or 'class'
  theme: {
    maxWidth: {
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
    },
    extend: {
      colors: {
        'sky-blue': '#1ec7e6'
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
