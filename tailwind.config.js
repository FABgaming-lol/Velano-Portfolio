/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          light: "#ffffff",
          dark: "#000000",
        },
        text: {
          primary: {
            light: "#0a0a0a",
            dark: "#ffffff",
          },
          secondary: {
            light: "#4b5563", // gray-600
            dark: "#9ca3af", // gray-400
          },
        },
        border: {
          subtle: {
            light: "rgba(0,0,0,0.08)",
            dark: "rgba(255,255,255,0.12)",
          },
        },
      },
      spacing: {
        section: "8rem",
        "section-md": "10rem",
      },
      maxWidth: {
        content: "72rem",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};