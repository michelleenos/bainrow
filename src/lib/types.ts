// prettier-ignore
export type RoyGBiv = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet' | 'teal' | 'pink' | 'purple' | 'gray' | 'brown'

export type PaletteContext = {
	bg: string
	stroke?: string
	omit?: string[]
	add?: string[]
}

export type Palette = {
	colors: string[]
	name: string
	tags?: string[]
	shades?: RoyGBiv[]
	contexts: PaletteContext[]
}

export type PaletteWithBg = {
	bg: string
	colors: string[]
	name: string
}
