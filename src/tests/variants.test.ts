import { describe, expect, test } from 'vitest'
import { getPaletteVariants, getVariantsFromSinglePalette } from '~/lib/get-palette-variants'
import { Palette } from '~/lib/types'

test('with min contrast bg', () => {
	const variants = getVariantsFromSinglePalette(
		{
			name: 'test',
			colors: ['#bb0044', '#3a282f', '#fff8f2'],
			variants: [{ bg: '#3a282f' }],
		},
		{ minContrastBg: 3 },
	)
	expect(variants.length).toEqual(1)
	expect(variants[0].colors.length).toEqual(1)
	expect(variants[0].colors[0]).toEqual('#fff8f2')
})

test('isolate colors', () => {
	const variants = getVariantsFromSinglePalette(
		{
			name: 'test',
			colors: ['#bb0044', '#3a282f', '#fff8f2'],
			variants: [{ bg: '#fff8f2' }],
		},
		{ isolateColors: true },
	)
	expect(variants.length).toEqual(1)
	const v = variants[0]
	expect(v.colors.length).toEqual(2)
})

describe('bg color options', () => {
	test('bgColor.type light + dark', () => {
		const testPal: Palette = {
			name: 'test',
			colors: ['#0000aa', '#eeaaee', '#ff00ff'],
			variants: [{ bg: '#111111' }, { bg: '#eeeeee' }],
		}
		const variants = getVariantsFromSinglePalette(testPal, { bgColor: { type: 'light' } })
		expect(variants.length).toEqual(1)

		const variantsDark = getVariantsFromSinglePalette(testPal, { bgColor: { type: 'dark' } })
		expect(variantsDark.length).toEqual(1)
		expect(variantsDark[0].bg).toEqual('#111111')
	})

	test('light with edge val', () => {
		const testPal2: Palette = {
			name: 'test',
			colors: ['#0000aa', '#eeaaee', '#ff00ff'],
			variants: [
				{ bg: '#111111' },
				{ bg: '#e7f9e8' }, // hsl(123, 60%, 94%)
				{ bg: '#f8b5de' }, // hsl(323, 83%, 84%)
			],
		}
		const variants = getVariantsFromSinglePalette(testPal2, { bgColor: { type: 'light', edge: 10 } })
		expect(variants.length).toEqual(1)
		const v = variants[0]
		expect(v.bg).toEqual('#e7f9e8')

		const variants2 = getVariantsFromSinglePalette(testPal2, { bgColor: { type: 'light', edge: 20 } })
		expect(variants2.length).toEqual(2)
	})

	test('bgColor.type = "edge"', () => {
		const testPal: Palette = {
			name: 'test',
			colors: ['#ffffff', '#aaaaaa', '#eeeeee', '#222222'],
			variants: [
				{ bg: '#21022c' }, // hsl(284, 91%, 9%)'
				{ bg: '#d4d4f7' }, // hsl(240, 67%, 90%)'
				{ bg: '#b5f395' }, // hsl(100, 80%, 77%)'
			],
		}
		const variants = getVariantsFromSinglePalette(testPal, { bgColor: { type: 'edge', edge: 12 } })
		expect(variants.length).toEqual(2)

		const variants2 = getVariantsFromSinglePalette(testPal, { bgColor: { type: 'edge', edge: 25 } })
		expect(variants2.length).toEqual(3)
	})

	test('bgColor.maxSaturation', () => {
		const testPal: Palette = {
			name: 'test',
			colors: ['#ffffff', '#aaaaaa', '#eeeeee', '#222222'],
			variants: [
				{ bg: '#21022C' }, // hsl(284, 91%, 9%)'
				{ bg: '#d4d4f7' }, // hsl(240, 67%, 90%)'
				{ bg: '#b5f395' }, // hsl(100, 80%, 77%)'
			],
		}
		const variants = getVariantsFromSinglePalette(testPal, { bgColor: { maxSaturation: 90 } })
		expect(variants.length).toEqual(2)

		const variants2 = getVariantsFromSinglePalette(testPal, {
			bgColor: { type: 'dark', maxSaturation: 90 },
		})
		expect(variants2.length).toEqual(0)

		const variants3 = getVariantsFromSinglePalette(testPal, {
			bgColor: { type: 'light', maxSaturation: 70 },
		})
		expect(variants3.length).toEqual(1)
		expect(variants3[0].bg).toEqual('#d4d4f7')
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

test('variant omits colors if defined', () => {
	const pal: Palette = {
		name: 'ambry',
		colors: ['#fcab30', '#ff626a', '#4c1e4f', '#496ddb', '#ffc4eb'],
		variants: [
			{ bg: '#fff7e5' },
			{ bg: '#4c1e4f', stroke: '#fff7e5' },
			{ bg: '#000000', omit: ['#4c1e4f'] },
		],
	}

	const variants = getVariantsFromSinglePalette(pal)
	expect(variants.length).toEqual(3)
	expect(variants.find((v) => v.bg === '#000000')?.colors).not.toContain('#4c1e4f')
})

test('variants adds colors if defined', () => {
	const pal: Palette = {
		name: 'glowFish',
		colors: ['#ffedeb', '#320d6d', '#ffd447', '#700353', '#fc814a'],
		variants: [{ bg: '#320d6d' }, { add: ['#65AFFF'], bg: '#ffedeb' }],
	}

	const variants = getVariantsFromSinglePalette(pal)
	const vWithAdded = variants.find((v) => v.bg === '#ffedeb')
	expect(vWithAdded).toBeDefined()
	expect(vWithAdded!.colors).toContain('#65AFFF')
})

test('lowercases hex colors', () => {
	const variants = getVariantsFromSinglePalette({
		name: 'test',
		colors: ['#FFEDEB', '#320D6D'],
		variants: [{ bg: '#320D6d' }],
	})
	expect(variants[0].colors[0]).toBe('#ffedeb')
})

describe('getPaletteVariants', () => {
	test('excludes palettes', () => {
		const variants = getPaletteVariants({
			excludePalettes: ['glowFish'],
		})

		const glowFishVariants = variants.find((v) => v.name.includes('glowFish'))
		expect(glowFishVariants).toBeUndefined()
	})

	test('limits to included palettes', () => {
		const variants = getPaletteVariants({
			includePalettes: ['glowFish'],
		})
		const notGlowFishVariant = variants.find((v) => !v.name.includes('glowFish'))
		expect(notGlowFishVariant).toBeUndefined()
	})
})
