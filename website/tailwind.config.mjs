import plugin from 'tailwindcss/plugin'
/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {},
	},
	plugins: [
		plugin(function ({ addBase }) {
			addBase({
				h1: { fontSize: '32px', lineHeight: '44.8px' },
			});
		})
	],
}
