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
          "primary": "#904b40",
          "secondary": "#735187",
          "accent": "#781666",
          "neutral": "#0b0c07",
          "base-100": "#fff8f6",
          "info": "#60a5fa",
          "success": "#0f766e",
          "warning": "#ff7d66",
          "error": "#ba1a1a",
        },
        dark: {
          "primary": "#ffb4a8",     
          "secondary": "#e0b8f5",
          "accent": "#781666",
          "neutral": "#0b0c07",
          "base-100": "#1a1110",
          "info": "#60a5fa",
          "success": "#0f766e",
          "warning": "#ff7d66",
          "error": "#ba1a1a",
        },
      },
    ],
  },
  plugins: [
    require('daisyui')
  ],
}

