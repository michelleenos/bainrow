import './styles/style.scss'
import { getPairsFromPalette } from '~/lib/get-pairs'
import { GetPaletteVariantOpts, getVariantsFromSinglePalette } from '~/lib/get-palette-variants'
import { palettes } from '~/lib/palette-defs'
import { Palette } from '~/lib/types'
import { createElement } from './utils'

// TODO (example) - add the rest of the options to controls?

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
	viewMode: HTMLSelectElement | null
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
			viewMode: this.controlsContainer.querySelector<HTMLSelectElement>('select#br-view-mode'),
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
		// this.container.classList.toggle('dark-mode', this.show.darkMode)
		this.container.classList.toggle('show-palettes', this.show.palettes)
		this.container.classList.toggle('show-pairs', this.show.pairs)
		this.container.classList.toggle('show-variants', this.show.variants)
	}

	interactions() {
		this.controls.palettes && listenCheck(this, this.controls.palettes, 'palettes')
		this.controls.pairs && listenCheck(this, this.controls.pairs, 'pairs')
		this.controls.variants && listenCheck(this, this.controls.variants, 'variants')
		this.controls.stroke && listenCheck(this, this.controls.stroke, 'stroke', true)
		// this.controls.viewMode && listenCheck(this, this.controls.viewMode, 'darkMode')

		// this.controls.viewMode && listenInputVal(this, this.controls.viewMode, '')
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

		this.controls.viewMode &&
			this.controls.viewMode.addEventListener('change', () => {
				const value = this.controls.viewMode!.value
				if (value === 'dark') {
					document.body.classList.add('dark-mode')
				} else {
					document.body.classList.remove('dark-mode')
				}
			})
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
		paletteDiv.classList.add('palette')
		paletteDiv.innerHTML = `<h3 class="palette__title">${palette.name}</h3>`
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

		const coolorsLink = `https://coolors.co/${palette.colors.map((color) => color.replace('#', '')).join('-')}`
		const paletteHover = createElement('div', { class: 'palette__hover' }, [
			createElement('a', { href: coolorsLink, target: '_blank', rel: 'noopener noreferrer' }, [
				'view ↗',
			]),
		])
		paletteDiv.innerHTML += `<div class="palette__side-notes">${paletteSideHtml}</div>`
		const paletteColorsDiv = createElement('div', { class: 'palette__colors' }, [
			paletteHover,
			`${palette.colors.map((color) => `<div class="color" style="background-color: ${color}"></div>`).join('')}`,
		])
		paletteDiv.innerHTML += paletteColorsDiv.outerHTML

		let pairsDiv = document.createElement('div')
		pairsDiv.classList.add('palette__pairs')

		let pairsList = item.pairs
		pairsList.forEach((pair) => {
			const pairDiv = document.createElement('div')
			pairDiv.classList.add('palette__pair')
			pairDiv.innerHTML = `
				<div class="pair-color" style="background-color: ${pair[0]}"></div>
				<div class="pair-color" style="background-color: ${pair[1]}"></div>
			`
			pairsDiv.appendChild(pairDiv)
		})
		paletteDiv.appendChild(pairsDiv)

		let variantsDiv = document.createElement('div')
		variantsDiv.classList.add('palette__variants')
		const variantsTitle = document.createElement('h4')
		variantsTitle.classList.add('palette__variants-title')
		variantsTitle.innerText = 'Variants'
		variantsDiv.appendChild(variantsTitle)

		item.variants.forEach(({ stroke, bg, colors }) => {
			const variantDiv = document.createElement('div')
			variantDiv.classList.add('palette__variant')
			variantDiv.style.backgroundColor = bg || ''

			variantDiv.innerHTML = `
						${colors
							.map((color) => {
								let style = ''
								if (!stroke && color === bg) return ''
								if (stroke) style += `border-color: ${stroke};`
								style += `background-color: ${color};`
								return `<div style="${style}"></div>`
							})
							.join('')}
				`
			variantsDiv.appendChild(variantDiv)
		})
		paletteDiv.appendChild(variantsDiv)

		container.appendChild(paletteDiv)
	})
}

let container = document.querySelector('.palettes-list')
let controlsContainer = document.querySelector('.controls')
if (container instanceof HTMLElement && controlsContainer instanceof HTMLElement) {
	new PaletteExamples(container, controlsContainer)
}
