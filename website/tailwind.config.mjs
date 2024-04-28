import plugin from 'tailwindcss/plugin';
/** @type {import('tailwindcss').Config} */
export default {
 content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
 theme: {
  extend: {
   animation: {
    blurIn: 'blurIn 1s linear',
   },
   keyframes: {
    blurIn: {
     '0%': { filter: 'blur(3px)' },
     '100%': { filter: 'blur(0px)' },
    },
   },
  },
  plugins: [
   plugin(function ({ addBase }) {
    addBase({
     h1: { fontSize: '32px', lineHeight: '44.8px' },
    });
   }),
  ],
 },
};
