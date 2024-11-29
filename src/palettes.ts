// prettier-ignore
export type RoyGBiv = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet' | 'teal' | 'pink' | 'purple' | 'gray' | 'brown'

export type PaletteContext = {
	bg?: string
	stroke?: string
}

export type PalettePairOptions = {
	lights: string[]
	darks: string[]
}

export type Palette = {
	colors: string[]
	name: string
	tags?: string[]
	shades?: RoyGBiv[]
	contexts?: PaletteContext[]
	pairs?: {
		lights: string[]
		darks: string[]
		add?: [string, string][]
	}
}

const paletteDefs = {
	island: {
		colors: ['#020887', '#334195', '#00635D', '#ff715b', '#77cf63'],
		tags: ['bright', 'dark', 'ocean'],
		shades: ['blue', 'green', 'orange'],
		name: 'island',
		contexts: [
			{ bg: '#020887', stroke: '#fafafa' },
			{ bg: '#020887', stroke: '#ff715b' },
			{ bg: '#334195', stroke: '#020887' },
			{ bg: '#00635D', stroke: '#77cf63' },
			{ bg: '#77cf63', stroke: '#00635D' },
		],
		pairs: {
			lights: ['#77cf63'],
			darks: ['#020887', '#00635D'],
			add: [['#77cf63', '#00635D']],
		},
	},
	island2: {
		name: 'island2',
		colors: ['#fc440f', '#b4e33d', '#03d394', '#a29fb3', '#1f01b9'],
		shades: ['orange', 'green', 'blue', 'gray'],
		contexts: [
			{ bg: '#1f01b9', stroke: '#b4e33d' },
			{ bg: '#03d394', stroke: '#1f01b9' },
		],
		pairs: {
			lights: ['#b4e33d', '#a29fb3', '#03d394'],
			darks: ['#1f01b9'],
		},
	},
	toyish: {
		name: 'toyish',
		colors: ['#f75c03', '#d90368', '#e5beed', '#820263', '#291720', '#04a777'],
		tags: ['bright'],
		shades: ['orange', 'pink', 'green', 'purple'],
		contexts: [
			{ bg: '#e5beed', stroke: '#291720' },
			{ bg: '#291720', stroke: '#e5beed' },
		],
		pairs: {
			lights: ['#e5beed'],
			darks: ['#820263', '#291720'],
			add: [['#04a777', '#291720']],
		},
	},
	toyish2: {
		name: 'toyish2',
		colors: ['#d90368', '#e5beed', '#820263', '#04a777'],
		tags: ['bright'],
		shades: ['pink', 'green', 'purple'],
		contexts: [
			{ bg: '#e5beed', stroke: '#291720' },
			{ bg: '#291720', stroke: '#e5beed' },
		],
		pairs: {
			lights: ['#e5beed'],
			darks: ['#820263', '#04a777', '#d90368'],
		},
	},

	solarFlair: {
		name: 'solarFlair',
		colors: ['#f9c80e', '#f86624', '#ea3546', '#662e9b', '#43bccd', '#232020'],
		tags: ['bright', 'rainbow'],
		shades: ['yellow', 'red', 'purple', 'blue'],
		contexts: [
			{ bg: '#fff8de', stroke: '#232020' },
			{ bg: '#662e9b', stroke: '#fff8de' },
		],
		pairs: {
			lights: ['#43bccd'],
			darks: ['#662e9b', '#232020'],

			add: [
				['#f9c80e', '#ea3546'],
				['#43bccd', '#f9c80e'],
			],
		},
	},
	solarFlairL: {
		name: 'solarFlairL',
		colors: ['#f9c80e', '#f86624', '#ea3546', '#662e9b', '#43bccd'],
		tags: ['bright', 'rainbow'],
		shades: ['yellow', 'red', 'purple', 'blue'],
		contexts: [
			{ bg: '#fff8de', stroke: '#232020' },
			{ bg: '#662e9b', stroke: '#fff8de' },
		],
		pairs: {
			lights: ['#43bccd', '#f9c80e'],
			darks: ['#662e9b'],
			add: [
				['#f9c80e', '#ea3546'],
				['#f9c80e', '#f86624'],
			],
		},
	},
	rebo: {
		name: 'rebo',
		colors: ['#d7263d', '#f46036', '#2e294e', '#1b998b', '#c5d86d'],
		tags: ['contrast', 'bright'],
		shades: ['red', 'green', 'teal', 'orange'],
		contexts: [
			{ stroke: '#2e294e', bg: '#c5d86d' },
			{ bg: '#2e294e', stroke: '#1b998b' },
			{ bg: '#1b998b', stroke: '#c5d86d' },
		],
		pairs: {
			lights: ['#1b998b', '#c5d86d', '#f46036'],
			darks: ['#2e294e', '#d7263d'],

			add: [['#1b998b', '#c5d86d']],
		},
	},
	twi: {
		name: 'twi',
		colors: ['#861657', '#a64253', '#d56aa0', '#247ba0', '#011638'],
		shades: ['red', 'blue'],
		tags: ['dark', 'twilight', 'jewelTones'],
		contexts: [
			{ bg: '#011638', stroke: '#a64253' },
			{ bg: '#a64253', stroke: '#011638' },
		],
		pairs: {
			lights: ['#247ba0', '#d56aa0'],
			darks: ['#861657', '#011638'],

			add: [['#011638', '#a64253']],
		},
	},
	livingRoom: {
		name: 'livingRoom',
		colors: ['#241e4e', '#960200', '#ce6c47', '#00635D', '#7a4656'],
		tags: ['dark', 'elegant'],
		shades: ['red', 'green', 'blue', 'brown'],
		contexts: [
			{ bg: '#241e4e', stroke: '#e4c0b3' },
			{ bg: '#00635D', stroke: '#241e4e' },
			{ bg: '#e4c0b3', stroke: '#241e4e' },
			{ bg: '#960200', stroke: '#e4c0b3' },
		],
		pairs: {
			lights: ['#ce6c47', '#e4c0b3'],
			darks: ['#241e4e', '#00635D', '#960200', '#7a4656'],
		},
	},
	valen: {
		name: 'valen',
		colors: ['#bba0ca', '#fff8e8', '#fcd581', '#d52941', '#990d35', '#a40e4c', '#091540'],
		tags: ['valentine', 'romantic'],
		shades: ['pink', 'red', 'purple'],
		contexts: [
			{ bg: '#fff8e8', stroke: '#091540' },
			{ bg: '#990d35', stroke: '#fff8e8' },
			{ bg: '#091540', stroke: '#fcd581' },
			{ bg: '#fcd581', stroke: '#990d35' },
			{ bg: '#091540', stroke: '#bba0ca' },
			{ bg: '#bba0ca', stroke: '#fff8e8' },
		],
		pairs: {
			lights: [],
			darks: [],

			add: [
				['#091540', '#bba0ca'],
				['#091540', '#fcd581'],
				['#fff8e8', '#bba0ca'],
				['#fff8e8', '#990d35'],
				['#fcd581', '#990d35'],
				['#a40e4c', '#fcd581'],
				['#a40e4c', '#bba0ca'],
			],
		},
	},
	valenLess: {
		name: 'valenLess',
		colors: ['#bba0ca', '#fcd581', '#d52941', '#990d35'],
		tags: ['valentine', 'romantic'],
		shades: ['red', 'purple'],
		contexts: [
			{ bg: '#fff8e8', stroke: '#091540' },
			{ bg: '#990d35', stroke: '#091540' },
		],
	},
	earthGem1: {
		name: 'earthGem1',
		colors: ['#87425d', '#3c2e6b', '#0081af', '#a7d6c3', '#285943', '#8a8fbd', '#9a79b8', '#fcee49'],
		tags: ['jewelTones', 'earthy'],
		shades: ['purple', 'green', 'orange', 'pink'],
		contexts: [
			{ bg: '#3c2e6b', stroke: '#a7d6c3' },
			{ bg: '#0081af', stroke: '#3c2e6b' },
			{ bg: '#87425d', stroke: '#3c2e6b' },
			{ bg: '#285943', stroke: '#a7d6c3' },
		],
		pairs: {
			lights: ['#a7d6c3', '#8a8fbd'],
			darks: ['#87425d', '#3c2e6b', '#285943', '#0081af'],

			add: [
				['#fcee49', '#9a79b8'],
				['#fcee49', '#87425d'],
			],
		},
	},
	earthGem2: {
		name: 'earthGem2',
		colors: ['#874286', '#856596', '#f9c8ce', '#a8d7a8', '#b6cccc', '#8aadbc', '#7a7eb8', '#fc814a'],
		tags: ['jewelTones', 'earthy'],
		shades: ['purple', 'green', 'yellow'],
		contexts: [
			{ bg: '#7a7eb8', stroke: '#f9c8ce' },
			{ bg: '#874286', stroke: '#fc814a' },
			{ bg: '#874286', stroke: '#7a7eb8' },
			{ bg: '#b6cccc', stroke: '#874286' },
		],
		pairs: {
			lights: ['#f9c8ce', '#a8d7a8', '#b6cccc'],
			darks: ['#874286', '#856596', '#fc814a', '#7a7eb8'],
		},
	},
	mondri: {
		name: 'mondri',
		colors: ['#080708', '#3772ff', '#df2935', '#fdca40', '#e6e8e6'],
		tags: ['primary', 'bright'],
		shades: ['red', 'blue', 'yellow'],
		contexts: [
			{ bg: '#e6e8e6', stroke: '#080708' },
			{ bg: '#fdca40', stroke: '#080708' },
			{ bg: '#fdca40', stroke: '#e6e8e6' },
		],
		pairs: {
			lights: ['#fdca40', '#3772ff', '#e6e8e6'],
			darks: ['#080708', '#df2935'],
		},
	},
	mondriPlus: {
		name: 'mondriPlus',
		colors: ['#080708', '#3772ff', '#df2935', '#3ef071', '#fdca40', '#e6e8e6'],
		tags: ['primary', 'bright'],
		shades: ['red', 'blue', 'yellow', 'green'],
		contexts: [{ bg: '#e6e8e6', stroke: '#080708' }],
		pairs: {
			lights: ['#fdca40', '#3772ff', '#e6e8e6'],
			darks: ['#df2935', '#3ef071'],
		},
	},
	mondriMinus1: {
		name: 'mondriMinus1',
		colors: ['#3772ff', '#df2935', '#fdca40', '#e6e8e6'],
		tags: ['primary', 'bright'],
		shades: ['red', 'blue', 'yellow'],
		contexts: [
			{ bg: '#e6e8e6', stroke: '#080708' },
			{ bg: '#fdca40', stroke: '#080708' },
			{ bg: '#fdca40', stroke: '#e6e8e6' },
			{ bg: '#3772ff', stroke: '#fdca40' },
		],
	},
	mondriMinus2: {
		name: 'mondriMinus2',
		colors: ['#3772ff', '#df2935', '#fdca40'],
		tags: ['primary', 'bright'],
		shades: ['red', 'blue', 'yellow'],
		contexts: [
			{ bg: '#e6e8e6', stroke: '#080708' },
			{ bg: '#fdca40', stroke: '#080708' },
			{ bg: '#fdca40', stroke: '#e6e8e6' },
			{ bg: '#3772ff', stroke: '#fdca40' },
		],
	},
	brain: {
		name: 'brain',
		colors: ['#533a71', '#454a96', '#6184d8', '#50c5b7', '#9cec5b', '#f0f465', '#ff4a1c', '#ed254e'],
		tags: ['rainbow', 'bright', 'light'],
		shades: ['red', 'blue', 'green', 'yellow', 'purple', 'blue', 'orange'],
		contexts: [
			{ bg: '#50c5b7', stroke: '#533a71' },
			{ bg: '#6184d8', stroke: '#533a71' },
			{ bg: '#f0f465', stroke: '#533a71' },
			{ bg: '#533a71', stroke: '#50c5b7' },
			{ bg: '#fff7e5', stroke: '#454a96' },
			{ bg: '#454a96', stroke: '#fff7e5' },
		],
		pairs: {
			lights: ['#50c5b7', '#9cec5b', '#f0f465', '#6184d8'],
			darks: ['#533a71', '#454a96', '#ff4a1c', '#ed254e'],
		},
	},
	neopolito: {
		name: 'neopolito',
		colors: ['#f5ffff', '#25ced1', '#2c4251', '#f17300', '#b288c0'],
		tags: ['icecream'],
		shades: ['orange', 'purple', 'teal'],
		contexts: [
			{ bg: '#f5ffff', stroke: '#2c4251' },
			{ bg: '#2c4251', stroke: '#f5ffff' },
			{ bg: '#b288c0', stroke: '#2c4251' },
		],
		pairs: {
			lights: ['#25ced1', '#b288c0', '#f5ffff'],
			darks: ['#2c4251', '#f17300'],
			add: [
				['#f5ffff', '#b288c0'],
				['#25ced1', '#b288c0'],
				['#25ced1', '#f5ffff'],
				['#2c4251', '#f17300'],
			],
		},
	},
	autmn: {
		name: 'autmn',
		colors: ['#dc5132', '#a46589', '#7a82b8', '#8ad0a6', '#c4f0a8', '#a0bb07', '#ffcf33', '#ec9f05'],
		tags: ['muted', 'autumn', 'fall'],
		shades: ['purple', 'orange', 'yellow', 'teal'],
		contexts: [
			{ bg: '#a46589', stroke: '#352c62' },
			{ bg: '#352c62', stroke: '#7a82b8' },
		],
		pairs: {
			lights: ['#8ad0a6', '#c4f0a8', '#ffcf33'],
			darks: ['#dc5132', '#a46589', '#7a82b8', '#a0bb07', '#ec9f05'],
			add: [
				['#dc5132', '#a0bb07'],
				['#ffcf33', '#a0bb07'],
			],
		},
	},
	ambry: {
		name: 'ambry',
		colors: ['#fcab30', '#ff626a', '#4C1E4F', '#496ddb', '#FFC4EB'],
		tags: ['bright', 'contrast'],
		shades: ['yellow', 'purple', 'blue'],
		contexts: [{ bg: '#fcab30', stroke: '#4C1E4F' }],
		pairs: {
			lights: ['#fcab30', '#FFC4EB'],
			darks: ['#ff626a', '#496ddb', '#4C1E4F'],
			add: [
				['#496ddb', '#4C1E4F'],
				['#496ddb', '#ff626a'],
			],
		},
	},
	natura: {
		name: 'natura',
		colors: ['#99dfff', '#60ebca', '#c4f5ed', '#b8ccfc', '#04996d', '#4467ab'],
		tags: ['nature', 'water', 'sky'],
		shades: ['blue', 'green', 'teal'],
		contexts: [
			{ bg: '#c4f5ed', stroke: '#04996d' },
			{ bg: '#60ebca', stroke: '#4467ab' },
			{ bg: '#04996d', stroke: '#c4f5ed' },
		],
		pairs: {
			lights: ['#99dfff', '#c4f5ed', '#b8ccfc', '#60ebca'],
			darks: ['#04996d', '#4467ab'],
			add: [['#99dfff', '#60ebca']],
		},
	},
} satisfies { [key: string]: Palette }
// about TS satisfies operator: https://stackoverflow.com/questions/70956050/how-do-i-declare-object-value-type-without-declaring-key-type

