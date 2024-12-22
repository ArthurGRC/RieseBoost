import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'rbSilver-to-seasalt': 'linear-gradient(to bottom, #C5C6C8 11%, #F8FAFA 100%)'
      },
      colors: {
        rbSeasalt: '#F8FAFA',
        rbSilver: '#C5C6C8',
        rbGray: '#818283',
        rbDavysGray: '#4F5052',
        rbRaisinBlack: '#282728',
        rbNight: '#0D0E10',
        rbLightCoral: '#F28C8C',
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        bold: '700',
      }
    },
  },
  plugins: [require('@tailwindcss/forms'), require('tailwindcss-animate')],
};
export default config;
