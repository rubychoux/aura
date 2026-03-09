/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FDFCFA',
          100: '#FAF8F4',
          200: '#F5F0E8',
          300: '#EDE5D8',
          400: '#DDD0BF',
          500: '#C9B99A',
        },
        blush: {
          50: '#FDF6F3',
          100: '#FAE9E3',
          200: '#F5D0C4',
          300: '#EBB09E',
          400: '#D98C78',
          500: '#C97060',
          600: '#A85548',
        },
        sage: {
          50: '#F4F7F4',
          100: '#E4EDE4',
          200: '#C5D9C5',
          300: '#9ABE9A',
          400: '#6A9E6A',
          500: '#4A7C4A',
        },
        warm: {
          50: '#FAFAF7',
          100: '#F5F4F0',
          200: '#ECEAE4',
          300: '#D9D5CC',
          400: '#B8B2A7',
          500: '#8C857A',
          600: '#6B6560',
          700: '#4A4540',
          800: '#2E2A26',
          900: '#1A1714',
        },
        gold: {
          100: '#FDF4E0',
          200: '#F9E4A8',
          300: '#F0C84A',
          400: '#E0A800',
          500: '#C48900',
        }
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 16px rgba(0,0,0,0.06)',
        'softer': '0 1px 8px rgba(0,0,0,0.04)',
        'lifted': '0 8px 32px rgba(0,0,0,0.10)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}