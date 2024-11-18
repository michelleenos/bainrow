export class TrueFalseBtn extends HTMLElement {
	label?: HTMLElement
	input?: HTMLInputElement

	static get observedAttributes() {
		return ['text-while-true', 'text-while-false', 'value']
	}

	constructor() {
		super()
	}

	get value() {
		return this.getAttribute('value') as 'true' | 'false'
	}

	get trueText() {
		return this.getAttribute('text-while-true') || 'Falsify'
	}

	get falseText() {
		return this.getAttribute('text-while-false') || 'Trueify'
	}

	set value(val: 'true' | 'false') {
		this.setAttribute('value', val)
	}

	connectedCallback() {
		if (this.childElementCount > 0) return
		this.createEls()
	}

	createEls = () => {
		let labelOuter = document.createElement('label')
		this.input = document.createElement('input')
		this.label = document.createElement('span')
		this.input.setAttribute('type', 'checkbox')
		this.input.checked = this.value === 'true'
		this.label.textContent = this.value === 'true' ? this.trueText : this.falseText
		labelOuter.append(this.input, this.label)

		this.input.addEventListener('change', () => {
			this.value = this.input!.checked ? 'true' : 'false'
		})
		this.appendChild(labelOuter)
	}

	check = () => {
		if (this.input) this.input.checked = true
		if (this.label) this.label.textContent = this.trueText
	}

	unCheck = () => {
		if (this.input) this.input.checked = false
		if (this.label) this.label.textContent = this.falseText
	}

	attributeChangedCallback(name: string, oldValue: string, newValue: string) {
		if (name === 'value') {
			if (!isTrueOrFalseString(newValue)) return
			newValue === 'true' ? this.check() : this.unCheck()
		}
	}
}

const isTrueOrFalseString = (val: string) => val === 'true' || val === 'false'

customElements.define('true-false-btn', TrueFalseBtn)
