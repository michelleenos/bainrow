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

// or hsb
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

export function hsvToRgb(hsv: HSV): RGB {
	let { h, s, v } = hsv
	let hi = h / 60
	s /= 100
	v /= 100
	let c = v * s
	let x = c * (1 - Math.abs((hi % 2) - 1))
	let m = v - c
	let r: number, g: number, b: number
	if (hi >= 0 && hi < 1) {
		;[r, g, b] = [c, x, 0]
	} else if (hi >= 1 && hi < 2) {
		;[r, g, b] = [x, c, 0]
	} else if (hi >= 2 && hi < 3) {
		;[r, g, b] = [0, c, x]
	} else if (hi >= 3 && hi < 4) {
		;[r, g, b] = [0, x, c]
	} else if (hi >= 4 && hi < 5) {
		;[r, g, b] = [x, 0, c]
	} else {
		;[r, g, b] = [c, 0, x]
	}
	return {
		r: Math.round((r + m) * 255),
		g: Math.round((g + m) * 255),
		b: Math.round((b + m) * 255),
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

export function getBrightness(color: string) {
	const rgb = hexToRgb(color)
	return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
}

export function getValue(color: string) {
	const hsv = rgbToHsv(hexToRgb(color))
	return hsv.v
}

export function getSaturation(color: string) {
	const hsv = rgbToHsv(hexToRgb(color))
	return hsv.s
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
