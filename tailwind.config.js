import konstaConfig from 'konsta/config';
import colors from 'tailwindcss/colors';

module.exports = konstaConfig({
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'class', // or 'class'
	konsta: {
		colors: {
			// "primary" is the main app color, if not specified will be default to '#007aff'
			primary: '#007aff',
			'bg-ios-light-surface': '#fff',
			'bg-ios-dark-surface': '#000'
		}
	},
	theme: {
		extend: {
			colors: {
				bgDark: colors.black,
				bgLight: colors.white,
				tLight: colors.slate[600],
				tDark: colors.slate[400],
				// static colors that you can override
				'ios-light-surface': '#fff',
				'ios-dark-surface': '#000',
				'ios-light-surface-1': '#fff',
				'ios-dark-surface-1': '#1c1c1d',
				'ios-light-surface-2': '#f7f7f8',
				'ios-dark-surface-2': '#121212',
				'ios-light-surface-3': '#fff',
				'ios-dark-surface-3': '#1c1c1d',
				'ios-light-surface-variant': '#f4f4f4',
				'ios-dark-surface-variant': '#232323'
			}
		}
	},
	variants: {
		extend: {}
	},
	plugins: []
});
