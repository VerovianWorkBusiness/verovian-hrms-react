module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "montserrat": ["Montserrat, sans-serif"]
      },
      animation: {
        'bounce-slow': 'spin 3s linear infinite',
      },
      colors:{
        'verovian-purple': '#2D0048',
        'verovian-light-purple': '#F7EEFF',
      }
    },
  },
  plugins: [],
}
