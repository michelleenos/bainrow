import { describe, expect, test } from 'vitest'
import { getVariantsFromSinglePalette } from '~/lib/get-palette-variants'
import { Palette } from '~/lib/types'

test('with min contrast bg', () => {
	const testPalette: Palette = {
		name: 'test',
		colors: ['#bb0044', '#3a282f', '#fff8f2'],
		variants: [{ bg: '#3a282f' }],
	}
	const variants = getVariantsFromSinglePalette(testPalette, { minContrastBg: 3 })
	expect(variants.length).toEqual(1)
	expect(variants[0].colors.length).toEqual(1)
	expect(variants[0].colors[0]).toEqual('#fff8f2')
})

test('isolate colors', () => {
	const testPalette: Palette = {
		name: 'test',
		colors: ['#b04', '#3a282f', '#fff8f2'],
		variants: [{ bg: '#fff8f2' }],
	}

	const variants = getVariantsFromSinglePalette(testPalette, { isolateColors: true })
	expect(variants.length).toEqual(1)
	const v = variants[0]
	expect(v.colors.length).toEqual(2)
})

describe('bg shade', () => {
	test('light', () => {
		const testPal: Palette = {
			name: 'test',
			colors: ['#00a', '#eae', '#f0f'],
			variants: [{ bg: '#111' }, { bg: '#eee' }],
		}
		const variants = getVariantsFromSinglePalette(testPal, { bgShade: { type: 'light' } })
		expect(variants.length).toEqual(1)
	})

	test('dark', () => {
		const testPal: Palette = {
			name: 'test',
			colors: ['#00a', '#eae', '#f0f'],
			variants: [{ bg: '#111' }, { bg: '#eee' }],
		}
		const variants = getVariantsFromSinglePalette(testPal, { bgShade: { type: 'dark' } })
		expect(variants.length).toEqual(1)
	})

	test('light with edge', () => {
		const testPal2: Palette = {
			name: 'test',
			colors: ['#00a', '#eae', '#f0f'],
			variants: [{ bg: '#111' }, { bg: '#eee' }, { bg: '#f8b5de' }], // #f8b5de hsl.l = 84
		}
		const variants = getVariantsFromSinglePalette(testPal2, { bgShade: { type: 'light', edge: 10 } })
		expect(variants.length).toEqual(1)
		const v = variants[0]
		expect(v.bg).toEqual('#eee')

		const variants2 = getVariantsFromSinglePalette(testPal2, { bgShade: { type: 'light', edge: 20 } })
		expect(variants2.length).toEqual(2)
	})

	test('edge', () => {
		const testPal: Palette = {
			name: 'test',
			colors: ['#fff', '#aaa', '#eee', '#222'],
			variants: [
				{ bg: '#21022c' }, // hsl(284, 91%, 9%)'
				{ bg: '#d4d4f7' }, // hsl(240, 67%, 90%)'s
				{ bg: '#b5f395' }, // hsl(100, 80%, 77%)'
			],
		}
		const variants = getVariantsFromSinglePalette(testPal, { bgShade: { type: 'edge', edge: 12 } })
		expect(variants.length).toEqual(2)

		const variants2 = getVariantsFromSinglePalette(testPal, { bgShade: { type: 'edge', edge: 25 } })
		expect(variants2.length).toEqual(3)
	})

	test('saturation', () => {
		const testPal: Palette = {
			name: 'test',
			colors: ['#fff', '#aaa', '#eee', '#222'],
			variants: [
				{ bg: '#21022c' }, // hsl(284, 91%, 9%)'
				{ bg: '#d4d4f7' }, // hsl(240, 67%, 90%)'
				{ bg: '#b5f395' }, // hsl(100, 80%, 77%)'
			],
		}
		const variants = getVariantsFromSinglePalette(testPal, { bgShade: { maxSaturation: 90 } })
		expect(variants.length).toEqual(2)

		const variants2 = getVariantsFromSinglePalette(testPal, {
			bgShade: { type: 'dark', maxSaturation: 90 },
		})
		expect(variants2.length).toEqual(0)

		const variants3 = getVariantsFromSinglePalette(testPal, {
			bgShade: { type: 'light', maxSaturation: 70 },
		})
		expect(variants3.length).toEqual(1)
	})
})

test('min colors', () => {
	const testPal: Palette = {
		name: 'test',
		colors: ['#121212', '#ff9999', '#fe0d0d', '#1dc85c', '#d8cc21', '#e925f3'],
		variants: [{ bg: '#aaaaaa' }],
	}
	const variants = getVariantsFromSinglePalette(testPal, { minContrastBg: 3, minColors: 3 })
	expect(variants.length).toBe(0)
})
