import { getContrast, hexToHsl } from './color-utils'
import { palettesList } from './get-palettes-array'
import { Palette } from './types'

interface FilteredPaletteOpts {
	minLightness?: number
	maxLightness?: number
	minContrast?: number
	minContrastCompare?: string
}

export function getFilteredPalettes({
	minColors,
	maxColors,
	...opts
}: FilteredPaletteOpts & { minColors?: number; maxColors?: number }) {
	let result: { name: string; colors: string[] }[] = []

	palettesList.forEach((palette) => {
		let colors = filterPalette(palette, opts)
		if (maxColors !== undefined && colors.length > maxColors) return
		if (minColors !== undefined && colors.length < minColors) return

		result.push({ name: palette.name, colors })
	})

	return result
}

export function filterPalette(
	palette: Palette,
	{ minLightness, maxLightness, minContrast, minContrastCompare }: FilteredPaletteOpts,
) {
	const colors = palette.colors.filter((c) => {
		if (minLightness !== undefined || maxLightness !== undefined) {
			let hsl = hexToHsl(c)
			let lightness = hsl.l
			if (minLightness !== undefined && lightness < minLightness) return false
			if (maxLightness !== undefined && lightness > maxLightness) return false
		}

		if (minContrast !== undefined) {
			let compare = minContrastCompare || '#ffffff'
			let contrast = getContrast(c, compare)
			if (contrast < minContrast) return false
		}

		return true
	})

	return colors
}