let palettesArray: Palette[] | null = null
let colorPairs: [string, string][] | null = null
export const getPalettesArray: () => Palette[] = () => {
	if (palettesArray) return palettesArray
	let keys = Object.keys(paletteDefs) as (keyof typeof paletteDefs)[]
	palettesArray = keys.map((key) => paletteDefs[key])
	return palettesArray
}

export const getColorPairs = () => {
	if (colorPairs) return colorPairs

	let pairsSet = new Set<string>()
	let pairs: [string, string][] = []
	let keys = Object.keys(palettes) as (keyof typeof palettes)[]

	const checkOrAdd = (c1: string, c2: string) => {
		if (pairsSet.has(`${c1}-${c2}`.toLowerCase()) || pairsSet.has(`${c2}-${c1}`.toLowerCase())) return true
		pairsSet.add(`${c1}-${c2}`.toLowerCase())
		return false
	}

	keys.forEach((key) => {
		let palette = palettes[key]
		if (palette.pairs) {
			let { lights, darks, add } = palette.pairs
			lights.forEach((light) => {
				darks.forEach((dark) => {
					if (checkOrAdd(light, dark)) return
					pairs.push([light, dark])
				})
			})
			add?.forEach((pair) => {
				if (checkOrAdd(pair[0], pair[1])) return
				pairs.push(pair)
			})
		}
	})
	colorPairs = [...pairs]
	return colorPairs
}

export const palettes = paletteDefs as { [key in keyof typeof paletteDefs]: Palette }
