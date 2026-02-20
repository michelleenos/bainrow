import { getContrast, hexToHsl } from './color-utils'
import { getPalettesArray } from './get-palettes-array'
import { PaletteName } from './palette-defs'
import type { Palette, PaletteVariant } from './types'

type SinglePaletteVariantOpts = {
	/**
	 * minimum contrast ratio against background color
	 */
	minContrastBg?: number
	/**
	 * if true, don't repeat the background or stroke colors in the colors list
	 */
	isolateColors?: boolean
	/**
	 * Whether to include a stroke color
	 * @default true
	 */
	useStroke?: boolean
	minColors?: number
	maxColors?: number
	bgShade?: {
		/**
		 * background shade
		 */
		type?: 'dark' | 'light' | 'edge'
		/**
		 * will keep lightness value on the dark/light edge by this amount.
		 * accepts values between 0 and 100
		 * @default 50
		 */
		edge?: number
		/**
		 * max hsl saturation
		 */
		maxSaturation?: number
	}
}
export function getVariantsFromSinglePalette(
	palette: Palette,
	{
		minContrastBg,
		isolateColors = false,
		useStroke = true,
		minColors = 1,
		maxColors = Infinity,
		bgShade,
	}: SinglePaletteVariantOpts = {},
): PaletteVariant[] {
	let name = palette.name
	let contexts = palette.variants

	let count = 0
	let result: PaletteVariant[] = []

	contexts.forEach((context) => {
		let { bg, omit, add } = context
		bg = bg.toLowerCase()
		if (bgShade) {
			let { type, edge = 50, maxSaturation } = bgShade
			let hsl = hexToHsl(bg)
			let lightness = hsl.l
			if (type === 'dark') {
				if (lightness > edge) return
			} else if (type === 'light') {
				if (lightness < 100 - edge) return
			} else if (type === 'edge') {
				if (lightness < 50 && lightness > edge) return
				if (lightness >= 50 && 100 - lightness > edge) return
			}

			if (typeof maxSaturation === 'number') {
				if (hsl.s > maxSaturation) return
			}
		}

		let stroke = useStroke ? context.stroke : undefined

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

		if (colors.length < minColors || colors.length > maxColors) return
		result.push({
			bg,
			stroke,
			colors,
			name: `${name}-${count++}`,
		})
	})

	return result
}

export type GetPaletteVariantOpts = SinglePaletteVariantOpts & {
	excludePalettes?: PaletteName[]
	includePalettes?: PaletteName[]
}
export function getPaletteVariants({
	excludePalettes,
	includePalettes,
	...options
}: GetPaletteVariantOpts = {}): PaletteVariant[] {
	let palettes = getPalettesArray()
	if (includePalettes) palettes = palettes.filter((p) => includePalettes.includes(p.name as PaletteName))
	if (excludePalettes) palettes = palettes.filter((p) => !excludePalettes.includes(p.name as PaletteName))
	return palettes.flatMap((p) => getVariantsFromSinglePalette(p, options))
}
