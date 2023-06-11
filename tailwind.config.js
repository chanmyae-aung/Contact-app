/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      // fontFamily: {
      //   nunito: ['"Nunito Sans"', ...defaultTheme.fontFamily.serif]
      // }
    },
  },
  plugins: [require("daisyui"), require('flowbite/plugin')],
}