import type { PaletteWithBg } from './types'
import { getPalettesArray } from './get-palettes-array'

export function getPalettesWithBg(isolateColors: boolean = true, minColors?: number): PaletteWithBg[] {
	let palArr = getPalettesArray()
	let pals: { bg: string; colors: string[]; name: string }[] = []
	palArr.forEach((pal) => {
		let name = pal.name
		// if (minColors && pal.colors.length < minColors) return
		let contexts = pal.contexts
		let bgSet = new Set()
		let count = 0
		contexts.forEach((context) => {
			let bg = context.bg
			if (bgSet.has(bg)) return
			bgSet.add(bg)
			let colors = isolateColors ? pal.colors.filter((c) => c !== bg) : pal.colors
			if (minColors && colors.length < minColors) return

			pals.push({
				name: `${name}-${count++}`,
				colors,
				bg,
			})
		})
	})

	return pals
}
