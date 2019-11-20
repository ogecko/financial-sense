import _ from 'lodash'

const lightness = c => c && c.J
const colorfulness = c => c && c.M
const maxValue = (arr, lensFn) => lensFn(_.maxBy(arr, lensFn))
const minValue = (arr, lensFn) => lensFn(_.minBy(arr, lensFn))
const deltaE = (J, M, c) => Math.sqrt((J - c.J) * (J - c.J) + (M - c.M) * (M - c.M))

export function layoutColors (colors) {
  const maxJ = maxValue(colors, lightness)
  const minJ = minValue(colors, lightness)
  const maxM = maxValue(colors, colorfulness)
  const minM = minValue(colors, colorfulness)
  const stepJ = (maxJ === minJ) ? 10 : (maxJ - minJ) / 10
  const stepM = (maxM === minM) ? 10 : (maxM - minM) / 10
  const results = []
  const remaining = _.filter(colors, c => true)
  for (var x = 0, M = minM; M <= maxM; x++, M += stepM) {
    for (var y = 0, J = maxJ; J >= minJ; y++, J -= stepJ) {
      const pick = _.chain(remaining)
        .map(c => ({ ...c, deltaE: deltaE(J, M, c) }))
        .sortBy(c => c.deltaE)
        .slice(0, 1)
        .map(c => ({ ...c, x, y }))
        .first()
        .value()
      if (pick) {
        _.remove(remaining, c => c.hex === pick.hex)
        results.push(pick)
      }
    }
  }
  return results
}
