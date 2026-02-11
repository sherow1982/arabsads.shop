/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#1C274C',
          2: '#495270',
          3: '#606882',
          4: '#8D93A5',
          5: '#BBBEC9',
        },
        gray: {
          1: '#F9FAFB',
          2: '#F3F4F6',
          3: '#E5E7EB',
          4: '#D1D5DB',
        },
        blue: {
          DEFAULT: '#3C50E0',
          dark: '#1C3FB7',
        },
        red: '#F23030',
      },
      boxShadow: {
        1: '0px 1px 2px 0px rgba(166, 175, 195, 0.25)',
        input: 'inset 0 0 0 2px #3C50E0',
      },
    },
  },
  plugins: [],
}
