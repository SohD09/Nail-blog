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
        "dark-pink": "#A5678E",
      },
    },
  },
  plugins: [flowbite.plugin()],
};
