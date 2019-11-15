// 12 color palette adapted for color blindness (deuteranopia, protanopia, tritanopia)
const clrbMarone = 'hsl(341, 89%, 37%)'
const clrbOrange = 'hsl(14, 94%, 65%)'
const clrbCream = 'hsl(40, 85%, 86%)'
const clrbYellow = 'hsl(60, 86%, 57%)'
const clrbMint = 'hsl(105, 92%, 75%)'
const clrbGreen = 'hsl(148, 89%, 37%)'
const clrbCyan = 'hsl(183, 83%, 47%)'
const clrbTeal = 'hsl(189, 100%, 25%)'
const clrbBlue = 'hsl(202, 100%, 49%)'
const clrbIndigo = 'hsl(213, 100%, 39%)'
const clrbPurple = 'hsl(287, 78%, 35%)'
const clrbPink = 'hsl(300, 93%, 72%)'

// A nicer color palette for the web https://clrs.cc/
const clrsNavy = '#001f3f'
const clrsBlue = '#0074d9'
const clrsAqua = '#7fdbff'
const clrsTeal = '#39cccc'
const clrsOlive = '#3d9970'
const clrsGreen = '#2ecc40'
const clrsLime = '#01ff70'
const clrsYellow = '#ffdc00'
const clrsOrange = '#ff851b'
const clrsRed = '#ff4136'
const clrsMaroon = '#85144b'
const clrsFuchsia = '#f012be'
const clrsPurple = '#b10dc9'
const clrsBlack = '#111111'
const clrsGray = '#aaaaaa'
const clrsSilver = '#dddddd'

const defaultPalette = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf']
const clrbPalette = [clrbGreen, clrbOrange, clrbMarone, clrbCream, clrbMint, clrbPink, clrbPurple, clrbBlue, clrbIndigo, clrbCyan, clrbYellow, clrbTeal, clrbMint, '#d62728', '#9467bd', '#8c564b', '#7f7f7f']
const clrsPalette = [clrsNavy, clrsBlue, clrsAqua, clrsTeal, clrsOlive, clrsGreen, clrsLime, clrsYellow, clrsOrange, clrsRed, clrsMaroon, clrsFuchsia, clrsPurple, clrsBlack, clrsGray, clrsSilver]
const clraPalette = [clrsLime, clrsOrange, clrsRed, clrsMaroon, clrsPurple, clrsBlue, clrsAqua, clrsTeal, clrsGreen, clrsOlive, clrsYellow, clrsFuchsia, clrsBlack, clrsGray, clrsNavy, clrsSilver]

// const theme = {
//   page:
//   primary:
//   secondary:
//   tertiary:
//   quaternary:
//   quinary:
//   senary:
//   accent:
//   critical:
//   alert:
//   warning:
//   positive:
//   negative:
//   neutral:
//   scale:
// }

export const color = {
  defaultPalette,
  clrbPalette,
  clrsPalette,
  clraPalette
}
// Register filter functions with Vue
export default ({ _, Vue }) => {
  Vue.prototype.$color = color
}
