/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#edbd4c',
        accent: '#2c2c2c',
        gold: '#edbd4c',
        dark: '#111111',
        light: '#f8f9fa',
      },
      fontFamily: {
        heading: ['Josefin Sans', 'Poppins', 'sans-serif'],
        body: ['Open Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
