/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
      },
      keyframes: {
        slideUp: {
          "0%": { opacity: 0, transform: "translateY(40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: 0, transform: "translateY(-40px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};