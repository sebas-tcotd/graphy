/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "hsla(0, 0%, 98%, 1)",
        gray: {
          light: "hsla(224, 30%, 93%, 1)",
          dark: "hsla(224, 30%, 30%, 1)",
          DEFAULT: "hsla(224, 9%, 90%)"
        },
      },
      screens: {
        sx: "320px",
      },
      height: {
        "screen-dynamic": "100dvh"
      },
      boxShadow: {
        "inner-md": "inset 0 0 8px rgb(0 0 0 / 0.25 )"
      }
    },
  },
  plugins: [],
};
