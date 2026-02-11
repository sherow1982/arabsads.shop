/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E85A2A',
          dark: '#C74820',
          light: '#FF6B35',
        },
        secondary: {
          DEFAULT: '#003A66',
          dark: '#002847',
          light: '#004E89',
        },
        accent: {
          DEFAULT: '#E6BD2F',
          dark: '#CCA820',
        },
        dark: {
          DEFAULT: '#1A1A1A',
          2: '#2D2D2D',
          3: '#4D4D4D',
        },
        light: {
          DEFAULT: '#FFFFFF',
          gray: '#F5F5F5',
          border: '#D0D0D0',
        },
        success: '#00A843',
        danger: '#D32F00',
        warning: '#E6BD2F',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.08)',
        'hover': '0 5px 15px rgba(0,0,0,0.15)',
        'top': '0 -2px 10px rgba(0,0,0,0.05)',
      },
      fontFamily: {
        arabic: ['Cairo', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
