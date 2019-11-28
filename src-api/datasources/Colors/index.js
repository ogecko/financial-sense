const _ = require('lodash')

const { hex_to_cam16_ucs, hex_to_cam16, JMH_to_JuMuab, is_hex_code } = require('./cam16')

// Read in all the colornames and append the CAM16 values
const colornames = require('./colornames').map(({ name, hex }) => ({ name, hex, ...hex_to_cam16_ucs(hex) }))
const range = (start, stop, step = 1) => Array(Math.abs(Math.ceil((stop - start) / step))).fill(start).map((x, y) => x + y * step)
const lc = s => s.toLowerCase(s)
const c360 = h => (h + 360) % 360
const isCircularTopOnly = (hT, hB) => (hT.min && hT.max && !hB.min && !hB.max)
const isCircularBottomOnly = (hT, hB) => (!hT.min && !hT.max && hB.min && hB.max)
const isCircularRightOnly = (hT, hB) => (hB.min - hT.max) > (hT.min + 360 - hB.max)
const deltaE = (x, y) => Math.sqrt((x.Ju - y.Ju) * (x.Ju - y.Ju) + (x.a - y.a) * (x.a - y.a) + (x.b - y.b) * (x.b - y.b))
const EPSILON = 0.000001

// lighten, darken, saturate, desaturate, rotate

class Colors {
    constructor() {
        this.colornames = colornames;
    }

    // find an Arrray of colors by partial name match
    searchByName(needle, limit = 10, sort = "M", decr = true) {
        if (! /(J|M|h|s|C|Q|Ju|Mu)/.test(sort)) {
            throw new Error(
                'color find by name sort field must be J, M, h, s, C, Q, Ju or Mu.');
        }
        const isMatch = this.isColorMatchingQueryFn({ search: needle })
        return this.colornames
            .filter(isMatch)
            .sort((x, y) => decr ? y[sort] - x[sort] : x[sort] - y[sort])
            .slice(0, limit)
    }

    // find a single color by matching either hex code or color name, falling back to color hex code
    findByName(needle) {
        const directMatch = this.colornames.filter(e => lc(e.hex) == lc(needle) || lc(e.name) == lc(needle))
        return (directMatch.length > 0) ? directMatch[0]
            : is_hex_code(needle) ? { ...hex_to_cam16_ucs(needle), hex: needle, name: needle }
                : null
    }

    // find text colors that contrast with the color
    findTextColors(c) {
        const baseTextColor = (c.J > 50) ? '#000000' : '#FFFFFF'
        const start = 255, stop = 128
        const step = Math.ceil((stop - start) / 5)
        const result = range(start, stop, step).map(alpha => baseTextColor + alpha.toString(16))
        return result

        // Alternate implementation based on asjusting J
        // const startJ = (c.J > 50) ? 00 : 99
        // const stopJ = c.J
        // const stepJ = (stopJ - startJ)/5 
        // const result = range(startJ, stopJ, stepJ).map(J => JMh_to_hex({ J, M:0, h:c.h }))
        // return result
    }

    // find a named color with peak M colorfulness for a given h hue (ensuring a selection from at least 30)
    findPeakColorByHue(h, delta = 0.5, debug = false) {
        const results = colornames
            .filter(x => h - delta < x.h && x.h < h + delta)
            .sort((x, y) => y.M - x.M)
        if (debug) console.log(`${h}, ${delta}, ${results.length}, ${results[0].M}, ${results[0].J}, ${results[0].hex}, ${results[0].name}`)
        return (results.length > 30) ? results[0] : this.findPeakColorByHue(h, delta * 2, debug)
    }

    // Reducer function used to compute the maximum and minimum value of array. 
    linearMinMaxReducer(acc, x) {
        if (x > acc.max || !acc.max) acc.max = x
        if (x < acc.min || !acc.min) acc.min = x
        return acc
    }

