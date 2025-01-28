/** @type {import('tailwindcss').Config} */

const defaultTheme = require('tailwindcss/defaultTheme');

const safeList = [
	'stroke-indigo-400',
	'stroke-pink-400',
	'stroke-yellow-400',
	'stroke-yellow-500',
	'stroke-blue-500',
	'stroke-rose-500',
	'stroke-indigo-500',
	'stroke-teal-500',
	'stroke-sky-500',
	'text-teal-600',
	'text-teal-700',
	'text-indigo-600',
	'text-rose-600',
	'text-[#b7791f]',
	'text-sky-700',
	'dark:text-sky-300',
	'from-indigo-500',
	'via-indigo-600',
	'to-indigo-700',
	'from-rose-500',
	'via-rose-700',
	'to-rose-700',
	'from-teal-500',
	'via-teal-700',
	'to-teal-700',
	'from-sky-500',
	'via-sky-600',
	'to-sky-700',
	'from-yellow-500',
	'via-yellow-700',
	'to-yellow-700',
	'via-indigo-50',
	'via-rose-50',
	'via-teal-50',
	'via-yellow-50',
	'border-indigo-600',
	'border-rose-600',
	'border-teal-600',
	'border-yellow-600',
	'border-sky-600',
];

module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	safelist: [
		...safeList,
		'hover:text-location',
		'hover:text-linkedin',
		'hover:text-website',
		'hover:text-github',
		'hover:text-email'
	],
	darkMode: 'class',
	theme: {
		extend: {
			screens: {
				xxs: '320px',
				xs: '490px',
				mxl: '1436px',
				...defaultTheme.screens
			},
			fontSize: {
				ss: '0.8125rem'
			},
			lineHeight: {
				ss: '1.5rem'
			},
			spacing: {
				ss: '3rem'
			},
			colors: {
				nhs_blue: '#005EB8',
				nhs_bright_blue: '#0072CE',
				linkedin: '#0072B1',
				website: '#7e22ce',
				location: '#4f46e5',
				github: '#171515',
				email: '#e11d48',

				...defaultTheme.colors
			},
			fontFamily: {
				poppins: ['Poppins'],
				customParagraph: ['Roboto'],
				customHeading: ['Roboto Slab'],
				customQuote: ['Heebo']
			},
			keyframes: {
				'fade-in': {
					'0%': {
						opacity: '0'
					},
					'100%': {
						opacity: '1'
					}
				}
			},
			animation: {
				'fade-in': 'fade-in 0.5s ease-out'
			}
		},
		variants: {
			fill: ['hover', 'focus']
		}
	},
	plugins: []
};
