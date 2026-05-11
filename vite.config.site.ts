import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
	base: '/bainrow/',
	resolve: {
		alias: { '~': `${resolve(__dirname, 'src')}` },
	},
	build: {
		outDir: 'site-dist',
	},
})
