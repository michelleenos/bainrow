import { describe, expect, test } from 'vitest'
import { getContrast, hexToHsl } from '../lib/color-utils'
import { filterPalette, getFilteredPalettes } from '../lib/get-filtered-palettes'
import type { Palette } from '../lib/types'

const makePalette = (colors: string[], name = 'test'): Palette => ({
	name,
	colors,
	variants: [],
})

// Known colors with predictable lightness/contrast values
const WHITE = '#ffffff' // l=100
const BLACK = '#000000' // l=0
const MID_GRAY = '#808080' // l~50
const LIGHT_YELLOW = '#ffff99' // l~90
const RED = '#ea0000' // hsl(0, 100%, 46%) l~46

describe('filterPalette', () => {
	describe('minLightness', () => {
		test('keeps colors at or above minLightness', () => {
			const palette = makePalette([WHITE, BLACK, MID_GRAY, RED])
			const result = filterPalette(palette, { minLightness: 40 })
			expect(result.length).toBe(3)
			result.forEach((c) => expect(hexToHsl(c).l).toBeGreaterThanOrEqual(40))
		})

		test('removes colors below minLightness', () => {
			const palette = makePalette([WHITE, BLACK])
			const result = filterPalette(palette, { minLightness: 50 })
			expect(result).not.toContain(BLACK)
		})

		test('keeps all colors when none fall below minLightness', () => {
			const palette = makePalette([WHITE, LIGHT_YELLOW])
			const result = filterPalette(palette, { minLightness: 80 })
			expect(result).toHaveLength(2)
		})
	})

	describe('maxLightness', () => {
		test('keeps colors at or below maxLightness', () => {
			const palette = makePalette([WHITE, BLACK, MID_GRAY, RED])
			const result = filterPalette(palette, { maxLightness: 60 })
			result.forEach((c) => expect(hexToHsl(c).l).toBeLessThanOrEqual(60))
		})

		test('removes colors above maxLightness', () => {
			const palette = makePalette([WHITE, BLACK, LIGHT_YELLOW])
			const result = filterPalette(palette, { maxLightness: 50 })
			expect(result).not.toContain(WHITE)
			expect(result).not.toContain(LIGHT_YELLOW)
		})
	})

	describe('minLightness + maxLightness', () => {
		test('keeps only colors within the lightness range', () => {
			const palette = makePalette([WHITE, BLACK, MID_GRAY, RED])
			const result = filterPalette(palette, { minLightness: 40, maxLightness: 60 })
			result.forEach((c) => {
				const l = hexToHsl(c).l
				expect(l).toBeGreaterThanOrEqual(40)
				expect(l).toBeLessThanOrEqual(60)
			})
			expect(result).toContain(RED)
			expect(result).not.toContain(WHITE)
			expect(result).not.toContain(BLACK)
		})
	})

	describe('minContrast', () => {
		test('defaults compare color to white when minContrastCompare is omitted', () => {
			// BLACK has ~21:1 contrast against white; WHITE has 1:1
			const palette = makePalette([WHITE, BLACK])
			const result = filterPalette(palette, { minContrast: 10 })
			expect(result).toContain(BLACK)
			expect(result).not.toContain(WHITE)
		})

		test('uses minContrastCompare as the reference color', () => {
			// WHITE has ~21:1 contrast against BLACK
			const palette = makePalette([WHITE, MID_GRAY])
			const result = filterPalette(palette, { minContrast: 10, minContrastCompare: BLACK })
			expect(result).toContain(WHITE)
		})

		test('removes colors below minContrast threshold', () => {
			// MID_GRAY vs WHITE is low contrast (~3.9:1)
			const palette = makePalette([MID_GRAY, BLACK])
			const result = filterPalette(palette, { minContrast: 7 })
			expect(result).not.toContain(MID_GRAY)
			expect(result).toContain(BLACK)
		})

		test('all returned colors meet the contrast threshold', () => {
			const palette = makePalette([WHITE, MID_GRAY, BLACK])
			const minContrast = 5
			const compare = WHITE
			const result = filterPalette(palette, { minContrast, minContrastCompare: compare })
			result.forEach((c) => {
				expect(getContrast(c, compare)).toBeGreaterThanOrEqual(minContrast)
			})
		})
	})

	test('returns all colors when no opts are provided', () => {
		const colors = [WHITE, BLACK, MID_GRAY]
		const palette = makePalette(colors)
		expect(filterPalette(palette, {})).toEqual(colors)
	})

	test('returns empty array when all colors are filtered out', () => {
		const palette = makePalette([WHITE, LIGHT_YELLOW])
		const result = filterPalette(palette, { maxLightness: 10 })
		expect(result).toHaveLength(0)
	})
})

describe('getFilteredPalettes', () => {
	test('returns an array of { name, colors } objects', () => {
		const result = getFilteredPalettes({})
		expect(Array.isArray(result)).toBe(true)
		result.forEach((item) => {
			expect(typeof item.name).toBe('string')
			expect(Array.isArray(item.colors)).toBe(true)
		})
	})

	test('minColors excludes palettes with fewer colors after filtering', () => {
		const result = getFilteredPalettes({ minColors: 3 })
		result.forEach(({ colors }) => expect(colors.length).toBeGreaterThanOrEqual(3))
	})

	test('maxColors excludes palettes with more colors after filtering', () => {
		const result = getFilteredPalettes({ maxColors: 4 })
		result.forEach(({ colors }) => expect(colors.length).toBeLessThanOrEqual(4))
	})

	test('minColors and maxColors work together', () => {
		const result = getFilteredPalettes({ minColors: 2, maxColors: 4 })
		result.forEach(({ colors }) => {
			expect(colors.length).toBeGreaterThanOrEqual(2)
			expect(colors.length).toBeLessThanOrEqual(4)
		})
	})

	test('minColors excludes palettes after filtering with other params', () => {
		const unfiltered = getFilteredPalettes({ minColors: 1 })
		const filtered = getFilteredPalettes({ minColors: 1, maxLightness: 30 })

		// Fewer or equal palettes after strict lightness filter
		expect(filtered.length).toBeLessThanOrEqual(unfiltered.length)
	})

	test('returns fewer results with stricter contrast filter', () => {
		const loose = getFilteredPalettes({ minContrast: 2, minColors: 1 })
		const strict = getFilteredPalettes({ minContrast: 10, minColors: 1 })
		expect(strict.length).toBeLessThanOrEqual(loose.length)
	})

	test('returns all palettes (possibly with all colors) when no opts given', () => {
		const result = getFilteredPalettes({})
		expect(result.length).toBeGreaterThan(0)
	})

	test('minColors defaults to 1', () => {
		const result = getFilteredPalettes({ minLightness: 50, maxLightness: 55 })
		result.forEach(({ colors }) => expect(colors.length).toBeGreaterThanOrEqual(1))
	})
})
