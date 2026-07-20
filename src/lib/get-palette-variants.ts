import { getContrast, hexToHsl } from './color-utils'
import { palettesList } from './get-palettes-array'
import { PaletteName } from './palette-defs'
import type { Palette, PaletteVariant } from './types'

interface BgColorOptions {
	/**
	 * only include variants with a background color that is dark, light, or on either edge of the spectrum
	 */
	type?: 'dark' | 'light' | 'edge'
	/**
	 * Will keep lightness value nearer to 0 or 100 (or both) by this amount
	 *
	 * For example, a value of 10 with a type = 'dark' means the variant will
	 * be included if the background color has a lightness value of 10 or less.
	 * With a type of 'edge', the variant will be included if the
	 * background color has a lightness value of 10 or less, or 90 or more.
	 *
	 * Accepts values between 0 and 100
	 *
	 * @default 50
	 */
	edge?: number
	/**
	 * max HSL saturation of background color
	 */
	maxSaturation?: number
}

interface SinglePaletteVariantOpts {
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
	 * @default false
	 */
	useStroke?: boolean
	/**
	 * Require a stroke color for the variant to be included
	 * @default false
	 */
	requireStroke?: boolean
	minColors?: number
	maxColors?: number
	bgColor?: string | BgColorOptions
	/**
	 * @deprecated use bgColor option instead
	 */
	bgShade?: BgColorOptions
}
export function getVariantsFromSinglePalette(
	palette: Palette,
	{
		minContrastBg,
		isolateColors = false,
		useStroke = false,
		requireStroke = false,
		minColors = 1,
		maxColors = Infinity,
		bgShade,
		bgColor,
	}: SinglePaletteVariantOpts = {},
): PaletteVariant[] {
	let name = palette.name
	let variants = palette.variants

	let count = 0
	let result: PaletteVariant[] = []

	let bgOpts: BgColorOptions | undefined
	if (typeof bgColor === 'object') {
		bgOpts = bgColor
	} else if (bgColor === undefined && typeof bgShade === 'object') {
		bgOpts = bgShade
	}

	variants.forEach((variant) => {
		if (requireStroke && !variant.stroke) return
		let { omit, add } = variant
		let bg = typeof bgColor === 'string' ? bgColor : variant.bg
		bg = bg.toLowerCase()

		if (bgOpts) {
			let { type, edge = 50, maxSaturation } = bgOpts
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

		let stroke = useStroke ? variant.stroke : undefined

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

interface BuildVariantOpts {
	isolateColors?: boolean
	useStroke?: boolean
}
export function buildVariant(
	palette: Palette,
	index: number,
	{ useStroke, isolateColors }: BuildVariantOpts = {},
): PaletteVariant {
	const v = palette.variants[index]
	const { bg, omit, add } = v
	const stroke = useStroke ? v.stroke : undefined
	let colors = [...palette.colors].map((c) => c.toLowerCase())
	if (isolateColors) colors = colors.filter((c) => c !== bg && c !== stroke)
	if (omit) colors = colors.filter((c) => !omit.includes(c))
	if (add) colors.push(...add)
	return {
		bg,
		stroke,
		colors,
		name: `${palette.name}-${index}`,
	}
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
	let palettes = [...palettesList]
	if (includePalettes) palettes = palettes.filter((p) => includePalettes.includes(p.name as PaletteName))
	if (excludePalettes) palettes = palettes.filter((p) => !excludePalettes.includes(p.name as PaletteName))
	return palettes.flatMap((p) => getVariantsFromSinglePalette(p, options))
}
