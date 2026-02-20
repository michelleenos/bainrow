import { getContrast } from './color-utils'
import { palettes } from './palette-defs'

export const getAllPairs = (contrastMin: number = 4) => {
	let pairsSet = new Set<string>()
	let pairs: [string, string][] = []
	let keys = Object.keys(palettes) as (keyof typeof palettes)[]

	keys.forEach((key) => {
		let palette = palettes[key]
		let colors = palette.colors
		let pairsToAdd = getPairsFromPalette(colors, contrastMin)

		pairsToAdd.forEach((pair) => {
			if (
				pairsSet.has(`${pair[0]}-${pair[1]}`.toLowerCase()) ||
				pairsSet.has(`${pair[1]}-${pair[0]}`.toLowerCase())
			)
				return
			pairsSet.add(`${pair[0]}-${pair[1]}`.toLowerCase())
			pairs.push(pair)
		})
	})

	return pairs
}

export const getPairsFromPalette = (colors: string[], contrastMin: number = 4) => {
	let pairs: [string, string][] = []

	colors.forEach((color1, i) => {
		colors.slice(i + 1).forEach((color2) => {
			let contrast = getContrast(color1, color2)
			if (contrast < contrastMin) return

			pairs.push([color1, color2])
		})
	})

	return pairs
}
