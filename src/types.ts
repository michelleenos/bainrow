// prettier-ignore
export type RoyGBiv = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet' | 'teal' | 'pink' | 'purple' | 'gray' | 'brown'

export type PaletteContext = {
	bg?: string
	stroke?: string
}

export const isPaletteContext = (obj: unknown): obj is PaletteContext => {
	if (typeof obj !== 'object' || obj === null) return false
	const { bg, stroke } = obj as PaletteContext
	if (bg && typeof bg !== 'string') return false
	if (stroke && typeof stroke !== 'string') return false
	return true
}

export type Palette = {
	colors: string[]
	tags?: string[]
	shades?: RoyGBiv[]
	contexts?: PaletteContext[]
}

export const isPalette = (obj: unknown): obj is Palette => {
	if (typeof obj !== 'object' || obj === null) return false
	const { colors, tags, shades, contexts } = obj as Palette
	if (!Array.isArray(colors) || !colors.every((c) => typeof c === 'string')) return false
	if (tags && !Array.isArray(tags)) return false
	if (shades && !Array.isArray(shades)) return false
	if (contexts && !Array.isArray(contexts)) return false
	return true
}

export type PaletteWithVariants = {
	name: string
	tags?: string[]
	shades?: RoyGBiv[]
	variants: Palette[]
}

export type Concat<T extends string[]> = T extends [infer F, ...infer R]
	? F extends string
		? R extends string[]
			? `${F}${Concat<R>}`
			: never
		: never
	: ''

export function concat<T extends string[]>(...strings: T): Concat<T> {
	return strings.join('') as Concat<T>
}
