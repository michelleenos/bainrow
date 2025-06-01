export type RGB = {
	r: number
	g: number
	b: number
}

export type HSV = {
	h: number
	s: number
	v: number
}

export function hexToRgb(hex: string): RGB {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

	if (!result) {
		throw new Error('Could not parse Hex Color')
	}

	const rHex = parseInt(result[1], 16)
	const gHex = parseInt(result[2], 16)
	const bHex = parseInt(result[3], 16)

	return {
		r: +rHex.toFixed(2),
		g: +gHex.toFixed(2),
		b: +bHex.toFixed(2),
	}
}

export function rgbToHsv(rgb: RGB): HSV {
	const r = rgb.r / 255
	const g = rgb.g / 255
	const b = rgb.b / 255

	let max = Math.max(r, g, b)
	let min = Math.min(r, g, b)

	let h = 0,
		s = 0,
		v = max

	let d = max - min
	s = max === 0 ? 0 : d / max

	if (max === min) {
		h = 0
	} else {
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

	return {
		h: Math.round(h * 360),
		s: Math.round(s * 100),
		v: Math.round(v * 100),
	}
}

export function getBrightness(color: string) {
	const rgb = hexToRgb(color)
	return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
}

export function getValue(color: string) {
	const hsv = rgbToHsv(hexToRgb(color))
	return hsv.v
}

export function getLuminance(color: RGB | string) {
	const rgb = typeof color === 'string' ? hexToRgb(color) : color

	const lumVal = (val: number) => {
		val /= 255
		return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
	}

	return 0.2126 * lumVal(rgb.r) + 0.7152 * lumVal(rgb.g) + 0.0722 * lumVal(rgb.b)
}

export function getContrast(color1: RGB | string, color2: RGB | string) {
	const luminance1 = getLuminance(color1)
	const luminance2 = getLuminance(color2)

	return luminance1 > luminance2 ? (luminance1 + 0.05) / (luminance2 + 0.05) : (luminance2 + 0.05) / (luminance1 + 0.05)
}
