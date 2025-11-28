/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class", // remove OS-based color changes
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  };