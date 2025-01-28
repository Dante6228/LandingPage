const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./src/**/*.{html,js,php}"],
  theme: {
    extend: {
      fontFamily: {
        slab: ['"Roboto Slab"', 'serif'],
      },
    },
  },
  plugins: [],
};