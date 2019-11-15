// 12 color palette adapted for color blindness (deuteranopia, protanopia, tritanopia)
const marone = 'hsl(341, 89%, 37%)'
const orange = 'hsl(14, 94%, 65%)'
const cream = 'hsl(40, 85%, 86%)'
const yellow = 'hsl(60, 86%, 57%)'
const mint = 'hsl(105, 92%, 75%)'
const green = 'hsl(148, 89%, 37%)'
const cyan = 'hsl(183, 83%, 47%)'
const teal = 'hsl(189, 100%, 25%)'
const blue = 'hsl(202, 100%, 49%)'
const indigo = 'hsl(213, 100%, 39%)'
const purple = 'hsl(287, 78%, 35%)'
const pink = 'hsl(300, 93%, 72%)'

const defaultPalette = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']
const blindnessPalette = [green, orange, marone, cream, mint, pink, purple, blue, indigo, cyan, yellow, teal, mint, '#d62728', '#9467bd', '#8c564b', '#7f7f7f', '#bcbd22']
export const color = {
  defaultPalette,
  blindnessPalette
}
// Register filter functions with Vue
export default ({ _, Vue }) => {
  Vue.prototype.$color = color
}
