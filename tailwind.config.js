//  @type {import('tailwindcss').Config} 
module.exports = {
  //  purge: {
  //       enabled: false,
  //       content: ["./src/**/*.{html,js}"],
  //   },
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'green-pallete': '#17b794',
      },
    },
  },
  plugins: [],
}