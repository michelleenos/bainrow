import { getBrightness, getContrast } from './color-utils'
import { getPalettesArray } from './get-palettes-array'
import { PaletteName } from './palette-defs'
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
	{
		minContrastBg,
		isolateColors = false,
		useStroke = true,
		minColors = 1,
		bgShade,
	}: GetPaletteContextsOptions = {}
): PaletteWithContext[] {
	let name = palette.name
	let contexts = palette.contexts

	let count = 0
	// let colorsSet = new Set()
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

		// if (colorsSet.has(`${bg}-${stroke}`)) return
		// colorsSet.add(`${bg}-${stroke}`)
		let colors = [...palette.colors]
		colors = isolateColors ? colors.filter((c) => c !== bg && c !== stroke) : colors
		if (omit) colors = colors.filter((c) => !omit.includes(c))
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

export type GetAllPaletteContextsOptions = GetPaletteContextsOptions & {
	excludePalettes?: PaletteName[]
	includePalettes?: PaletteName[]
}
export function getAllPaletteContexts({
	excludePalettes,
	includePalettes,
	...options
}: GetAllPaletteContextsOptions = {}): PaletteWithContext[] {
	let palettes = getPalettesArray()
	if (includePalettes) palettes = palettes.filter((p) => includePalettes.includes(p.name as PaletteName))
	if (excludePalettes) palettes = palettes.filter((p) => !excludePalettes.includes(p.name as PaletteName))
	return palettes.flatMap((p) => getPaletteContexts(p, options))
}
