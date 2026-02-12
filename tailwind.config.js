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
          DEFAULT: '#83B735',
          dark: '#5F8A28',
          light: '#9FD149',
        },
        secondary: {
          DEFAULT: '#2D2A2A',
          dark: '#1A1818',
          light: '#3E3B3B',
        },
        accent: {
          DEFAULT: '#FFA500',
          dark: '#E69500',
        },
        dark: {
          DEFAULT: '#242424',
          2: '#333333',
          3: '#4A4A4A',
        },
        light: {
          DEFAULT: '#FFFFFF',
          gray: '#F5F5F5',
          border: '#E0E0E0',
        },
        success: '#83B735',
        danger: '#E74C3C',
        warning: '#FFA500',
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
