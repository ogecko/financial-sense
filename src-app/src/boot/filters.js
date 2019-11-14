// Boot function to Install the Vue plugin and set the apolloProvider on the root component

function fmtusd (v) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD' }).format(v)
}

function fmtncs (v) {
  return new Intl.NumberFormat('en-GB', { notation: 'compact', compactDisplay: 'short' }).format(v)
}

function fmtn2d (v) {
  return new Intl.NumberFormat('en-GB', { maximumFractionDigits: 2 }).format(v)
}

export default ({ _, Vue }) => {
  Vue.filter('fmt_usd', fmtusd)
  Vue.filter('fmt_ncs', fmtncs)
  Vue.filter('fmt_n2d', fmtn2d)
}
