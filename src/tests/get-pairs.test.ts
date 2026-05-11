import { describe, expect, test } from 'vitest'
import { getContrast } from '../lib/color-utils'
import { getAllPairs, getPairsFromPalette } from '../lib/get-pairs'
import { palettes } from '~/lib/palette-defs'

// High contrast pair: white (#ffffff) vs black (#000000) ~21:1
// Low contrast pair: similar grays
const white = '#ffffff'
const black = '#000000'
const lightGray = '#cccccc'
const darkGray = '#333333'

describe('getPairsFromPalette', () => {
	test('returns pairs that meet the contrast minimum', () => {
		const pairs = getPairsFromPalette([white, black, lightGray])
		const hexPairs = pairs.map((p) => p.join('-'))
		expect(hexPairs).toContain(`${white}-${black}`)
	})

	test('excludes pairs below the contrast minimum', () => {
		// white vs lightGray has low contrast (~1.6:1)
		const pairs = getPairsFromPalette([white, lightGray], 4)
		expect(pairs).toHaveLength(0)
	})

	test('no color is paired with itself', () => {
		const pairs = getPairsFromPalette(palettes.brain.colors, 1)
		pairs.forEach(([a, b]) => expect(a).not.toBe(b))
	})

	test('uses default contrast minimum of 4', () => {
		// darkGray vs black: low contrast — should not appear with default min
		const withDefault = getPairsFromPalette([darkGray, black])
		const withExplicit = getPairsFromPalette([darkGray, black], 4)
		expect(withDefault).toEqual(withExplicit)
	})

	test('returns empty array for a single color', () => {
		expect(getPairsFromPalette([white])).toEqual([])
	})

	test('returns empty array for empty input', () => {
		expect(getPairsFromPalette([])).toEqual([])
	})

	test('respects a custom contrast minimum', () => {
		// white vs lightGray is ~1.6:1, should pass at min=1 but not min=4
		const loose = getPairsFromPalette([white, lightGray], 1)
		const strict = getPairsFromPalette([white, lightGray], 4)
		expect(loose.length).toBeGreaterThan(0)
		expect(strict).toHaveLength(0)
	})
})

describe('getAllPairs', () => {
	test('returns an array of pairs', () => {
		const pairs = getAllPairs()
		expect(Array.isArray(pairs)).toBe(true)
		pairs.forEach((pair) => {
			expect(pair).toHaveLength(2)
			expect(typeof pair[0]).toBe('string')
			expect(typeof pair[1]).toBe('string')
		})
	})

	test('no duplicate pairs (regardless of order)', () => {
		const pairs = getAllPairs()
		const seen = new Set<string>()
		pairs.forEach(([a, b]) => {
			const key = [a.toLowerCase(), b.toLowerCase()].sort().join('-')
			expect(seen.has(key)).toBe(false)
			seen.add(key)
		})
	})

	test('all returned pairs meet the contrast minimum', () => {
		const min = 8
		const pairs = getAllPairs(min)
		pairs.forEach(([a, b]) => {
			expect(getContrast(a, b)).toBeGreaterThanOrEqual(min)
		})
	})

	test('uses default contrast minimum of 4', () => {
		expect(getAllPairs()).toEqual(getAllPairs(4))
	})
})
