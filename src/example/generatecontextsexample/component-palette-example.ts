import type { Palette, PaletteContext } from '~/lib/types'
import { PaletteContextComponent } from './component-palette-context'
import { PaletteControls } from './component-palette-controls'
import { adjustCanvas, CanvasProps, createElement, notify, random } from '../utils'
import { isPalette } from './types-example'

type InitializedPaletteExampleComponent = {
	palette: Palette
	name: string
	controls: PaletteControls
	ctx: CanvasRenderingContext2D
	props: CanvasProps
	allColors: string[]
}

export class PaletteExampleComponent extends HTMLElement {
	palette?: Palette
	ctx?: CanvasRenderingContext2D
	allColors?: string[]
	controls?: PaletteControls
	name: string
	props!: CanvasProps
	contexts: (PaletteContext & { el?: PaletteContextComponent; initial: boolean })[] = []
	contextCombos?: [number, number][]
	combosUnused: Set<string> = new Set()

	constructor() {
		super()

		this.name = this.getAttribute('name') || 'Palette Example'
		window.addEventListener('resize', () => {
			this.props = this.getDrawProps()
			if (this.ctx) adjustCanvas(this.ctx, this.props)
			this.paint()
		})
	}

	get observedAttributes() {
		return ['palette', 'res', 'name', 'palette-height', 'ctx-height', 'ctx-width']
	}

	connectedCallback() {
		if (this.childElementCount > 0) return

		const template = document.querySelector('template#palette-example-template') as HTMLTemplateElement
		this.appendChild(template.content.cloneNode(true))
		this.addEventListener('click', this.handleClick)

		this.controls = this.querySelector('palette-controls') as PaletteControls
		this.controls.addEventListener('paletteNewContext', this.onControlsNewContext)
		this.controls.addEventListener('isolateColorsChange', this.onControlsIsolateColorsChange)
		this.controls.addEventListener('clearAllContexts', () => {
			this.contexts.forEach((context) => {
				if (!context.initial) this.removeContext(context)
			})
		})
		this.ctx = (this.querySelector('.palette-canvas') as HTMLCanvasElement).getContext('2d')!
		let title = this.querySelector('.palette-title')
		title && (title.textContent = this.name)

		this.props = this.getDrawProps()
		adjustCanvas(this.ctx, this.props)

		this.palette = this.getPalette()
		this.setContexts()
		this.paint()
	}

	handleClick = (e: MouseEvent) => {
		let target = e.target
		if (!(target instanceof HTMLElement)) return
		if (target.closest('.palette-btn-copy') && this.palette) {
			navigator.clipboard.writeText(JSON.stringify(this.palette.colors))
			notify('copied')
		}
	}

	onControlsIsolateColorsChange = (_e: CustomEvent) => {
		if (!this.canDraw()) return
		this.contexts.forEach((context) => {
			context.el?.setAttribute('isolate-colors', this.controls.isolateColors ? 'true' : 'false')
		})
	}

	onControlsNewContext = () => {
		if (!this.canDraw()) return
		let contextDiv = this.querySelector('.palette-contexts')
		if (!contextDiv) return
		if (!this.combosUnused) return

		let bg: string | undefined = this.controls.newContextBg
		let stroke: string | undefined = this.controls.newContextStroke

		if (this.combosUnused.size === 0) {
			return notify('no more combos')
		}

		if (bg === 'random' && stroke === 'random') {
			let choice = random([...this.combosUnused])
			let split = choice.split('-')
			bg = split[0]
			stroke = split[1]
			this.combosUnused.delete(choice)
		} else if (bg === 'random') {
			let choices = [...this.combosUnused].filter((c) => c.endsWith(`-${stroke}`))
			if (choices.length === 0) {
				return notify('no more combos with this stroke')
			}
			let choice = random(choices)
			bg = choice.split('-')[0]
			this.combosUnused.delete(choice)
		} else if (stroke === 'random') {
			let choices = [...this.combosUnused].filter((c) => c.startsWith(`${bg}-`))
			if (choices.length === 0) {
				return notify('no more combos with this bg')
			}
			let choice = random(choices)
			stroke = choice.split('-')[1]
			this.combosUnused.delete(choice)
		} else {
			let choice = `${bg}-${stroke}`
			if (!this.combosUnused.has(choice)) {
				return notify('already used')
			}
			this.combosUnused.delete(choice)
		}

		if (stroke === 'none') stroke = undefined

		let newContext = { bg, stroke, initial: false }
		let el = this.buildContextExample(newContext)
		this.contexts.push({ ...newContext, el })
		contextDiv.appendChild(el)
	}

