import './styles/style.scss'

import { getPairsFromPalette } from '~/lib/get-pairs'
import { getAllPaletteContexts, getPaletteContexts, GetPaletteContextsOptions } from '~/lib/get-palette-contexts'
import { palettes } from '~/lib/palette-defs'
import { Palette } from '~/lib/types'

const keys = Object.keys(palettes) as (keyof typeof palettes)[]

type PaletteControls = {
	pairs?: HTMLInputElement
	contexts?: HTMLInputElement
	stroke?: HTMLInputElement
	minContrast?: HTMLInputElement
	minContrastAmount?: HTMLInputElement
}

class PaletteExamples {
	container: HTMLElement
	useMinContrast = false
	minContrast = 3
	isolateColors = false
	useStroke = false
	showPairs = false
	showContexts = true
	data: ReturnType<typeof getAllPaletteExampleData>
	controls: PaletteControls
	constructor(container: HTMLElement) {
		this.container = container
		this.data = this.getData()
		this.controls = this.findControls()
		this.enableAppropriateControls()
		this.interactions()
		this.setHTML()
	}

	setHTML() {
		this.data = this.getData()
		generateExamples(this.container, this.data)
	}

	getData() {
		return getAllPaletteExampleData({
			minContrastBg: this.useMinContrast ? this.minContrast : undefined,
			isolateColors: this.isolateColors,
			useStroke: this.useStroke,
		})
	}

	findControls() {
		let pairs = document.querySelector<HTMLInputElement>('input#br-toggle-pairs') || undefined
		let contexts = document.querySelector<HTMLInputElement>('input#br-toggle-contexts') || undefined
		let stroke = document.querySelector<HTMLInputElement>('input#br-toggle-stroke') || undefined
		let minContrast = document.querySelector<HTMLInputElement>('input#br-use-contrast') || undefined
		let minContrastAmount = document.querySelector<HTMLInputElement>('input#br-contrast') || undefined

		return { pairs, contexts, stroke, minContrast, minContrastAmount }
	}

	enableAppropriateControls() {
		if (this.controls.minContrast && this.controls.minContrastAmount) {
			this.controls.minContrastAmount.disabled = !this.useMinContrast
		}

		if (this.controls.stroke) this.controls.stroke.disabled = !this.showContexts
		if (this.controls.minContrast) this.controls.minContrast.disabled = !this.showContexts
		if (this.controls.minContrastAmount) {
			this.controls.minContrastAmount.disabled = !this.showContexts || !this.useMinContrast
		}
	}

	interactions() {
		this.controls.pairs?.addEventListener('change', () => {
			this.showPairs = this.controls.pairs!.checked
			this.container.classList.toggle('show-pairs', this.showPairs)
		})

		if (this.controls.contexts) {
			this.controls.contexts.checked = this.showContexts
			this.container.classList.toggle('show-contexts', this.showContexts)

			this.controls.contexts.addEventListener('change', () => {
				this.showContexts = this.controls.contexts!.checked
				this.container.classList.toggle('show-contexts', this.showContexts)
				this.enableAppropriateControls()
			})
		}

		if (this.controls.stroke) {
			this.controls.stroke.checked = this.useStroke
		}
		this.controls.stroke?.addEventListener('click', () => {
			this.useStroke = this.controls.stroke!.checked
			this.setHTML()
		})

		if (this.controls.minContrastAmount) {
			this.controls.minContrastAmount.value = this.minContrast.toString()
		}

		this.controls.minContrast?.addEventListener('change', () => {
			this.useMinContrast = this.controls.minContrast!.checked
			if (this.controls.minContrastAmount) {
				this.controls.minContrastAmount.disabled = !this.useMinContrast
			}
			this.setHTML()
		})

		this.controls.minContrastAmount?.addEventListener('input', () => {
			this.minContrast = parseInt(this.controls.minContrastAmount!.value)
			this.setHTML()
		})

		this.controls.minContrastAmount?.addEventListener('keydown', (e) => {
			if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
				if (e.shiftKey) {
					let prevVal = parseInt(this.controls.minContrastAmount!.value)

					if (e.key === 'ArrowUp') {
						this.controls.minContrastAmount!.value = (prevVal + 1).toString()
					} else {
						this.controls.minContrastAmount!.value = (prevVal - 1).toString()
					}

					this.minContrast = parseInt(this.controls.minContrastAmount!.value)
					this.setHTML()
				}
			}
		})
	}
}

const getPaletteExampleData = (palette: Palette, opts: GetPaletteContextsOptions = {}) => {
	return { palette, contexts: getPaletteContexts(palette, opts), pairs: getPairsFromPalette(palette.colors, 3) }
}

const getAllPaletteExampleData = (opts: GetPaletteContextsOptions = {}) => {
	return keys.map((key) => getPaletteExampleData(palettes[key], opts))
}

const generateExamples = (container: Element, data: ReturnType<typeof getAllPaletteExampleData>) => {
	container.innerHTML = ''

	data.forEach((item) => {
		const palette = item.palette
		const paletteDiv = document.createElement('div')
		paletteDiv.classList.add('palette-example')
		paletteDiv.innerHTML = `
			<h2>${palette.name}</h2>
			<div class="palette-example-colors">
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

		let contextsDiv = document.createElement('div')
		contextsDiv.classList.add('palette-example-contexts')

		item.contexts.forEach(({ stroke, bg, colors }) => {
			const contextDiv = document.createElement('div')
			contextDiv.classList.add('palette-example-context')
			contextDiv.style.backgroundColor = bg || ''

			contextDiv.innerHTML = `
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
			contextsDiv.appendChild(contextDiv)
		})
		paletteDiv.appendChild(contextsDiv)

		container.appendChild(paletteDiv)
	})
}

let container = document.querySelector('.palette-examples')
if (container instanceof HTMLElement) {
	new PaletteExamples(container)
	// addPaletteExamples(container, { pairs: btnTogglePairs, contexts: btnToggleContexts, stroke: btnToggleStroke })
}

console.log(getAllPaletteContexts())
