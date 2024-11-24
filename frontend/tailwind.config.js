/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        purpledark: "rgba(23,6,42,255)",
        darkblue: "rgba(30,8,54,255)",
        sidebarbg: "rgb(14, 13, 24)",
      },
      boxShadow: {
        'custom': '10px 1px 15px -4px rgba(128, 128, 128, 0.75)',
      },
    },
  },
  plugins: [],
}

