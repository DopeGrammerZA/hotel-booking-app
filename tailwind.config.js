// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#fdf9f0',
          100: '#faf3e0',
          200: '#f5e8c7',
          300: '#f0dda0',
          400: '#ebd17a',
          500: '#d4af37', // Primary gold
          600: '#b8941f',
          700: '#9a7a18',
          800: '#7c6112',
          900: '#5e490d',
        },
        ivory: {
          50: '#fefdfb',
          100: '#fdfbf8',
          200: '#faf7f2',
          300: '#f7f2ec',
          400: '#f4eee6',
          500: '#f0e8de',
          600: '#e8ddce',
          700: '#e0d2be',
          800: '#d8c7ae',
          900: '#d0bc9e',
        },
        charcoal: {
          50: '#f7f7f7',
          100: '#eaeaea',
          200: '#d6d6d6',
          300: '#b8b8b8',
          400: '#8f8f8f',
          500: '#6c6c6c',
          600: '#555555',
          700: '#3d3d3d',
          800: '#2d2d2d',
          900: '#1a1a1a',
        }
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out',
        'fade-in': 'fadeIn 0.5s ease-in',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}