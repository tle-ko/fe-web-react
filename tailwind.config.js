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
        'color-green': {
          default: '#03BBA3',
          w50: '#81DDD1',
        },
        'color-yellow': {
          default: '#FFB902',
          w50: '#FFCA41',
        },
        'color-pink': {
          w50: '#FAB6DB',
        }
      },
      fontFamily: {
        cafe24: ["Cafe24Ssurround", "sans-serif"],
        pretendard: ["Pretendard-Regular", "sans-serif"],
      },
      letterSpacing: {
        m1: '-0.0625rem',
      },
      fontSize: {
        'md': ['0.938rem', { lineHeight: '1.5' }], // 15px
        '2xxl': ['1.75rem', { lineHeight: '2' }], // 28px
        '3xxl': ['2rem', { lineHeight: '2.25' }], // 32px
        '4xxl': ['2.5rem', { lineHeight: '2.5' }], // 40px
      },
      spacing: {
        '30rem': '30rem', // 반응형 최소 사이즈
      },
    },
    screens: {
      'xs': '320px',
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

