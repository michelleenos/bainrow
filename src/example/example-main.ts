import '~/styles/style.scss'

import { palettes } from '~/palettes'

const keys = Object.keys(palettes) as (keyof typeof palettes)[]

const addPaletteExamples = (container: Element, btnTogglePairs?: HTMLButtonElement, btnToggleContexts?: HTMLButtonElement) => {
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

		if (palette.pairs) {
			let pairsDiv = document.createElement('div')
			pairsDiv.classList.add('palette-example-pairs')

			let { lights, darks } = palette.pairs
			lights.forEach((light) => {
				darks.forEach((dark) => {
					const pairDiv = document.createElement('div')
					pairDiv.classList.add('palette-example-pair')
					pairDiv.innerHTML = `
						<div class="pair-color" style="background-color: ${light}"></div>
						<div class="pair-color" style="background-color: ${dark}"></div>
					`
					pairsDiv.appendChild(pairDiv)
				})
			})

			palette.pairs.add?.forEach((pair) => {
				const pairDiv = document.createElement('div')
				pairDiv.classList.add('palette-example-pair')
				pairDiv.innerHTML = `
					<div class="pair-color" style="background-color: ${pair[0]}"></div>
					<div class="pair-color" style="background-color: ${pair[1]}"></div>
				`
				pairsDiv.appendChild(pairDiv)
			})
			paletteDiv.appendChild(pairsDiv)
		}

		if (palette.contexts) {
			let contextsDiv = document.createElement('div')
			contextsDiv.classList.add('palette-example-contexts')

			palette.contexts.forEach(({ stroke, bg }) => {
				const contextDiv = document.createElement('div')
				contextDiv.classList.add('palette-example-context')
				contextDiv.style.backgroundColor = bg || ''
				contextDiv.innerHTML = `
						${palette.colors
							.map((color) => {
								let style = ''
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

	btnTogglePairs?.addEventListener('click', () => {
		container.classList.toggle('show-pairs')
		localStorage.setItem('show-pairs', container.classList.contains('show-pairs') ? 'true' : 'false')
	})
	if (localStorage.getItem('show-pairs') === 'true') {
		container.classList.add('show-pairs')
	}

	btnToggleContexts?.addEventListener('click', () => {
		container.classList.toggle('show-contexts')
		localStorage.setItem('show-contexts', container.classList.contains('show-contexts') ? 'true' : 'false')
	})
	if (localStorage.getItem('show-contexts') === 'true') {
		container.classList.add('show-contexts')
	}
}

let btnTogglePairs = document.querySelector<HTMLButtonElement>('button.br-toggle-pairs')
let btnToggleContexts = document.querySelector<HTMLButtonElement>('button.br-toggle-contexts')
let container = document.querySelector('.palette-examples')
if (container) {
	addPaletteExamples(container, btnTogglePairs || undefined, btnToggleContexts || undefined)
}
