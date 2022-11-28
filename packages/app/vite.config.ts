import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
	plugins: [
		dts({
			outputDir: 'dist/types',
			tsConfigFilePath: resolve(__dirname, 'tsconfig.json'),
			insertTypesEntry: true,
		}),
		react({
			jsxRuntime: 'automatic',
		}),
	],
	build: {
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'app',
			fileName: (format) => `app.${format}.js`,
		},
		rollupOptions: {
			external: ['react', 'shared'],
			output: {
				globals: {
					react: 'React',
				},
			},
		},
	},
	resolve: {
		alias: {
			'@app-src': resolve(__dirname, 'src/lib'),
		},
	},
});
