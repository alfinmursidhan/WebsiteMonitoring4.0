/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        orange: {
          DEFAULT: '#FF9500',
          light: '#FFB347',
          dark: '#E6851A',
        },
      },
      backgroundImage: {
        'gradient-orange': 'linear-gradient(135deg, #FFB347 0%, #FF9500 50%, #E6851A 100%)',
        'gradient-pink-orange': 'linear-gradient(135deg, #FFE4E1 0%, #FFB347 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}