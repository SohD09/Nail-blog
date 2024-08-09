const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#183155",
        "royal-blue": "#33539E",
        "off-white": "#EEEEEE",
        "milky-white": "#FCFCFC",
        "light-blue": "#7FACD6",
        "grey-blue": "#BFB8DA",
        "light-pink": "#E8B7D4",
        "dark-pink": "#c00384",
        "muted-pink": "#f4c3d3",
        cyclamen: "#F575A6",
        orchid: "#5e2390",
        magenta: "#8b0d88",
        "pastel-magenta": "#f795c7",
        "classic-rose": "#f9cbe7",
        vodka: "#c4b5e0",
        "light-cobalt-blue": "#85aadf",
        "cyan-blue-azure": "#447ac4",
        "dark-theme-bg": "rgb(16,23,42)",
      },
      fontFamily: {
        Rosaviro: ["Rosarivo"],
      },
    },
  },
  plugins: [flowbite.plugin()],
};
