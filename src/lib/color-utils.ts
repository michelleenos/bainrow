export interface RGB {
	r: number
	g: number
	b: number
}

export interface HSV {
	h: number
	s: number
	v: number
}

export interface HSL {
	h: number
	s: number
	l: number
}

export function hexToRgb(hex: string): RGB {
	let h = hex.replace('#', '')
	if (h.length === 3) {
		h = h
			.split('')
			.map((x) => `${x}` + `${x}`)
			.join('')
	}
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h)

	if (!result) {
		throw new Error('Could not parse Hex Color')
	}

	const rHex = parseInt(result[1], 16)
	const gHex = parseInt(result[2], 16)
	const bHex = parseInt(result[3], 16)

	return {
		r: rHex,
		g: gHex,
		b: bHex,
	}
}

export function rgbToHsl(rgb: RGB): HSL {
	let r = rgb.r / 255
	let g = rgb.g / 255
	let b = rgb.b / 255

	let max = Math.max(r, g, b)
	let min = Math.min(r, g, b)
	let h = 0
	let s: number
	let l = (max + min) / 2

	if (max === min) {
		h = 0
		s = 0
	} else {
		let d = max - min
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
		switch (max) {
			case r:
				h = (g - b) / d + (g < b ? 6 : 0)
				break
			case g:
				h = (b - r) / d + 2
				break
			case b:
				h = (r - g) / d + 4
				break
		}

		h /= 6
	}

	return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export function hexToHsl(hex: string): HSL {
	let rgb = hexToRgb(hex)
	return rgbToHsl(rgb)
}

export interface OKLCH {
	l: number
	c: number
	h: number
}

/**
 * Perceptually uniform lightness/chroma/hue.
 * // TODO test/double check this (AI wrote it)
 */
export function rgbToOklch(rgb: RGB): OKLCH {
	const lin = (val: number) => {
		val /= 255
		return val <= 0.04045 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
	}

	const r = lin(rgb.r)
	const g = lin(rgb.g)
	const b = lin(rgb.b)

	const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
	const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
	const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)

	const okL = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s
	const okA = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s
	const okB = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s

	let h = (Math.atan2(okB, okA) * 180) / Math.PI
	if (h < 0) h += 360

	return { l: okL, c: Math.hypot(okA, okB), h }
}

export function hexToOklch(hex: string): OKLCH {
	return rgbToOklch(hexToRgb(hex))
}

export function getRelativeLuminance(color: RGB | string) {
	const rgb = typeof color === 'string' ? hexToRgb(color) : color
	const lumVal = (val: number) => {
		val /= 255
		return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
	}

	return 0.2126 * lumVal(rgb.r) + 0.7152 * lumVal(rgb.g) + 0.0722 * lumVal(rgb.b)
}

export function getContrast(color1: RGB | string, color2: RGB | string) {
	const luminance1 = getRelativeLuminance(color1)
	const luminance2 = getRelativeLuminance(color2)

	return luminance1 > luminance2
		? (luminance1 + 0.05) / (luminance2 + 0.05)
		: (luminance2 + 0.05) / (luminance1 + 0.05)
}
