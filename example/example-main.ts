import './styles/style.scss'
import { getPairsFromPalette } from '~/lib/get-pairs'
import { GetPaletteVariantOpts, getVariantsFromSinglePalette } from '~/lib/get-palette-variants'
import { palettes } from '~/lib/palette-defs'
import { Palette } from '~/lib/types'

const keys = Object.keys(palettes) as (keyof typeof palettes)[]

const listenCheck = (
	examples: PaletteExamples,
	input: HTMLInputElement,
	key?: keyof PaletteExamples['show'],
	setHTML = false,
) => {
	input.addEventListener('change', () => {
		if (key) examples.show[key] = input.checked
		examples.toggleClasses()
		examples.enableAppropriateControls()
		if (setHTML) examples.setHTML()
	})
}

const listenInputVal = (
	examples: PaletteExamples,
	input: HTMLInputElement,
	key: keyof PaletteExamples['vals'],
) => {
	input.addEventListener('input', () => {
		examples.vals[key] = numOrUndefined(input.value)
		examples.enableAppropriateControls()
		examples.setHTML()
	})
}

const numOrUndefined = (input: string) => {
	let val = parseInt(input)
	return !Number.isNaN(val) ? val : undefined
}

type PaletteControls = {
	palettes: HTMLInputElement | null
	pairs: HTMLInputElement | null
	variants: HTMLInputElement | null
	stroke: HTMLInputElement | null
	minContrast: HTMLInputElement | null
	bgShade: HTMLSelectElement | null
	bgEdge: HTMLInputElement | null
	maxSaturation: HTMLInputElement | null
	darkMode: HTMLInputElement | null
	toggle: HTMLButtonElement | null
}

class PaletteExamples {
	container: HTMLElement
	controlsContainer: HTMLElement
	show = {
		stroke: false,
		pairs: false,
		variants: true,
		palettes: true,
		darkMode: false,
	}
	vals: {
		edge?: number
		minContrast?: number
		maxSaturation?: number
	} = {}
	data: ReturnType<typeof getAllPaletteExampleData>
	controls: PaletteControls
	bgShadeType?: 'dark' | 'light' | 'edge'
	isolateColors = false

	constructor(container: HTMLElement, controlsContainer: HTMLElement) {
		this.container = container
		this.controlsContainer = controlsContainer
		this.data = this.getData()
		this.controls = this.findControls()
		this.enableAppropriateControls()
		this.interactions()
		this.setHTML()
	}

	setHTML() {
		this.data = this.getData()
		generateExamples(this.container, this.data)
		this.toggleClasses()
	}

	getData() {
		return getAllPaletteExampleData({
			minContrastBg: this.vals.minContrast,
			isolateColors: this.isolateColors,
			useStroke: this.show.stroke,
			bgShade:
				this.bgShadeType || typeof this.vals.maxSaturation === 'number'
					? {
							type: this.bgShadeType,
							edge: this.vals.edge,
							maxSaturation: this.vals.maxSaturation,
						}
					: undefined,
		})
	}

	findControls() {
		return {
			palettes: this.controlsContainer.querySelector<HTMLInputElement>('input#br-toggle-palettes'),
			pairs: this.controlsContainer.querySelector<HTMLInputElement>('input#br-toggle-pairs'),
			variants: this.controlsContainer.querySelector<HTMLInputElement>('input#br-toggle-variants'),
			stroke: this.controlsContainer.querySelector<HTMLInputElement>('input#br-toggle-stroke'),
			minContrast: this.controlsContainer.querySelector<HTMLInputElement>('input#br-contrast'),
			bgShade: this.controlsContainer.querySelector<HTMLSelectElement>('select#br-bg-shade'),
			bgEdge: this.controlsContainer.querySelector<HTMLInputElement>('input#br-bg-edge'),
			maxSaturation: this.controlsContainer.querySelector<HTMLInputElement>(
				'input#br-bg-max-saturation',
			),
			darkMode: this.controlsContainer.querySelector<HTMLInputElement>('input#br-dark-mode'),
			toggle: document.querySelector<HTMLButtonElement>('button#toggle-controls'),
		}
	}

	enableAppropriateControls() {
		if (this.controls.stroke) this.controls.stroke.disabled = !this.show.variants
		if (this.controls.minContrast) {
			this.controls.minContrast.disabled = !this.show.variants
		}
		if (this.controls.bgShade) this.controls.bgShade.disabled = !this.show.variants
		if (this.controls.bgEdge)
			this.controls.bgEdge.disabled = this.bgShadeType === undefined || !this.show.variants
		if (this.controls.maxSaturation) {
			this.controls.maxSaturation.disabled = !this.show.variants
		}
	}

	toggleClasses() {
		this.container.classList.toggle('dark-mode', this.show.darkMode)
		this.container.classList.toggle('show-palettes', this.show.palettes)
		this.container.classList.toggle('show-pairs', this.show.pairs)
		this.container.classList.toggle('show-variants', this.show.variants)
	}

