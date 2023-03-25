/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#45AEEE",
          secondary: "#EF9FBC",
          accent: "#EEAF3A",
          neutral: "#D3E5E9",
          "base-100": "#f5f9fa",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
      {
        dark: {
          primary: "#45AEEE",
          secondary: "#EF9FBC",
          accent: "#EEAF3A",
          neutral: "#272737",
          "base-100": "#121219",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
