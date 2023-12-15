import adapter from '@sveltejs/adapter-static';

import { vitePreprocess } from '@sveltejs/kit/vite';
/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		alias: {
			$stores: 'src/lib/stores',
			$data: 'src/data',
			$components: 'src/routes/components'
		},
		adapter: adapter()
	},
	preprocess: vitePreprocess()
};
export default config;
