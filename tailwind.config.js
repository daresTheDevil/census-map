// tailwind.config.js
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [],
  theme: {
    zIndex: {
      overlay: 9999
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  variants: {},
  plugins: [require('@tailwindcss/ui')]
}
