module.exports = {
  languageOptions: {
    globals: {
      browser: true,
      es2021: true,
    },
  },
  extends: ['airbnb', 'plugin:react/recommended', 'plugin:react/jsx-runtime'],
  rules: {
    'linebreak-style': ['error', 'unix'],
    'react/prop-types': 'off',
    quotes: ['error', 'single'],
    'no-multi-spaces': ['error'],
  },
};
