import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        rbBlue: '#243c5a',
        rbGray: '#161616',
        rbGrey: '#556270',
        rbBlack: '#161616',
        rbFordDark: '#242424',
      },
      fontFamily: {
        kanit: ['Kanit', 'sans-serif'],
      },
      fontWeight: { light: '300', normal: '400', bold: '700' },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
export default config;
