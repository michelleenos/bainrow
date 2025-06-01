import { getBrightness, getContrast } from './color-utils'
import { getPalettesArray } from './get-palettes-array'
import type { Palette, PaletteWithContext } from './types'

export type GetPaletteContextsOptions = {
	minContrastBg?: number
	isolateColors?: boolean
	useStroke?: boolean
	minColors?: number
	bgShade?: { type: 'dark' | 'light'; limit?: number }
}
export function getPaletteContexts(
	palette: Palette,
	{ minContrastBg, isolateColors = false, useStroke = true, minColors, bgShade }: GetPaletteContextsOptions = {}
): PaletteWithContext[] {
	let name = palette.name
	let contexts = palette.contexts

	let count = 0
	let colorsSet = new Set()
	let result: PaletteWithContext[] = []

	contexts.forEach((context) => {
		let { bg, omit, add } = context
		if (bgShade) {
			let { type, limit } = bgShade
			let bgBrightness = getBrightness(bg)
			if (type === 'dark') {
				if (bgBrightness > (limit || 128)) return
			} else {
				if (bgBrightness < (limit || 128)) return
			}
		}

		let stroke = useStroke ? context.stroke : undefined

		if (colorsSet.has(`${bg}-${stroke}`)) return
		colorsSet.add(`${bg}-${stroke}`)
		let colors = isolateColors ? palette.colors.filter((c) => c !== bg && c !== stroke) : palette.colors
		if (omit) colors = colors.filter((c) => !omit.includes(c))
		if (add) colors.push(...add)

		if (minContrastBg) {
			colors = colors.filter((c) => {
				let contrast = getContrast(bg, c)
				return contrast >= minContrastBg
			})
		}

		if (minColors && colors.length < minColors) return
		result.push({
			bg,
			stroke,
			colors,
			name: `${name}-${count++}`,
		})
	})

	return result
}

export function getAllPaletteContexts(options: GetPaletteContextsOptions = {}): PaletteWithContext[] {
	return getPalettesArray().flatMap((p) => getPaletteContexts(p, options))
}
