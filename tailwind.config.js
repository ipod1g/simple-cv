/** @type {import('tailwindcss').Config} */
module.exports = {
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
        blueish: 'rgb(209, 225, 238)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
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
      }),
    },
  },
  plugins: [],
};
