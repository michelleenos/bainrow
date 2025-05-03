import type { Palette } from '~/lib/types'

// export const isPaletteContext = (obj: unknown): obj is PaletteContext => {
// 	if (typeof obj !== 'object' || obj === null) return false
// 	const { bg, stroke } = obj as PaletteContext
// 	if (bg && typeof bg !== 'string') return false
// 	if (stroke && typeof stroke !== 'string') return false
// 	return true
// }

export const isPalette = (obj: unknown): obj is Palette => {
	if (typeof obj !== 'object' || obj === null) return false
	const { colors, tags, shades, contexts } = obj as Palette
	if (!Array.isArray(colors) || !colors.every((c) => typeof c === 'string')) return false
	if (tags && !Array.isArray(tags)) return false
	if (shades && !Array.isArray(shades)) return false
	if (contexts && !Array.isArray(contexts)) return false
	return true
}
