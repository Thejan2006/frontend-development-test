/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // We extend colors if needed, but standard Tailwind colors will now be fully available.
        primary: '#0f172a',
        accent: '#2563eb',
        'accent-dark': '#1d4ed8',
      }
    },
  },
  plugins: [],
}