	getDrawProps = () => {
		let clientWidth = this.clientWidth

		return {
			width: +clientWidth,
			height: +(this.getAttribute('palette-height') || 150),
			res: +(this.getAttribute('res') || window.devicePixelRatio),
		}
	}

	getPalette = () => {
		try {
			let palette = JSON.parse(this.getAttribute('palette') || '') as unknown
			if (!isPalette(palette)) throw new Error('Invalid palette')
			this.allColors = this.getAllColors(palette)
			this.controls?.setAttribute('colors-list', this.allColors.join(','))
			return palette
		} catch (e) {
			return undefined
		}
	}

	getAllColors = (palette: Palette) => {
		let allColorsSet = new Set(palette.colors)
		if (!palette.contexts) return Array.from(allColorsSet)
		palette.contexts.forEach(({ bg, stroke }) => {
			if (bg) allColorsSet.add(bg)
			if (stroke) allColorsSet.add(stroke)
		})
		return Array.from(allColorsSet)
	}

	attributeChangedCallback(name: string, _oldValue: string, _newValue: string) {
		if (name === 'palette') {
			this.palette = this.getPalette()
			this.setContexts()
			this.paint()
		} else if (name === 'palette-height') {
			this.props = this.getDrawProps()
			if (this.ctx) adjustCanvas(this.ctx, this.props)
			this.paint()
		}
	}

	canDraw = (): this is InitializedPaletteExampleComponent => {
		return !(!this.palette || !this.ctx || !this.props || !this.allColors)
	}

	paint = () => {
		if (!this.canDraw()) return
		const { colors } = this.palette
		let colorWidth = this.props.width / colors.length
		let colorHeight = this.props.height
		colors.forEach((c, i) => {
			this.ctx!.fillStyle = c
			this.ctx!.fillRect(i * colorWidth, 0, colorWidth, colorHeight)
		})
	}

	paintContexts = () =>
		this.contexts.forEach((context) => {
			if (!context.el) return
			context.el.paint()
		})

	setContexts = () => {
		let ctxDiv = this.querySelector('.palette-contexts')
		if (!this.canDraw()) return
		if (!ctxDiv) return

		ctxDiv.innerHTML = ''

		this.contexts = (this.palette.contexts || []).map((c) => ({ ...c, initial: true }))
		let combosUnused = new Set<string>()

		this.allColors.forEach((firstVal) => {
			this.allColors.forEach((secondVal) => {
				if (firstVal === secondVal) return
				combosUnused.add(`${firstVal}-${secondVal}`)
			})
			combosUnused.add(`${firstVal}-none`)
		})

		this.contexts.forEach((context) => {
			let bg = context.bg || 'none'
			let stroke = context.stroke || 'none'
			let combo = `${bg}-${stroke}`
			combosUnused.delete(combo)
			ctxDiv.appendChild(this.buildContextExample(context))
		})

		this.combosUnused = combosUnused
	}

	buildContextExample = (context: (typeof this.contexts)[number]) => {
		if (!this.canDraw()) throw new Error('Cannot draw')
		let width = `${Math.max(this.palette.colors.length * 65, 350)}`
		let height = `${Math.max(this.palette.colors.length * 18, 100)}`
		let res = `${Math.min(window.devicePixelRatio, 2)}`
		let el = createElement('palette-context-example', {
			'colors-list': this.palette!.colors.join(','),
			// bg: context.bg || '',
			// stroke: context.stroke || '',
			width,
			height,
			res,
			isolateColors: this.controls!.isolateColors ? 'true' : 'false',
			'can-remove': context.initial ? 'false' : 'true',
		}) as PaletteContextComponent
		if (context.bg) el.setAttribute('bg', context.bg)
		if (context.stroke) el.setAttribute('stroke', context.stroke)
		if (context.initial) el.setAttribute('can-remove', 'false')
		context.el = el

		el.addEventListener('removecontext', () => this.removeContext(context))

		return el
	}

	removeContext = (context: (typeof this.contexts)[number]) => {
		this.contexts = this.contexts.filter((c) => c !== context)
		this.combosUnused.add(`${context.bg || 'none'}-${context.stroke || 'none'}`)
		context.el?.remove()
	}
}

customElements.define('palette-example', PaletteExampleComponent)
