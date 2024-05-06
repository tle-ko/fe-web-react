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
        gray: colors.coolGray,
        'color-gray-c': '#A8B9CC',
        'color-bg': '#F8F9FA',
        'color-blue': {
          main: '#5383E8',
          w75: '#D4E0F9',
          pt: '#3776AB',
          cpp: '#3776AB',
        },
        'color-level1-green': '#00D7B0',
        'color-level2-yellow': '#FFB902',
        'color-level3-pink': '#F56CB6',
        'color-red': {
          x: '#E84057',
          java: '#E11F21'
        },
        'color-green': '#03BBA3',
        'color-yellow': {
          default: '#FFB902',
          w50: 'rgba(255, 185, 2, 50)',
        }
      },
      fontFamily: {
        cafe24: ["Cafe24Ssurround", "sans-serif"],
        pretendard: ["Pretendard-Regular", "sans-serif"],
      },
      letterSpacing: {
        m1: '-0.0625rem',
      }
    },
  },
  plugins: [],
}

