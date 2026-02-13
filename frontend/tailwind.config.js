/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        purpleDeep: '#2D0A31',
        greenForest: '#1B4332',
        creamSoft: '#F8F4E1',
        purpleVibrant: '#8E44AD',
        ochreNatural: '#BC8A5F',
        ink: '#1E1B1B'
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif']
      },
      boxShadow: {
        card: '0 20px 60px rgba(45, 10, 49, 0.12)',
        soft: '0 10px 30px rgba(27, 67, 50, 0.12)'
      }
    }
  },
  plugins: []
}
