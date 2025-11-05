/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#0a0a0a',
        'secondary-bg': '#252525',
        'card-bg': '#2d2d2d',
        'text-primary': '#ffffff',
        'text-secondary': '#e0e0e0',
        'text-muted': '#999999',
        'accent-flame': '#ff6600',
        'accent-flame-hover': '#ff8800',
        'accent-gold': '#ffb84d',
        'border-dark': '#404040'
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'serif'],
      },
    },
  },
  plugins: [],
}

