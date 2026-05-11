import { hexToRgb, HSV, RGB } from './color-utils'

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