    // Decider function to compute the maximum and minimum value of array of numbers depending on which quadrant. 
    circularMinMaxDecider(hT, hB) {
        return isCircularTopOnly(hT, hB) ? { min: hT.min, max: hT.max }
            : isCircularBottomOnly(hT, hB) ? { min: hB.min, max: hB.max }
                : isCircularRightOnly(hT, hB) ? { min: hB.min, max: hT.max }
                    : { min: hT.min, max: hB.max }
    }

    // Computes the maximum and minimum value of array of numbers between 0 and 360. 
    minMaxHues(hues) {
        const hT = hues.filter(x => x < 180).reduce(this.linearMinMaxReducer, {})
        const hB = hues.filter(x => x >= 180).reduce(this.linearMinMaxReducer, {})
        return this.circularMinMaxDecider(hT, hB)
    }

    // Conputes the maximum and minimum value around a mid point
    minMaxLinearDelta({ mid, delta }) {
        return { min: mid - delta, max: mid + delta }
    }

    // Conputes the maximum and minimum value around a mid point with numbers between 0 and 360
    minMaxCircularDelta({ mid, delta }) {
        return this.minMaxHues([c360(mid - delta), c360(mid), c360(mid + delta)])
    }

    // Conputes the maximum and minimum J, M and h of an Array of colors
    minMaxJMhColors(colors) {
        const J = colors.map(c => c.J).reduce(this.linearMinMaxReducer, {})
        const M = colors.map(c => c.M).reduce(this.linearMinMaxReducer, {})
        const h = this.minMaxHues(colors.map(c => c360(c.h)))
        return { J, M, h }
    }

    // checks if value is within a range defined by minimum and maximum (inclusive)
    isInsideLinearRange(x, q) {
        return (x >= q.min) && (x <= q.max + EPSILON)
    }

    // checks if value is within a range defined by minimum and maximum (inclusive and 0 to 360)
    isInsideCircularRange(x, q) {
        return (q.min <= q.max) ? this.isInsideLinearRange(x, q) : (x >= q.min) || (x <= q.max + EPSILON)
    }

    // Creates a function that can check if a color matches all the constraints of a query object. Can be used in Array.filter(fn)
    // 'J', 'M' or 'h' can be checked for values within a range (min to max) or (mid +/- delta)
    // 'search' can check for any name that includes the needle
    // 'name' can check for an exact match on the colors name or hex value
    isColorMatchingQueryFn({ J, M, h, search, name }) {
        const Jq = (J && J.mid && J.delta) ? this.minMaxLinearDelta(J) : J
        const Mq = (M && M.mid && M.delta) ? this.minMaxLinearDelta(M) : M
        const hq = (h && h.mid && h.delta) ? this.minMaxCircularDelta(h) : h
        const needle = (search) ? lc(search) : (name) ? lc(name) : null
        return c => !(
            ((Jq && Jq.min && Jq.max) && !this.isInsideLinearRange(c.J, Jq)) ||
            ((Mq && Mq.min && Mq.max) && !this.isInsideLinearRange(c.M, Mq)) ||
            ((hq && hq.min && hq.max) && !this.isInsideCircularRange(c.h, hq)) ||
            ((search) && !(lc(c.name).indexOf(needle) > -1)) ||
            ((name) && !(lc(c.name) === needle || lc(c.hex) === needle))
        )
    }

    // Creates an array of numbers progressing from start up to stop depending on 'step' | 'n' | 'rotate'. 
    // A 'step' defines how far apart each number is from the previous number, excludes the max value
    // An 'n' defines the how many numbers to return in the array, includes the max value
    // A 'rotate' is similar to step but returns 0-360 numbers. start can be 350 and stop 10 to rotate past 0'
    range({ start, stop, step, n, rotate }) {
        if (step) {
            n = Math.abs(Math.ceil((stop - start) / step))
        } else if (n) {
            step = (n > 1) ? (stop - start) / (n - 1) : 100
        } else if (rotate) {
            const span = (rotate > 0) ? c360(stop - start + 360) : c360(start - stop + 360)
            step = rotate
            n = Math.abs(Math.ceil(span / step))
        }
        return Array(n).fill(start).map((x, y) => x + y * step).map(x => rotate ? c360(x) : x)
    }

