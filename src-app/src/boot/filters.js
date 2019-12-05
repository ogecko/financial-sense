import { date } from 'quasar'

// Boot function to register a bunch of Vue filters for number formatting

// Internationalisation Number Format functions
const i18nusd = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'USD' })
const i18nncs = new Intl.NumberFormat('en-GB', { notation: 'compact', compactDisplay: 'short' })
const i18nn2d = new Intl.NumberFormat('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
const i18nn1d = new Intl.NumberFormat('en-GB', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const i18nn0d = new Intl.NumberFormat('en-GB', { minimumFractionDigits: 0, maximumFractionDigits: 0 })

// Filter functions to convert Number to a string and hide NaN
const fmtusd = v => i18nusd.format(v)
const fmtncs = v => isNaN(v) ? null : i18nncs.format(v)
const fmtn2d = v => isNaN(v) ? null : i18nn2d.format(v)
const fmtn1d = v => isNaN(v) ? null : i18nn1d.format(v)
const fmtn0d = v => isNaN(v) ? null : i18nn0d.format(v)
const fmtarr = v => Array.isArray(v) ? v.join(', ') : v
const fmtago = v => {
  const d = Date.parse(v)
  const n = Date.now()
  const hours = date.getDateDiff(n, d, 'hours')
  const days = date.getDateDiff(n, d, 'days')
  const weeks = date.getDateDiff(n, d, 'weeks')
  const months = date.getDateDiff(n, d, 'months')
  const years = date.getDateDiff(n, d, 'years')
  return (hours < 48) ? `${hours} hours ago`
    : (days < 14) ? `${days} days ago`
      : (weeks < 8) ? `${weeks} weeks ago`
        : (months < 24) ? `${months} months ago`
          : `${years} years ago`
}

// Register filter functions with Vue
export default ({ _, Vue }) => {
  Vue.filter('fmt_usd', fmtusd)
  Vue.filter('fmt_ncs', fmtncs)
  Vue.filter('fmt_n2d', fmtn2d)
  Vue.filter('fmt_n1d', fmtn1d)
  Vue.filter('fmt_n0d', fmtn0d)
  Vue.filter('fmt_arr', fmtarr)
  Vue.filter('fmt_ago', fmtago)
}
