const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ["./**/*.{html,php,js}", "!./node_modules/**"], 
  theme: {
    extend: {
      colors: {
        'cream': '#E5E5E0',
        'cream-dim': '#A8A8A0',
        'warm-black': '#0c0a09',
        'glass-bg': 'rgba(30, 25, 22, 0.5)',
        'glass-border': 'rgba(255, 230, 200, 0.05)',
      },
      fontFamily: {
        'display': ['"Cormorant Garamond"', 'serif'],
        'body': ['"Montserrat"', 'sans-serif'],
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
        'vignette': "radial-gradient(circle at 50% 30%, rgba(60, 40, 20, 0.15), rgba(12, 10, 9, 0.9))",
      },
      boxShadow: {
        'glass': '0 10px 40px -10px rgba(0, 0, 0, 0.7)',
      },
      keyframes: {
        breathe: {
            '0%, 100%': { transform: 'scale(1)' },
            '50%': { transform: 'scale(1.05)' },
        }
      },
      animation: {
        breathe: 'breathe 20s ease-in-out infinite',
      }
    },
  },
  plugins: [],
};
