import { createElement } from '~/example/utils'
import { palettes } from '~/palettes'

const makeExamples = (container: HTMLElement, pals: typeof palettes) => {
	const resolution = Math.min(window.devicePixelRatio, 2)

	let keys = Object.keys(pals) as (keyof typeof pals)[]
	const examplesDiv = createElement('div', { class: 'palette-examples' })

	keys.forEach((key) => {
		let example = `
			<palette-example palette='${JSON.stringify(pals[key])}' name='${key}' res='${resolution}'></palette-example>
		`
		examplesDiv.innerHTML += example
		console.log('adding example')
	})

	console.log('appending')
	container.appendChild(examplesDiv)
}

let el = document.querySelector<HTMLElement>('.palette-examples-list')
if (el) {
	makeExamples(el, palettes)
}

let toggleContexts = document.querySelector('.br-toggle-contexts')
if (toggleContexts) {
	toggleContexts.addEventListener('click', () => {
		document.body.classList.toggle('hide-contexts')
	})
}
