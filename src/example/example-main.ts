import './styles/style.scss'

import { getPairsFromPalette } from '~/lib/get-pairs'
import { palettes } from '~/lib/palette-defs'

const keys = Object.keys(palettes) as (keyof typeof palettes)[]

type PaletteBtns = {
	pairs?: HTMLButtonElement
	contexts?: HTMLButtonElement
	stroke?: HTMLButtonElement
}

const addPaletteExamples = (container: Element, btns: PaletteBtns = {}) => {
	keys.forEach((key) => {
		const palette = palettes[key]
		const paletteDiv = document.createElement('div')
		paletteDiv.classList.add('palette-example')
		paletteDiv.innerHTML = `
			<h2>${key}</h2>
			<div class="palette-example-colors">
				${palette.colors.map((color) => `<div class="color" style="background-color: ${color}"></div>`).join('')}
			</div>
		`

		let pairsDiv = document.createElement('div')
		pairsDiv.classList.add('palette-example-pairs')

		let pairsList = getPairsFromPalette(palette.colors, 3)
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

		if (palette.contexts) {
			let contextsDiv = document.createElement('div')
			contextsDiv.classList.add('palette-example-contexts')

			palette.contexts.forEach(({ stroke, bg, omit, add }) => {
				const contextDiv = document.createElement('div')
				contextDiv.classList.add('palette-example-context')
				contextDiv.style.backgroundColor = bg || ''

				contextDiv.innerHTML = `
						${[...palette.colors.filter((c) => !omit?.includes(c)), ...(add || [])]
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
		}
		container.appendChild(paletteDiv)
	})

	btns.pairs?.addEventListener('click', () => {
		container.classList.toggle('show-pairs')
		localStorage.setItem('show-pairs', container.classList.contains('show-pairs') ? 'true' : 'false')
	})
	if (localStorage.getItem('show-pairs') === 'true') {
		container.classList.add('show-pairs')
	}

	btns.contexts?.addEventListener('click', () => {
		container.classList.toggle('show-contexts')
		localStorage.setItem('show-contexts', container.classList.contains('show-contexts') ? 'true' : 'false')
	})
	if (localStorage.getItem('show-contexts') === 'true') {
		container.classList.add('show-contexts')
	}

	btns.stroke?.addEventListener('click', () => {
		container.classList.toggle('hide-stroke')
		localStorage.setItem('hide-stroke', container.classList.contains('hide-stroke') ? 'true' : 'false')
	})
	if (localStorage.getItem('hide-stroke') === 'true') {
		container.classList.add('hide-stroke')
	}
}

let btnTogglePairs = document.querySelector<HTMLButtonElement>('button.br-toggle-pairs') || undefined
let btnToggleContexts = document.querySelector<HTMLButtonElement>('button.br-toggle-contexts') || undefined
let btnToggleStroke = document.querySelector<HTMLButtonElement>('button.br-toggle-stroke') || undefined
let container = document.querySelector('.palette-examples')
if (container) {
	addPaletteExamples(container, { pairs: btnTogglePairs, contexts: btnToggleContexts, stroke: btnToggleStroke })
}
