/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        brother1816: ["Brother 1816"],
        eigerdals: ["Eigerdals"],
      },
      colors: {
        black: "#000000", // Black
        blue: "#3d8bc9", // Light Blue
        white: "#ede1c7", // White
        darkBlue: "#516ba8", // Dark Blue
        wine: "#5a003d", // Wine
        red: "#ea4756", // Red
        pink: "#eb8fc2", // Pink
        olive: "#789d3d", // Olive
        teal: "#00846d", // Teal
        yellow: "#f8e447", // Yellow
      },
    },
  },
  plugins: [],
};