    // Recursively return an arrange of objects expanding any ranges of J, M or h
    // J can define an absolute value or a range object with min, max, step | n
    // M can define an absolute value or a range object with min, max, step | n
    // h can define an absolute value or a range object with min, max, rotate
    rangeOfJMh({ J, M, h }) {
        return _.isObject(M) ? this.range(M).map(M => this.rangeOfJMh({ J, M, h }))
            : _.isObject(J) ? this.range(J).map(J => this.rangeOfJMh({ J, M, h }))
                : _.isObject(h) ? this.range(h).map(h => this.rangeOfJMh({ J, M, h }))
                    : { J, M, h }
    }

    // Pick the closest named color to the given J, M, h
    pickColor({ J, M, h }, delta = 1) {
        const c1 = JMH_to_JuMuab({ J, M, h })                // convert target to uniform color space
        const isMatch = this.isColorMatchingQueryFn({ J: { mid: J, delta }, M: { mid: M, delta }, h: { mid: h, delta } })
        const candidates = this.colornames
            .filter(isMatch)                                // filter to colors around the target space
            .map(c2 => ({ ...c2, deltaE: deltaE(c1, c2) })) // calculate DeltaE for each candidate
            .sort((x, y) => x.deltaE - y.deltaE)            // sort by increasing DeltaE
        return (candidates.length > 0) ? candidates[0] : this.pickColor({ J, M, h }, delta * 2)
    }

    // Return an Array of unique colors, expanding any ranges for J, M or h
    rangeOfColors({ J, M, h }) {
        const colors = this.rangeOfJMh({ J, M, h }).map(c => this.pickColor(c))
        return _.uniqBy(colors, c => c.hex).slice(1)
    }

    lighterColors(hex, limit = 10) {
        const { J, M, h } = hex_to_cam16(hex)
        return this.rangeOfColors({ J: { start: J, stop: J+20, n: limit }, M, h })
    }

    darkerColors(hex, limit = 10) {
        const { J, M, h } = hex_to_cam16(hex)
        return this.rangeOfColors({ J: { start: J, stop: J-20, n: limit }, M, h })
    }

    strongerColors(hex, limit = 10) {
        const { J, M, h } = hex_to_cam16(hex)
        return this.rangeOfColors({ J, M: { start: M, stop: M+20, n: limit }, h })
    }

    weakerColors(hex, limit = 10) {
        const { J, M, h } = hex_to_cam16(hex)
        return this.rangeOfColors({ J, M: { start: M, stop: M-20, n: limit }, h })
    }

    warmerColors(hex, limit = 10) {
        const { J, M, h } = hex_to_cam16(hex)
        const rotate = (J < 180) ? +5 : -5
        return this.rangeOfColors({ J, M, h: { start: h, stop: c360(h + (limit-1)*rotate), rotate } })
    }

    coolerColors(hex, limit = 10) {
        const { J, M, h } = hex_to_cam16(hex)
        const rotate = (J < 180) ? -5 : +5
        return this.rangeOfColors({ J, M, h: { start: h, stop: c360(h + (limit-1)*rotate), rotate } })
    }

    triadicColors(hex, limit = 10) {
        const { J, M, h } = hex_to_cam16(hex)
        return _.concat(
            this.rangeOfColors({ J: { start: J-20, stop: J+21, step: 9 }, M, h: c360(h - 120) }),
            this.rangeOfColors({ J: { start: J-20, stop: J+21, step: 12 }, M, h }),
            this.rangeOfColors({ J: { start: J-20, stop: J+21, step: 9 }, M, h: c360(h + 120) }),
        )
    }

    tetradicColors(hex, limit = 10) {
        const { J, M, h } = hex_to_cam16(hex)
        return _.concat(
            this.rangeOfColors({ J: { start: J-20, stop: J+21, step: 9 }, M, h: c360(h - 90) }),
            this.rangeOfColors({ J: { start: J-20, stop: J+21, step: 12 }, M, h: c360(h - 180) }),
            this.rangeOfColors({ J: { start: J-20, stop: J+21, step: 9 }, M, h: c360(h + 90) }),
        )
    }

}

module.exports = Colors;

