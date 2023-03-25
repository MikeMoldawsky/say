/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#6EE7B7',
        'secondary': '#3B82F6',
        'accent': '#9333EA',
      },
      textColor: {
        'primary': '#6EE7B7',
        'secondary': '#3B82F6',
        'accent': '#9333EA',
      },
    },
  },
  variants: {},
  plugins: [],
}

