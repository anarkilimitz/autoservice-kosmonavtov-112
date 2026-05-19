import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';
import { resolve } from 'path';

export default defineConfig({
	root: 'src',

	publicDir: '../public',

	server: {
		port: 5173,
		open: true,
	},

	build: {
		outDir: '../dist',
		emptyOutDir: true,
		assetsDir: 'assets', // картинки/js/css будут тут

		rollupOptions: {
			input: {
				main: resolve(__dirname, 'src/index.html'),
				policy: resolve(__dirname, 'src/privacy.html'),
			},

			output: {
				assetFileNames: 'assets/[name]-[hash][extname]',
				chunkFileNames: 'assets/[name]-[hash].js',
				entryFileNames: 'assets/[name]-[hash].js',
			},
		},
	},

	plugins: [
		viteImagemin({
			mozjpeg: {
				quality: 70,
			},
			pngquant: {
				quality: [0.6, 0.8],
			},
			webp: {
				quality: 75,
			},
			svgo: {
				plugins: [
					{
						name: 'removeViewBox',
						active: false,
					},
				],
			},
		}),
	],
});
