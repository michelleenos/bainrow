import { adjustCanvas, CanvasProps, notify } from '../utils'

type ContextComponentEvents = {
	removecontext: Event
}
type ContextComponentEventMap = HTMLElementEventMap & ContextComponentEvents

export interface PaletteContextComponent extends HTMLElement {
	addEventListener<K extends keyof ContextComponentEventMap>(
		type: K,
		listener: (this: HTMLElement, ev: ContextComponentEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions
	): void
}

export class PaletteContextComponent extends HTMLElement {
	ctx?: CanvasRenderingContext2D
	props?: CanvasProps
	colorsList?: string[]
	bg?: string
	stroke?: string
	canRemove = true
	isolateColors = false

	static get observedAttributes() {
		return ['colors-list', 'isolate-colors', 'bg', 'stroke', 'width', 'height', 'res']
	}

	constructor() {
		super()

		this.addEventListener('click', this.clickEvent)
	}

	connectedCallback() {
		if (this.childElementCount > 0) return

		const template = document.querySelector('template#palette-context-template') as HTMLTemplateElement
		this.appendChild(template.content.cloneNode(true))
		if (this.getAttribute('can-remove') === 'false') {
			this.canRemove = false
			;(this.querySelector('.ctx-btn-remove') as HTMLElement).setAttribute('disabled', 'true')
		}

		this.getColors()

		this.ctx = (this.querySelector('.ctx-canvas') as HTMLCanvasElement).getContext('2d')!
		this.props = this.getDrawProps()
		adjustCanvas(this.ctx, this.props)
		this.paint()
	}

	getColors = () => {
		let colorsList = this.getAttribute('colors-list')
		this.colorsList = colorsList ? colorsList.split(',') : undefined
		this.bg = this.getAttribute('bg') || undefined
		this.stroke = this.getAttribute('stroke') || undefined
	}

	attributeChangedCallback(name: string, _oldValue: string, newValue: string) {
		if (name === 'colors-list') {
			this.colorsList = newValue.split(',')
			this.paint()
		} else if (name === 'bg') {
			this.bg = newValue
		} else if (name === 'stroke') {
			this.stroke = newValue
		} else if (name === 'isolate-colors') {
			this.isolateColors = newValue === 'true'
			this.paint()
		} else if (name === 'width' || name === 'height' || name === 'res') {
			this.props = this.getDrawProps()
			if (this.ctx) adjustCanvas(this.ctx, this.props)
			this.paint()
		}
	}

	clickEvent = (e: MouseEvent) => {
		let target = e.target
		if (!(target instanceof HTMLElement)) return

		let btnRemove = target.closest('.ctx-btn-remove')
		if (btnRemove) return this.emit('removecontext')

		let btnCopy = target.closest('.ctx-btn-copy')
		if (btnCopy) {
			let str = JSON.stringify({ bg: this.bg, stroke: this.stroke })
			navigator.clipboard.writeText(str)
			notify(`Copied to clipboard: <code>${str}</code>`)
		}
	}

	getDrawProps = () => ({
		width: +(this.getAttribute('width') || 450),
		height: +(this.getAttribute('height') || 130),
		res: +(this.getAttribute('res') || window.devicePixelRatio),
	})

	canDraw = (): this is { colorsList: string[]; props: CanvasProps; ctx: CanvasRenderingContext2D } => {
		return !(!this.colorsList || !this.ctx || !this.props)
	}

	paint = () => {
		if (!this.canDraw()) return
		const { width, height } = this.props
		let colors = this.isolateColors ? this.colorsList.filter((c) => c !== this.bg && c !== this.stroke) : this.colorsList
		let space = 8
		let padding = 18
		let colorWidth = (width - padding * 2 - space * (colors.length - 1)) / colors.length
		let colorHeight = height - padding * 2
		let colorY = (height - colorHeight) / 2

		if (this.bg) {
			this.ctx.fillStyle = this.bg
			this.ctx.fillRect(0, 0, width, height)
		}

		if (this.stroke) {
			this.ctx.strokeStyle = this.stroke
			this.ctx.lineWidth = 3
		}

		colors.forEach((color, i) => {
			this.ctx.fillStyle = color
			this.ctx.fillRect(i * (colorWidth + space) + padding, colorY, colorWidth, colorHeight)
			if (this.stroke) this.ctx.strokeRect(i * (colorWidth + space) + padding, colorY, colorWidth, colorHeight)
		})
	}

	emit = (name: keyof ContextComponentEvents) => {
		this.dispatchEvent(new CustomEvent(name, { bubbles: true, cancelable: true }))
	}
}

customElements.define('palette-context-example', PaletteContextComponent)
