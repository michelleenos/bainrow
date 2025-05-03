import type { Palette } from './types'
import { palettes } from './palette-defs'

let palettesArray: Palette[] | null = null
export const getPalettesArray: () => Palette[] = () => {
	if (palettesArray) return palettesArray
	let keys = Object.keys(palettes) as (keyof typeof palettes)[]
	palettesArray = keys.map((key) => palettes[key])
	return palettesArray
}
