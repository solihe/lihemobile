/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      colors: {
        gold: {
          light: '#DAA520',
          DEFAULT: '#B8860B',
          dark: '#8B6914'
        }
      },
      fontFamily: {
        serif: ['Noto Serif SC', 'serif'],
        sans: ['Noto Sans SC', 'sans-serif']
      },
      animation: {
        'float-up': 'floatUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'shine': 'shine 2s infinite'
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(to right, #B8860B, #DAA520)',
        'dark-gradient': 'linear-gradient(to bottom, rgba(0,0,0,0.7), rgba(0,0,0,0.3))'
      }
    }
  },
  plugins: []
}