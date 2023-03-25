/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#A0E7E5',
        'secondary': '#6EE7B7',
        'accent': '#9333EA',
      },
      textColor: {
        'primary': '#A7E9AF',
        'secondary': '#6EE7B7',
        'accent': '#9333EA',
      },
    },
  },
  variants: {},
  plugins: [],
}

