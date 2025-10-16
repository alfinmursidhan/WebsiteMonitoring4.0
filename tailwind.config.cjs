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
        'gradient-weather': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        'gradient-monitoring': 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #ff6b35 0%, #f7931e 50%, #ffcc02 100%)',
        'gradient-orange-warm': 'linear-gradient(135deg, #ff9a56 0%, #ff6b35 50%, #e55d87 100%)',
        'gradient-orange-fire': 'linear-gradient(135deg, #ff8a00 0%, #e52e71 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)',
        'gradient-warm': 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}