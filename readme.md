# bainrow palettes

A collection of hand-picked color palettes I use in generative art / creative coding projects.

## Installation

```bash
npm install mish-bainrow
# or
pnpm install mish-bainrow
```

## Palettes

### Definition

```typescript
type Palette = {
	colors: string[]
	name: string
	tags?: string[]
	shades?: RoyGBiv[]
	credit?: { url?: string; name?: string }
	variants: VariantDef[]
}
```

**Credit** means the palette came from somewhere else, not from me!

### Get palettes object

```typescript
import { palettes } from 'mish-bainrow'
```

### Get palettes as array

```typescript
import { palettesList } from 'mish-bainrow'
```

## Palette pairs

Get color pairs from the palettes, with a min contrast ratio.

```typescript
import { getAllPairs } from 'mish-bainrow'

const pairs = getAllPairs(4) // get all pairs with contrast ratio of at least 4:1
```

## Palette variations

Most of the palettes have a few variants, with different combinations of background, stroke (sometimes), and colors lists. The library has functions for getting
variants for some or all palettes, optionally filtered by certain parameters (e.g. only variants with stroke colors, or only variants with a dark background color, etc).

### Palette variant definition:

```typescript
type PaletteVariant = {
	bg: string
	stroke?: string
	colors: string[]
	name: string
}
```

### Get palette variants with options

```typescript
import { getPaletteVariants } from 'mish-bainrow'

const variants = getPaletteVariants(options: {
	// list of palette names to exclude
	excludePalettes?: PaletteName[]
	// list of palette names to include
	includePalettes?: PaletteName[]
	// if true, include stroke in returned variants (default false)
	useStroke?: boolean
	// if true, the the background/stroke colors are excluded from the colors list
	isolateColors?: boolean
	minColors?: number
	maxColors?: number
	bgColor?: string | {
		type?: 'light' | 'dark' | 'edge'
		// keep lightness (hsl) value of the background within this percentage of 0 or 100
		// (e.g. 10 with a type of 'edge' means keep lightness between 0-10 or 90-100)
		edge?: number
		// max chroma val - use to keep colors to more neutral blackish/whiteish/grayish
		maxChroma?: number
	}
}): PaletteVariant[]
```