	interactions() {
		this.controls.palettes && listenCheck(this, this.controls.palettes, 'palettes')
		this.controls.pairs && listenCheck(this, this.controls.pairs, 'pairs')
		this.controls.variants && listenCheck(this, this.controls.variants, 'variants')
		this.controls.stroke && listenCheck(this, this.controls.stroke, 'stroke', true)
		this.controls.darkMode && listenCheck(this, this.controls.darkMode, 'darkMode')

		this.controls.minContrast && listenInputVal(this, this.controls.minContrast, 'minContrast')
		this.controls.maxSaturation && listenInputVal(this, this.controls.maxSaturation, 'maxSaturation')
		this.controls.bgEdge && listenInputVal(this, this.controls.bgEdge, 'edge')

		this.controls.bgShade?.addEventListener('change', () => {
			this.bgShadeType = this.controls.bgShade!.value as 'light' | 'dark' | 'edge' | undefined
			this.enableAppropriateControls()
			this.setHTML()
		})

		if (!this.controls.toggle) {
			this.controlsContainer.setAttribute('aria-hidden', 'false')
		} else {
			this.controlsContainer.setAttribute('aria-hidden', 'true')
			this.controls.toggle.addEventListener('click', () => {
				if (this.controls.toggle!.getAttribute('aria-expanded') === 'false') {
					this.controls.toggle!.setAttribute('aria-expanded', 'true')
					this.controlsContainer.setAttribute('aria-hidden', 'false')
				} else {
					this.controls.toggle!.setAttribute('aria-expanded', 'false')
					this.controlsContainer.setAttribute('aria-hidden', 'true')
				}
			})
		}
	}
}

const getPaletteExampleData = (palette: Palette, opts: GetPaletteVariantOpts = {}) => {
	return {
		palette,
		variants: getVariantsFromSinglePalette(palette, opts),
		pairs: getPairsFromPalette(palette.colors, 3),
	}
}

const getAllPaletteExampleData = (opts: GetPaletteVariantOpts = {}) => {
	return keys.map((key) => getPaletteExampleData(palettes[key], opts))
}

const generateExamples = (container: Element, data: ReturnType<typeof getAllPaletteExampleData>) => {
	container.innerHTML = ''

	data.forEach((item) => {
		const palette = item.palette
		const paletteDiv = document.createElement('div')

		const credit = item.palette.credit
		paletteDiv.classList.add('palette-example')
		paletteDiv.innerHTML = `<h2>${palette.name}</h2>`
		let paletteSideHtml = ''
		if (credit) {
			const url = credit.url
			const name = credit.name || url
			let creditHtml = ''
			if (url) {
				creditHtml += `<a href='${url}' target='_blank'>${name}</a>`
			} else {
				creditHtml += `<span>${name}</span>`
			}

			paletteSideHtml += `<div class='credit'>credit: ${creditHtml}</div>`
		}
		paletteSideHtml += `
			<a href='https://coolors.co/${palette.colors
				.map((color) => color.replace('#', ''))
				.join(
					'-',
				)}' target='_blank' rel='noopener noreferrer' class='coolors-link'>open in coolors</a>`
		paletteDiv.innerHTML += `<div class="palette-side">${paletteSideHtml}</div>`
		paletteDiv.innerHTML += `<div class="palette-example-colors">
				${palette.colors.map((color) => `<div class="color" style="background-color: ${color}"></div>`).join('')}
			</div>
		`

		let pairsDiv = document.createElement('div')
		pairsDiv.classList.add('palette-example-pairs')

		let pairsList = item.pairs
		pairsList.forEach((pair) => {
			const pairDiv = document.createElement('div')
			pairDiv.classList.add('palette-example-pair')
			pairDiv.innerHTML = `
				<div class="pair-color" style="background-color: ${pair[0]}"></div>
				<div class="pair-color" style="background-color: ${pair[1]}"></div>
			`
			pairsDiv.appendChild(pairDiv)
		})
		paletteDiv.appendChild(pairsDiv)

		let variantsDiv = document.createElement('div')
		variantsDiv.classList.add('palette-example-variants')

		item.variants.forEach(({ stroke, bg, colors }) => {
			const variantDiv = document.createElement('div')
			variantDiv.classList.add('palette-example-variant')
			variantDiv.style.backgroundColor = bg || ''

			variantDiv.innerHTML = `
						${colors
							.map((color) => {
								let style = ''
								if (!stroke && color === bg) return ''
								if (stroke) style += `border-color: ${stroke};`
								style += `background-color: ${color};`
								return `<div class="context-color" style="${style}"></div>`
							})
							.join('')}
				`
			variantsDiv.appendChild(variantDiv)
		})
		paletteDiv.appendChild(variantsDiv)

		container.appendChild(paletteDiv)
	})
}

let container = document.querySelector('.palette-examples')
let controlsContainer = document.querySelector('.example-controls')
if (container instanceof HTMLElement && controlsContainer instanceof HTMLElement) {
	new PaletteExamples(container, controlsContainer)
}
