/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        mobile: '350px', // Example for iPhone X
      },
    },
    container: {
      padding: {
        lg: "10rem",
        md: "4rem",
        mobile: "0.25rem",
      },
    },
  },
  plugins: [],
}

