/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0f172a',
        secondary: '#1e293b',
        accent: '#2563eb',
        'accent-dark': '#1d4ed8',
        bg: '#f8fafc',
        surface: '#ffffff',
        muted: '#6b7280',
        border: '#e2e8f0',
      },
      backgroundImage: {
        gradient: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
      },
    },
  },
  plugins: [],
}
