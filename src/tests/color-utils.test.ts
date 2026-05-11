import { describe, expect, test } from 'vitest'
import { getContrast, hexToHsl, hexToRgb, rgbToHsl } from '../lib/color-utils'

const green = {
	hex: '#38DB0A',
	rgb: { r: 56, g: 219, b: 10 },
	hsl: { h: 107, s: 91, l: 45 },
	hsv: { h: 107, s: 95, v: 86 },
}
const magenta = {
	hex: '#ee00dd',
	hsl: { h: 304, s: 100, l: 47 },
	hsv: { h: 304, s: 100, v: 93 },
	rgb: { r: 238, g: 0, b: 221 },
}
const darkpurple = {
	hex: '#2D0466',
	rgb: { r: 45, g: 4, b: 102 },
	hsl: { h: 265, s: 92, l: 21 },
	hsv: { h: 265, s: 96, v: 40 },
}
const red = {
	hex: '#ff0000',
	rgb: { r: 255, g: 0, b: 0 },
	hsl: { h: 0, s: 100, l: 50 },
	hsv: { h: 0, s: 100, v: 100 },
}
const light = {
	hex: '#F0DFC1',
	rgb: { r: 240, g: 223, b: 193 },
	hsl: { h: 38, s: 61, l: 85 },
	hsv: { h: 38, s: 20, v: 94 },
}

describe('hex → rgb', () => {
	test('green', () => expect(hexToRgb(green.hex)).toEqual(green.rgb))
	test('darkpurple', () => expect(hexToRgb(darkpurple.hex)).toEqual(darkpurple.rgb))
	test('red', () => expect(hexToRgb(red.hex)).toEqual(red.rgb))
	test('light', () => expect(hexToRgb(light.hex)).toEqual(light.rgb))

	test('shortened hex', () => {
		expect(hexToRgb('#f0f')).toEqual({ r: 255, g: 0, b: 255 })
	})

	test('throws error if hex color is invalid', () => {
		expect(() => hexToRgb('abcdzy')).toThrowErrorMatchingInlineSnapshot(
			`[Error: Could not parse Hex Color]`,
		)
	})
})

describe('rgb → hsl', () => {
	test('green', () => expect(rgbToHsl(green.rgb)).toEqual(green.hsl))
	test('darkpurple', () => expect(rgbToHsl(darkpurple.rgb)).toEqual(darkpurple.hsl))
	test('red', () => expect(rgbToHsl(red.rgb)).toEqual(red.hsl))
	test('light', () => expect(rgbToHsl(light.rgb)).toEqual(light.hsl))
})

describe('hex → hsl', () => {
	test('green', () => expect(hexToHsl(green.hex)).toEqual(green.hsl))
	test('darkpurple', () => expect(hexToHsl(darkpurple.hex)).toEqual(darkpurple.hsl))
	test('red', () => expect(hexToHsl(red.hex)).toEqual(red.hsl))
	test('light', () => expect(hexToHsl(light.hex)).toEqual(light.hsl))
})

describe('contrast', () => {
	test('contrast from hex', () => {
		expect(getContrast(green.hex, magenta.hex)).toBeCloseTo(1.99, 2)
		expect(getContrast('#84E9BC', '#311B4E')).toBeCloseTo(10.28, 2)
	})

	test('contrast from rgb', () => {
		expect(getContrast(green.rgb, magenta.rgb)).toBeCloseTo(1.99, 2)
		expect(getContrast({ r: 132, g: 233, b: 188 }, { r: 49, g: 27, b: 78 })).toBeCloseTo(10.28, 2)
	})
})

describe("shouldn't mutate inputs", () => {
	test('rgbToHsl', () => {
		const greenRgbCopy = { ...green.rgb }
		rgbToHsl(green.rgb)
		expect(green.rgb).toEqual(greenRgbCopy)
	})
})
