/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: false,
  theme: {
    extend: {
      backgroundColor: {
        'primary': '#FFDE59',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
