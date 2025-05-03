export type RGB = {
	r: number
	g: number
	b: number
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

export function getLuminance(color: RGB | string) {
	const rgb = typeof color === 'string' ? hexToRgb(color) : color

	const normalizeRgb = (val: number) => {
		val /= 255
		return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
	}

	return 0.2126 * normalizeRgb(rgb.r) + 0.7152 * normalizeRgb(rgb.g) + 0.0722 * normalizeRgb(rgb.b)
}

export function getContrast(color1: RGB | string, color2: RGB | string) {
	const luminance1 = getLuminance(color1)
	const luminance2 = getLuminance(color2)

	return luminance1 > luminance2 ? (luminance1 + 0.05) / (luminance2 + 0.05) : (luminance2 + 0.05) / (luminance1 + 0.05)
}
