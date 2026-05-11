import { describe, expect, test } from 'vitest'
import { getPalettesArray } from '~/lib/get-palettes-array'
import { palettes as paletteDefs } from '~/lib/palette-defs'

describe('getPalettesArray', () => {
	test('gets palettes array a first time', () => {
		const palettes = getPalettesArray()
		expect(palettes).toBeDefined()
		expect(palettes.length).toEqual(Object.keys(paletteDefs).length)
	})

	test('gets palettes array a second time and returns the same object', () => {
		const palettes1 = getPalettesArray()
		const palettes2 = getPalettesArray()
		expect(palettes1).toBe(palettes2)
	})
})
