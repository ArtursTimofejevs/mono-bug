import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		dts({
			outputDir: 'dist/types',
		}),
		react({
			jsxRuntime: 'automatic',
		}),
	],
	build: {
		write: false,
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'shared',
			fileName: (format) => `shared.${format}.js`,
		},
		rollupOptions: {
			external: ['react'],
			output: {
				globals: {
					react: 'React',
				},
			},
		},
	},
	resolve: {
		alias: {
			'@shared-src': resolve(__dirname, 'src'),
		},
	},
});
