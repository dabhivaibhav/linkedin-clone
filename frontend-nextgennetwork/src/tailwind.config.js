export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        linkedin: {
          blue: "#0A66C2",
          light: "#F3F2EF",
          text: "#5E5E5E"
        }
      },
      fontFamily: {
        sans: ['"Segoe UI"', 'Roboto', 'sans-serif']
      }
    },
  },
  plugins: [],
}
