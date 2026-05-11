/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	// root: 'src/example',
	resolve: {
		alias: {
			'~': `${resolve(__dirname, 'src')}/`,
		},
	},
	build: {
		outDir: resolve(__dirname, 'dist'),
		lib: {
			entry: resolve(__dirname, 'src/index.ts'),
			name: 'bainrow',
			fileName: 'bainrow',
		},
	},
	test: {
		coverage: {
			enabled: true,
			provider: 'v8',
		},
	},
	// test: {
	// 	include: ['../src/**/*.{test,spec}.{ts}'],
	// },
})
