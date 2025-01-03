/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1020px",
      xl: "1440px",
    },

    extend: {
      colors: {
        lightBlue: "hsl(215.02, 98.39%, 51.18%)",
        darkBlue: "hsl(213.86, 58.82%, 46.67%)",
        lightGreen: "hsl(156.62, 73.33%, 58.82%)",
        loginBackgroundColor: "#E4E7EB",
        navbarItemHoverBgColor: "#E9F2FF",
        navbarItemHoverColor: "#0C66E4",
      },
      width: {
        1280: "1280px",
        312: "312px",
        432: "432px",
        382: "382px",
        300: "300px",
        769: "769px",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      spacing: {
        180: "32rem",
      },
    },
  },
  plugins: [],
};
