const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./**/*.{html,php}"],
  theme: {
    extend: {
      fontFamily: {
        slab: ['"Roboto Slab"', 'serif'],
      },
    },
  },
  plugins: [],
};