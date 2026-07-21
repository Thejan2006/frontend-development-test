/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    colors: {
      // Grayscale
      white: '#ffffff',
      black: '#000000',
      slate: {
        50: '#f8fafc',
        200: '#e2e8f0',
        500: '#64748b',
        700: '#334155',
        900: '#0f172a',
      },
      gray: {
        200: '#e5e7eb',
        300: '#d1d5db',
        500: '#6b7280',
      },
      blue: {
        500: '#3b82f6',
        600: '#2563eb',
        700: '#1d4ed8',
      },
    },
    extend: {
      backgroundImage: {
        gradient: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
      },
    },
  },
  plugins: [],
}

