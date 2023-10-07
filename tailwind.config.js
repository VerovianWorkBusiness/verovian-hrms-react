/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "montserrat": ["Montserrat, sans-serif"]
      },
    },
    colors:{
      'verovian-purple': '#2D0048',
      'verovian-light-purple': '#F7EEFF',
    }
  },
  plugins: [],
}