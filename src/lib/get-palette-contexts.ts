import { getContrast, getLuminance } from './color-utils'
import { getPalettesArray } from './get-palettes-array'
import { PaletteName } from './palette-defs'
import type { Palette, PaletteWithContext } from './types'

export type SinglePaletteContextOptions = {
	/**
	 * minimum contrast ratio against background color
	 */
	minContrastBg?: number
	/**
	 * only use colors that are not background or stroke
	 */
	isolateColors?: boolean
	useStroke?: boolean
	minColors?: number
	bgShade?: {
		/**
		 * background shade based on luminance
		 */
		type: 'dark' | 'light'
		/**
		 * limit luminance value 0 to 1 (default 0.5)
		 */
		limit?: number
	}
}
export function getSinglePaletteContexts(
	palette: Palette,
	{
		minContrastBg,
		isolateColors = false,
		useStroke = true,
		minColors = 1,
		bgShade,
	}: SinglePaletteContextOptions = {},
): PaletteWithContext[] {
	let name = palette.name
	let contexts = palette.contexts

	let count = 0
	let result: PaletteWithContext[] = []

	contexts.forEach((context) => {
		let { bg, omit, add } = context
		bg = bg.toLowerCase()
		if (bgShade) {
			let { type, limit } = bgShade
			let bgLuminance = getLuminance(bg)
			if (type === 'dark') {
				if (bgLuminance > (typeof limit === 'number' ? limit : 0.5)) return
			} else {
				if (bgLuminance < (typeof limit === 'number' ? limit : 0.5)) return
			}
		}

		let stroke = useStroke ? context.stroke : undefined

		// if (colorsSet.has(`${bg}-${stroke}`)) return
		// colorsSet.add(`${bg}-${stroke}`)
		let colors = [...palette.colors].map((c) => c.toLowerCase())
		colors = isolateColors ? colors.filter((c) => c !== bg && c !== stroke) : colors
		if (omit) colors = colors.filter((c) => !omit.includes(c.toLowerCase()))
		if (add) colors.push(...add)

		if (minContrastBg) {
			colors = colors.filter((c) => {
				let contrast = getContrast(bg, c)
				return contrast >= minContrastBg
			})
		}

		if (colors.length < minColors) return
		result.push({
			bg,
			stroke,
			colors,
			name: `${name}-${count++}`,
		})
	})

	return result
}

export type GetPaletteContextOptions = SinglePaletteContextOptions & {
	excludePalettes?: PaletteName[]
	includePalettes?: PaletteName[]
}
export function getPaletteContexts({
	excludePalettes,
	includePalettes,
	...options
}: GetPaletteContextOptions = {}): PaletteWithContext[] {
	let palettes = getPalettesArray()
	if (includePalettes) palettes = palettes.filter((p) => includePalettes.includes(p.name as PaletteName))
	if (excludePalettes) palettes = palettes.filter((p) => !excludePalettes.includes(p.name as PaletteName))
	return palettes.flatMap((p) => getSinglePaletteContexts(p, options))
}
