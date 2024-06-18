/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'white-shadow': '#fff',
      },
    },
  },
  plugins: [
    // Remove the line-clamp plugin as it's included by default
    // Other plugins can be listed here if needed
  ],
};
