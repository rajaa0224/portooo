/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Restrained "engineering notebook" palette — no flashy gradients.
        paper: '#f7f5f0',
        ink: '#1c1c1a',
        slate: {
          muted: '#5b5f66',
        },
        accent: {
          DEFAULT: '#1f4e5f', // deep teal-navy
          soft: '#dfe7e9',
        },
        amber: {
          mark: '#b45309', // used sparingly for status / highlights
        },
        line: '#d9d4ca', // hairline borders
      },
      fontFamily: {
        sans: ['Kanit', 'system-ui', 'sans-serif'],
        body: ['Kanit', 'system-ui', 'sans-serif'],
        kanit: ['Kanit', 'system-ui', 'sans-serif'],
        mono: ['Consolas', 'Menlo', 'Monaco', 'monospace'],
      },
      maxWidth: {
        content: '1080px',
      },
    },
  },
  plugins: [],
}
