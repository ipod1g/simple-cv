/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    listStyleType: {
      circle: 'circle',
    },
    extend: {
      colors: {
        greyish: '#95a7c7',
        pale: 'rgb(209,225,238)',
        // pale: 'rgb(229,229,229)',
        blueish: 'rgb(209, 225, 238)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        fadeOut1: 'fadeOut1 1s ease-out',
        fadeOut2: 'fadeOut2 1s ease-out',
      },
      keyframes: ({ theme }) => ({
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        rerender: {
          '0%': {
            ['border-color']: theme('colors.greyish'),
          },
          '40%': {
            ['border-color']: theme('colors.greyish'),
          },
        },
        fadeOut1: {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
        fadeOut2: {
          '0%': {
            opacity: 1,
          },
          '100%': {
            opacity: 0,
          },
        },
      }),
    },
  },
  plugins: [],
};
