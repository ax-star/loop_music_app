/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        light: {
          "primary": "#56534e",//
          "secondary": "#bcbfb0",//
          "accent": "#a7af9d",//
          "neutral": "#060605",//
          "base-100": "#f8f7f6",//
        },
        dark: {
          "primary": "#b1aea9", //    
          "secondary": "#4c4f40",//
          "accent": "#5a6250",//
          "neutral": "#fafaf9",//
          "base-100": "#090807",//
        },
      },
    ],
  },
  plugins: [
    require('daisyui')
  ],
}

