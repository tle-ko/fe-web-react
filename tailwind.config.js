/** @type {import('tailwindcss').Config} */

const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: colors.white,
        black: colors.black,
        'color-gray-c': '#A8B9CC',
        'color-bg': '#F8F9FA',
        'color-blue': {
          main: '#5383E8',
          w25: '#D4E0F9',
          w50: '#A8C0F3',
          w75: '#7EA2EE',
          hover : '#4171D6',
          pt: '#3776AB',
          cpp: '#3776AB',
        },
        'color-level1-green': '#00D7B0',
        'color-level2-yellow': '#FFB902',
        'color-level3-pink': '#F56CB6',
        'color-red': {
          main: '#E84057',
          java: '#E11F21'
        },
        'color-green': '#03BBA3',
        'color-yellow': {
          default: '#FFB902',
          w50: '#FFCA41',
        }
      },
      size: {
        '120px': '120px',
      },
      fontFamily: {
        cafe24: ["Cafe24Ssurround", "sans-serif"],
        pretendard: ["Pretendard-Regular", "sans-serif"],
      },
      letterSpacing: {
        m1: '-0.0625rem',
      },
      fontSize: {
        'base-14': '14px',
        'base-15': '15px',
        'base-16': '16px',
        'base-l8': '18px',
        'base-20': '20px',
        'base-24': '24px',
        'base-28': '28px',
        'base-32': '32px',
      },
    },
    screens: {
      'sm': '640px',

      'md': '768px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1536px',
    }
  },
  variants: {},
  plugins: [],
}

