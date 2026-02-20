type PaletteControlsEvents = {
	paletteNewContext: CustomEvent
	isolateColorsChange: CustomEvent
	clearAllContexts: CustomEvent
}

type PaletteControlsEventMap = HTMLElementEventMap & PaletteControlsEvents

export interface PaletteControls extends HTMLElement {
	addEventListener<K extends keyof PaletteControlsEventMap>(
		type: K,
		listener: (this: PaletteControls, ev: PaletteControlsEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions
	): void
}

export class PaletteControls extends HTMLElement {
	btnIsolateColors: HTMLElement
	isolateColors = false
	colorsCount: number
	selectedBgIndex: number | 'random'
	selectedStrokeIndex: number | 'random' | 'none'
	colors: string[]

	static get observedAttributes() {
		return ['colors-list']
	}

	constructor() {
		super()

		const template = document.querySelector('template#palette-controls-template') as HTMLTemplateElement
		if (!template) throw new Error('Template not found')

		const instance = template.content.cloneNode(true)
		this.appendChild(instance)

		this.btnIsolateColors = this.querySelector('.btn-isolate')!

		this.selectedBgIndex = 'random'
		this.selectedStrokeIndex = 'random'
		this.classList.add('bg-random', 'stroke-random')
		this.colors = this.getAttribute('colors-list')?.split(',') || []
		this.colorsCount = this.colors.length

		this.addEventListener('click', this.handleClick)
	}

	get newContextBg() {
		return typeof this.selectedBgIndex === 'number' ? this.colors[this.selectedBgIndex] : this.selectedBgIndex
	}

	get newContextStroke() {
		return typeof this.selectedStrokeIndex === 'number' ? this.colors[this.selectedStrokeIndex] : this.selectedStrokeIndex
	}

	handleClick = (e: MouseEvent) => {
		let target = e.target
		if (!(target instanceof HTMLElement)) return

		let btnCreateContext = target.closest('.btn-new-ctx')
		if (btnCreateContext) return this.emit('paletteNewContext')

		if (target.closest('.btn-clear-all')) return this.emit('clearAllContexts')

		if (target.closest('.palette-bg-select')) {
			this.classList.remove('bg-none', 'bg-random')

			if (this.selectedBgIndex === 'random') {
				this.selectedBgIndex = 0
			} else if (this.selectedBgIndex === this.colorsCount - 1) {
				this.selectedBgIndex = 'random'
			} else {
				this.selectedBgIndex++
			}
			if (typeof this.selectedBgIndex === 'string') this.classList.add(`bg-${this.selectedBgIndex}`)
			this.style.setProperty('--bg-select', typeof this.selectedBgIndex === 'number' ? this.colors[this.selectedBgIndex] : '')
			return
		}

		if (target.closest('.palette-stroke-select')) {
			this.classList.remove('stroke-none', 'stroke-random')
			if (this.selectedStrokeIndex === 'random') {
				this.selectedStrokeIndex = 0
			} else if (this.selectedStrokeIndex === 'none') {
				this.selectedStrokeIndex = 'random'
			} else if (this.selectedStrokeIndex === this.colorsCount - 1) {
				this.selectedStrokeIndex = 'none'
			} else {
				this.selectedStrokeIndex++
			}

			if (typeof this.selectedStrokeIndex === 'string') this.classList.add(`stroke-${this.selectedStrokeIndex}`)
			this.style.setProperty(
				'--stroke-select',
				typeof this.selectedStrokeIndex === 'number' ? this.colors[this.selectedStrokeIndex] : ''
			)

			return
		}

		if (target.closest('.btn-isolate')) {
			this.isolateColors = !this.isolateColors
			this.btnIsolateColors.textContent = this.isolateColors ? 'Un-isolate' : 'Isolate'
			this.emit('isolateColorsChange', { value: this.isolateColors })
			return
		}
	}

	emit = (name: keyof PaletteControlsEvents, detail?: { [key: string]: any } | string) => {
		this.dispatchEvent(new CustomEvent(name, { bubbles: true, cancelable: true, detail }))
	}

	attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
		if (name === 'colors-list') {
			this.colors = newValue.split(',') || []
			this.colorsCount = this.colors.length
		}
	}
}

customElements.define('palette-controls', PaletteControls)
