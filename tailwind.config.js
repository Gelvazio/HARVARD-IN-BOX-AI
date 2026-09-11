/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f4ff',
          100: '#e8eef7',
          500: '#667eea',
          600: '#5568d3',
          700: '#4b5ac2',
          900: '#2d3748',
        },
        secondary: {
          500: '#764ba2',
          600: '#6a3f95',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
      },
      boxShadow: {
        sm: '0 2px 8px rgba(0,0,0,0.1)',
        md: '0 10px 30px rgba(0,0,0,0.1)',
        lg: '0 15px 40px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}
