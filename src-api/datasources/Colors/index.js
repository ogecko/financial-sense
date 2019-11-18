const { hex_to_cam16_ucs } = require('./cam16')

// Read in all the colornames and append the CAM16 values
const colornames = require('./colornames').map(({ name, hex }) => ({ name, hex, ...hex_to_cam16_ucs(hex) }))
const isMatch = (e, needle) => e.name.toLowerCase().indexOf(needle.toLowerCase()) > -1

// lighten, darken, saturate, desaturate, rotate

class Colors {
    constructor() {
      this.colornames = colornames;
    }

    // find an Arrray of colors by partial name match
    findByName (needle, limit=10, sort = "M", decr = true) {
        if (! /(J|M|h|s|C|Q|Ju|Mu)/.test(sort)) {
            throw new Error(
                'color find by name sort field must be J, M, h, s, C, Q, Ju or Mu.');
        }
        return this.colornames
            .filter(e => isMatch(e, needle))
            .sort((x, y) => decr ? y[sort] - x[sort] : x[sort] - y[sort])
            .slice(0, limit)
    }

    // find a color by matching hex code, returns null if no named color matches
    findByHex (hex) {
        const directMatch = this.colornames.filter(e => e.hex.toLowerCase() == hex.toLowerCase())
        return (directMatch.length > 0) ? directMatch[0] : null
    }

    // find a named color with peak M colorfulness for a given h hue (ensuring a selection from at least 30)
    findPeakColorByHue(h, delta=0.5, debug=false) {
        const results = colornames
            .filter(x => h - delta < x.h && x.h < h + delta)
            .sort((x, y)=> y.M - x.M)
            if (debug) console.log(`${h}, ${delta}, ${results.length}, ${results[0].M}, ${results[0].J}, ${results[0].hex}, ${results[0].name}`)
            return (results.length > 30) ? results[0] : this.findPeakColorByHue(h, delta*2, debug)
    }


    lighterColors (hex, limit=10) {
        const base_color = hex_to_cam16_ucs(hex)
        const results = colornames
            .filter(x => h - delta < x.h && x.h < h + delta)
            .sort((x, y)=> y.M - x.M)

    }
}

module.exports = Colors;

// const color = process.argv[2] || '#FF0000'
// console.log('input hex', color)
// console.log('input RGB', hex_to_srgb(color))
// console.log('input XYZ', srgb_to_xyz(hex_to_srgb(color)))
// const cam16 = hex_to_cam16_ucs(color)
// // const cam16 = { J: 98, M: 2, h: 209}
// console.log('cam16', cam16)
// console.log('output XYZ',JMh_to_xyz(cam16))
// console.log('output RGB',xyz_to_srgb(JMh_to_xyz(cam16)))
// console.log('output hex', JMh_to_hex(cam16))

// const colornames = []

// for (var R=0; R<256; R++) {
//     for (var G=0; G<256; G++) {
//         for (var B=0; B<256; B++) {
//             const hex1 = '#' + (1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1)
//             colornames.push({ hex1, ...hex_to_cam16_ucs(hex1) })
//         }
//     }
// }



// find the max colorfulness (and implied lightness) for a given hue
// const results = colornames.filter(x => x.h<120 && x.h>119).sort((y,x)=> x.M - y.M)

// find a color by lightness
// const results = colornames.sort((x,y)=> x.J - y.J)

// find the closest named color based on JMh

// console.log(results[0], results[1], results[2])
// console.log('output hex', JMh_to_hex({J: 90.689  , M: 40, h: 119.7}))

