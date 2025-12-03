/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FDF8F0',
          100: '#FAF2E1',
          200: '#F5E6C3',
          300: '#EFD9A5',
          400: '#EACD87',
          500: '#C6A769', // Premium gold from Kagimedia
          600: '#A88B54',
          700: '#8B6F3D',
          800: '#6D5326',
          900: '#4F3A15',
        },
        charcoal: {
          50: '#F5F5F5',
          100: '#E9E9E9',
          200: '#D9D9D9',
          300: '#C4C4C4',
          400: '#9D9D9D',
          500: '#7B7B7B',
          600: '#555555',
          700: '#434343',
          800: '#262626',
          900: '#1A1A1A',
        },
        sand: {
          50: '#FDFCF9',
          100: '#FAF8F3',
          200: '#F5F1E8',
          300: '#F0EADD',
          400: '#EBE3D2',
          500: '#E6DCC7',
        },
      },
      fontFamily: {
        'display': ['"Cormorant Garamond"', 'serif'],
        'body': ['"Libre Franklin"', 'sans-serif'],
      },
      fontSize: {
        'xxs': '0.625rem',
        'display-lg': '5.5rem',
        'display': '4.5rem',
        'display-sm': '3.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'slide-down': 'slideDown 0.6s ease-out',
        'scale-in': 'scaleIn 0.4s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'pulse-gentle': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
      backdropBlur: {
        'xs': '2px',
      },
      // v3.4+ features
      supports: {
        'no-scroll-driven-animations': 'not(animation-timeline: scroll())',
      },
      // Optional: Add CSS custom properties for better theming
      textShadow: {
        'luxury': '0 2px 4px rgba(0,0,0,0.1)',
      },
    },
  },
  plugins: [
    // Add custom plugin for luxury effects
    function({ addUtilities }) {
      addUtilities({
        '.text-shadow-luxury': {
          'text-shadow': '0 2px 4px rgba(0,0,0,0.1)',
        },
        '.backdrop-blur-luxury': {
          'backdrop-filter': 'blur(20px)',
        },
        '.perspective-1000': {
          'perspective': '1000px',
        },
        '.transform-style-3d': {
          'transform-style': 'preserve-3d',
        },
      })
    }
  ],
}