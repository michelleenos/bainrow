import type { Palette, PaletteWithBg } from './types'
import { getPalettesArray } from './get-palettes-array'
import { PaletteName, palettes } from './palette-defs'

export function getPaletteWithBg(palette: Palette | PaletteName, isolateColors: boolean = true): PaletteWithBg[] {
	let pal = typeof palette === 'string' ? palettes[palette] : palette
	let name = pal.name
	let contexts = pal.contexts

	let result: PaletteWithBg[] = []

	let bgSet = new Set()
	let count = 0
	contexts.forEach((context) => {
		let bg = context.bg
		if (bgSet.has(bg)) return
		bgSet.add(bg)

		let omit = context.omit
		let add = context.add

		let colors = isolateColors ? pal.colors.filter((c) => c !== bg) : pal.colors
		if (omit) colors = colors.filter((c) => !omit.includes(c))
		if (add) colors.push(...add)
		result.push({
			name: `${name}-${count++}`,
			colors,
			bg,
		})
	})

	return result
}

export type GetPalettesWithBgOptions = {
	isolateColors?: boolean
	minColors?: number
	exclude?: PaletteName[]
	include?: PaletteName[]
}

export function getPalettesWithBg({ isolateColors = true, minColors, exclude, include }: GetPalettesWithBgOptions = {}): PaletteWithBg[] {
	let palArr = getPalettesArray()
	let pals: { bg: string; colors: string[]; name: string }[] = []

	if (include) {
		palArr = palArr.filter((p) => include.includes(p.name as PaletteName))
	} else if (exclude) {
		palArr = palArr.filter((p) => !exclude.includes(p.name as PaletteName))
	}

	palArr.forEach((pal) => {
		let results = getPaletteWithBg(pal, isolateColors)
		if (minColors) results = results.filter((r) => r.colors.length >= minColors)
		pals.push(...results)
	})

	return pals
}
