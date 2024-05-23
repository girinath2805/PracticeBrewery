/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'home-background': "url('./assets/background.jpg')",
      })
    },
    backdropFilter: {
      'none': 'none',
      'blur': 'blur(20px)',
    },
  },
  variants: {
    extend: {
      backdropFilter: ['responsive'], // or other variants you need
    },
  },
  plugins: [
    require('@tailwindcss/postcss7-compat'),
    require('tailwindcss-filters'),
  ],
}