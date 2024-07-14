/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      width: {
        lg: '40rem',
        xl: '48rem',
        '2xl': '52rem',
        '3xl': '60rem',
      },
      margin: {
        '128': '32rem'
      },
     colors: {
      primary: "hsl(0, 0%, 3%)",
      secondary: "hsl(0, 0%, 6%)",
      tertiary: "hsl(0, 0%, 12%)",
      accent: "#DCFE0B",
      light: "hsl(0, 0%, 95%)",
      txt: "hsl(255, 0%, 85%)",
      borderColor: "hsl(0, 0%, 17%)"
     },
    },
  },
  plugins: [],
};