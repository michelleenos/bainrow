export const notify = (message: string) => {
	const div = createElement('div', { class: 'notification' }, [message])
	document.body.appendChild(div)
	setTimeout(() => {
		div.remove()
	}, 2000)
}

export const createElement = (tag: string, attrs: { [key: string]: string } = {}, content: (string | HTMLElement)[] = []) => {
	const el = document.createElement(tag)
	Object.entries(attrs).forEach(([key, value]) => {
		el.setAttribute(key, value)
	})

	content.forEach((item) => (typeof item === 'string' ? (el.innerHTML += item) : el.appendChild(item)))

	return el
}

export const shuffle = <T>(array: T[]) => {
	let copy = array.slice()
	let currentIndex = copy.length
	let randomIndex

	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex)
		currentIndex -= 1
		;[copy[currentIndex], copy[randomIndex]] = [copy[randomIndex], copy[currentIndex]]
	}

	return copy
}

export type CanvasProps = {
	width: number
	height: number
	res: number
}

export const adjustCanvas = (ctx: CanvasRenderingContext2D, props: CanvasProps) => {
	const { width, height, res } = props
	ctx.canvas.width = width * res
	ctx.canvas.height = height * res
	ctx.canvas.style.width = `${width}px`
	ctx.canvas.style.height = `${height}px`
	ctx.scale(res, res)
}

export const getCanvas = (width: number, height: number, resolution: number) => {
	const canvas = document.createElement('canvas')
	canvas.width = width * resolution
	canvas.height = height * resolution
	canvas.style.width = `${width}px`
	canvas.style.height = `${height}px`

	const ctx = canvas.getContext('2d')!
	ctx.scale(resolution, resolution)

	return { canvas, ctx }
}

export const uniqueRandom = <T>(items: T[], count = 2) => {
	let shuffled = shuffle(items)
	let res: T[] = []
	for (let i = 0; i < count; i++) {
		res.push(shuffled[i % shuffled.length])
	}
	return res
}

export const combinations = (n: number, skip: [number, number][] = []) => {
	let arr1 = Array.from({ length: n + 1 }, (_, i) => i - 1)

	let res: [number, number][] = []
	arr1.forEach((a) => {
		arr1.forEach((b) => {
			if (a !== b && !skip.some(([x, y]) => x === a && y === b)) {
				res.push([a, b])
			}
		})
	})
	return res
}

export function random(): number
export function random(max: number): number
export function random(minOrMax: number, max: number): number
export function random<T>(array: T[]): T
export function random<T>(numOrArray?: number | T[], max?: number) {
	if (Array.isArray(numOrArray)) {
		return numOrArray[Math.floor(Math.random() * numOrArray.length)]
	}
	if (numOrArray === undefined) {
		return Math.random()
	}
	if (max === undefined) {
		return Math.random() * numOrArray
	}
	return Math.random() * (max - numOrArray) + numOrArray
}
