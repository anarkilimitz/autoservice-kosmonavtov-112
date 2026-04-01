import { defineConfig } from 'vite';
import viteImagemin from 'vite-plugin-imagemin';

export default defineConfig({
	root: 'src',

	server: {
		port: 5173,
		open: true, // автоматически открывает браузер
	},

	build: {
		outDir: '../dist',
		emptyOutDir: true,

		assetsDir: 'assets', // картинки/js/css будут тут

		rollupOptions: {
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
