/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: ["corporate", "business"]
  }
}

/**
 * bons temas dark
 * 
 * business <- gostei bastante *Henrique
 * night
 * sunset
 * dim
 * dracula
 * dark <- estavamos usando
 */