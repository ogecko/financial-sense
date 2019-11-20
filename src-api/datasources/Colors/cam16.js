// CAM16 is a new Color Appearance Model which supersedes CIECAM02
// It overcomes problems with CIECAM02 and also improves performance and visual results.
// See https://arxiv.org/pdf/1802.06067.pdf Algorithmic improvements for the CIECAM02 and CAM16 color appearance models
// CAM16 - Object with CAM16 components J: lightness[0-100] , Q: brightness[0-198], C: chroma[0-113], M: colorfulness[0-100], s: saturation[0-86], h: hue angle [0-360]
// J - Lightness            Red(46),  Yellow(94),  Green(79),  Cyan(85),  Blue(25),  Magenta(55),  White(100), Black(0), Grey50%(43)
// Q - Brightness           Red(134), Yellow(192), Green(175), Cyan(182), Blue(99),  Magenta(146), White(198), Black(0), Grey50%(130) 
// h - Hue angle            Red(27),  Yellow(111), Green(142), Cyan(196), Blue(283), Magenta(335), White(209), Black(0), Grey50%(209)
// M - Colorfulness         Red(99),  Yellow(66),  Green(94),  Cyan(51),  Blue(76),  Magenta(94),  White(2),   Black(0), Grey50%(1.26)
// C - Chroma               Red(113), Yellow(75),  Green(107), Cyan(58),  Blue(87),  Magenta(107), White(2),   Black(0), Grey50%(1.44)
// S - Saturation           Red(86),  Yellow(59),  Green(73),  Cyan(53),  Blue(87),  Magenta(80),  White(10),  Black(0), Grey50%(9.8)

// CAM16 UCS Uniform Color Space is an attempt to improve perceptual uniformity 
// so that a simple Euclidean distance can be used as the basis of a color difference metric. 
// It consists of hue h; lightness Ju (adj for ucs), colorfulness Mu (adj for ucs)
// or polar coordinates a and b where a: magenta-teal, b: yellow-blue 
// CAM16UCS - Object with CAM16UCS components J: lightness[0-100], M: colorfulness[0-52], h: hue angle [0-360], a:  b:  }
// Ju - Lightness            Red(59), Yellow(97),  Green(87),  Cyan(91),  Blue(36),  Magenta(68),  White(100), Black(0)
// h - Hue angle            Red(27), Yellow(111), Green(142), Cyan(196), Blue(283), Magenta(335), White(209), Black(0)
// Mu - Colorfulness        Red(52), Yellow(40),  Green(50),  Cyan(34),  Blue(44),  Magenta(50),  White(2),   Black(0)

// Some key colors in CAM16 space
//  #ff0000	 Red                h030 - Highest Colorfulness 99, Brightness 46 
//  #ffbb22	 Incandescence      h081 - Lowest Colorfulness 50, Brightness 74 (deep yellow)
//  #fdff00	 Lemon Glacier      h111 - Colorfulness 66, Highest Brightness 94
//  #00ff00	 Green              h142 - Highest Colorfulness 94, Brightness 79 
//  #11cc55	 Battletoad         h149 - Colorfulness 67, Lowest Brightness 61 (slight blueish green)
//  #00ffee	 Master Sword Blue  h188 - Colorfulness 52, Highest Brightness 84 (turquoise)
//  #04d9ff	 Neon Blue          h218 - Lowest Colorfulness 48, Brightness 71 (cyan)
//  #0000ff	 Blue               h282 - Colorfulness 76, Lowest Brightness 25
//  #ff00ff	 Magenta            h335 - Highest Colorfulness 93, Highest Brightness 55

// Definition of Constants
const standard_whitepoints = ({
    A: [109.850, 100, 35.585],
    B: [99.090, 100, 85.324],
    C: [98.074, 100, 118.232],
    E: [100, 100, 100], // equal-energy illuminant
    D50: [96.422, 100, 82.521],
    D55: [95.682, 100, 92.149],
    D65: [95.047, 100, 108.883],
    D75: [94.972, 100, 122.638],
    F2: [99.186, 100, 67.393],
    F7: [95.041, 100, 108.747],
    F11: [100.962, 100, 64.350],
})
const EPSILON = 0.0001
const DEGREES = 180 / Math.PI
const RADIANS = Math.PI / 180

// Utility Functions
const lerp = (a, b, t) => (1 - t) * a + t * b // Linear interpolation
const isnumber = (obj) => Object.prototype.toString.call(obj) === '[object Number]'
const exists = (obj) => typeof obj !== "undefined" && obj !== null
const sgn = (x) => (x > 0) - (x < 0)
const mod = (a, b) => a - b * Math.floor(a / b)
const clip = (a, b, t) => Math.min(Math.max(t, a), b)
const degrees = (angle) => mod(angle * DEGREES, 360)
const radians = (angle) => mod(angle, 360) * RADIANS
const elem_mul = function elem_mul(v0, v1) {
    const n = v0.length, prod = new Array(n);
    for (let i = 0; i < n; i++) { prod[i] = v0[i] * v1[i]; }
    return prod;
}
const is_hex_code = s => /^#?[0-9a-fA-F]{6}$/.test(s)
const gamma = (x) => (x <= 0) ? 0 :
    (x > 0.0031308) * (1.055 * Math.pow(x, 0.4166666666666667) - 0.055) +
    (x <= 0.0031308) * 12.92 * x

const gamma_inverse = (x) => 
    (x > 0.04045) * Math.pow((x + 0.055) * 0.9478672985781991, 2.4) +
    (x <= 0.04045) * 0.07739938080495357 * x
// Given a list of knots and a target point, finds the subinterval
// in which the target point falls. Points outside the interval are 
// considered to be in the first or last interval.
binary_search = function binary_search(knots, target) {
    let n = knots.length - 1, low = 0, half;
    while ((half = (n / 2) | 0) > 0) {
        low += half * (knots[low + half] <= target);
        n -= half;
    }
    return low;
}
// const max_colorfulness = max_colorfulness({ J, h }) {
//     let low = 0, high = 60;
//     while ((half = (high-low)/2))
//         half_rgb = cam16_ucs_to_hex({ J, h, M: half })
        
//     return { J, h, M }
// }
const M16 = ([X, Y, Z]) => [
    + 0.401288 * X + 0.650173 * Y - 0.051461 * Z,
    - 0.250268 * X + 1.204414 * Y + 0.045854 * Z,
    - 0.002079 * X + 0.048952 * Y + 0.953127 * Z]
const M16_inv = ([R, G, B]) => [
    + 1.862067855087233e+0 * R - 1.011254630531685e+0 * G + 1.491867754444518e-1 * B,
    + 3.875265432361372e-1 * R + 6.214474419314753e-1 * G - 8.973985167612518e-3 * B,
    - 1.584149884933386e-2 * R - 3.412293802851557e-2 * G + 1.049964436877850e+0 * B]

// Parameters to the CAM16 model
const params = ({
    whitepoint: 'D65',
    adapting_luminance: 40,    // L_A
    background_luminance: 20,  // Y_b; relative to Y_w = 100
    surround: 'average',       // 'dark', 'dim', 'average', or a number from 0 to 2
    discounting: false
})

// Caluclate a bunch of constants based on the CAM16 parameters
const XYZ_w = standard_whitepoints[params.whitepoint] || params.whitepoint
const L_A = params.adapting_luminance
const Y_b = params.background_luminance
const Y_w = XYZ_w[1] // White point luminance
const surround = isnumber(params.surround)
    ? params.surround
    : ['dark', 'dim', 'average'].indexOf(params.surround)
const c = surround >= 1
    ? lerp(0.59, 0.69, surround - 1)
    : lerp(0.525, 0.59, surround)
const F = c >= 0.59
    ? lerp(0.9, 1.0, (c - 0.59) / .1)
    : lerp(0.8, 0.9, (c - 0.525) / 0.065)
const N_c = F
const k = 1 / (5 * L_A + 1)
const k4 = k * k * k * k;
const F_L = (k4 * L_A + 0.1 * (1 - k4) * (1 - k4) * Math.pow(5 * L_A, 1 / 3))  // Luminance adaptation factor
const F_L_4 = Math.pow(F_L, 0.25)
const n = Y_b / Y_w
const z = 1.48 + Math.sqrt(n) // Lightness non-linearity exponent (modified by `c`)
const N_bb = 0.725 * Math.pow(n, -0.2) // Chromatic induction factors
const N_cb = N_bb
const D = !params.discounting
    ? clip(0, 1, F * (1 - 1 / 3.6 * Math.exp((-L_A - 42) / 92)))
    : 1
const RGB_w = M16(XYZ_w) // Cone responses of the white point
const D_RGB = RGB_w.map(C_w => lerp(1, Y_w / C_w, D))
const D_RGB_inv = D_RGB.map(D_C => 1 / D_C)
const RGB_cw = [RGB_w[0] * D_RGB[0], RGB_w[1] * D_RGB[1], RGB_w[2] * D_RGB[2]]
const adapt = (component) => {
    const x = Math.pow(F_L * Math.abs(component) * 0.01, 0.42);
    return sgn(component) * 400 * x / (x + 27.13);
}
const exponent = 1 / 0.42
const constant = 100 / F_L * Math.pow(27.13, exponent);
const unadapt = component => {
    const cabs = Math.abs(component);
    return sgn(component) * constant * Math.pow(cabs / (400 - cabs), exponent);
}
const RGB_aw = RGB_cw.map(adapt)
const A_w = N_bb * (2 * RGB_aw[0] + RGB_aw[1] + 0.05 * RGB_aw[2])

////////////////////////////////////////////////////////////////////////////////////
//                   Forward Path CSS RGB Hex to CAM16 components                 //
////////////////////////////////////////////////////////////////////////////////////
// Convert CSS RGB Hex value to sRGB array
// hex - String RGB hex value #RRGGBB eg '#800000' = Maroon
// sRGB - Array[3 x 1] where R, G, B range from [0 to 1]
const hex_to_srgb = function hex_to_srgb(hex) {
    if (! is_hex_code(hex)) {
        throw new Error('Bad Input: Must be of form "666FAD" or "#DEFACE"');
    }
    const RGB = parseInt(hex.substr(-6), 16);
    return [
        (RGB >> 16) / 0xff,  // first byte  -> R
        (RGB >> 8 & 0xff) / 0xff,  // second byte -> G
        (RGB & 0xff) / 0xff]; // third byte  -> B
}
// Convert sRGB to XYZ tristimulus values
// sRGB - Array[3 x 1] where R, G, B range from [0 to 1]
// XYZ - Array[3 x 1] where XYZ tristimulus values (under standard illuminant D65, normalized so that the luminance of the display white is Yw = 100Y)
const srgb_to_xyz = function srgb_to_xyz([R, G, B]) {
    R = gamma_inverse(R), G = gamma_inverse(G), B = gamma_inverse(B);
    return [
        41.23865632529916 * R + 35.75914909206253 * G + 18.045049120356364 * B,
        21.26368216773238 * R + 71.51829818412506 * G + 7.218019648142546 * B,
        1.9330620152483982 * R + 11.919716364020843 * G + 95.03725870054352 * B
    ]
}
// Convert XYZ value to CAM16 components
// XYZ - Array[3 x 1] where XYZ tristimulus values (under standard illuminant D65, normalized so that the luminance of the display white is Yw = 100Y)
// CAM16 - Object with CAM16 components J: lightness[0-100] , Q: brightness[0-198], C: chroma[0-113], M: colorfulness[0-100], s: saturation[0-86], h: hue angle [0-360] }
const xyz_to_cam16 = function xyz_to_cam16(XYZ) {
    const
        [R_a, G_a, B_a] = elem_mul(M16(XYZ), D_RGB).map(adapt),
        a = R_a + (-12 * G_a + B_a) / 11,          // redness-greenness
        b = (R_a + G_a - 2 * B_a) / 9,             // yellowness-blueness
        h_rad = Math.atan2(b, a),                  // hue in radians
        h = degrees(h_rad),                        // hue in degrees
        e_t = 0.25 * (Math.cos(h_rad + 2) + 3.8),
        A = N_bb * (2 * R_a + G_a + 0.05 * B_a),
        J_root = Math.pow(A / A_w, 0.5 * c * z),
        J = 100 * J_root * J_root,                 // lightness
        Q = (4 / c * J_root * (A_w + 4) * F_L_4),  // brightness
        t = (5e4 / 13 * N_c * N_cb * e_t * Math.sqrt(a * a + b * b) /
            (R_a + G_a + 1.05 * B_a + 0.305)),
        alpha = Math.pow(t, 0.9) * Math.pow(1.64 - Math.pow(0.29, n), 0.73),
        C = alpha * J_root,                        // chroma
        M = C * F_L_4,                             // colorfulness
        s = 50 * Math.sqrt(c * alpha / (A_w + 4)); // saturation
    return { J, Q, C, M, s, h }
}
// Convert XYZ value to CAM16 Uniform Color Space components
// XYZ - Array[3 x 1] where XYZ tristimulus values (under standard illuminant D65, normalized so that the luminance of the display white is Yw = 100Y)
// CAM16UCS - Object with CAM16 components Ju: lightness , Mu: colorfulness, a: magenta-teal, b: yellow-blue }
const xyz_to_cam16_ucs = function xyz_to_cam16_ucs(XYZ) {
    let { J, Q, C, M, s, h } = xyz_to_cam16(XYZ), h_rad = radians(h);
    Mu = Math.log(1 + 0.0228 * M) / 0.0228;
    return {
        J, Q, C, M, s, h,
        Ju: 1.7 * J / (1 + 0.007 * J),
        Mu,
        a: Mu * Math.cos(h_rad),
        b: Mu * Math.sin(h_rad)
    };
}
// Convert CSS RGB Hex value to CAM16 components
// hex - String RGB hex value #RRGGBB eg '#800000' = Maroon
// CAM16 - Object with CAM16 components J: lightness , Q: brightness, C: chroma, M: colorfulness, s: saturation, h: hue angle [0-360] }
const hex_to_cam16 = function hex_to_cam16(hex) {
    const XYZ = srgb_to_xyz(hex_to_srgb(hex))
    return xyz_to_cam16(XYZ)
}
// Convert CSS RGB Hex value to CAM16 Uniform Color Space components
// hex - String RGB hex value #RRGGBB eg '#800000' = Maroon
// CAM16UCS - Object with CAM16 components Ju: lightness , Mu: colorfulness, a: magenta-teal, b: yellow-blue }
const hex_to_cam16_ucs = function hex_to_cam16_ucs(hex) {
    const XYZ = srgb_to_xyz(hex_to_srgb(hex))
    return xyz_to_cam16_ucs(XYZ)
}


////////////////////////////////////////////////////////////////////////////////////
//                   Inverse Path CAM16 components to RGB hex value               //
////////////////////////////////////////////////////////////////////////////////////
// Convert CAM16 components to XYZ
// CAM16 - Object with CAM16 components J or Q, M or C or s, and h
// XYZ - Array[3 x 1] where XYZ tristimulus values (under standard illuminant D65, normalized so that the luminance of the display white is Yw = 100Y)
const cam16_to_xyz = function cam16_to_xyz({ Q, M, J, C, s, h }) {
    if (!(exists(h) && (exists(J) + exists(Q) == 1) &&
        (exists(M) + exists(C) + exists(s) == 1))) {
        throw new Error('Need exactly need exactly one of each of ' +
            '{J, Q}, {M, C, s}, {h} as model inputs');
    }
    if ((J == 0) || (Q == 0)) return [0, 0, 0];
    const
        h_rad = radians(h),
        cos_h = Math.cos(h_rad),
        sin_h = Math.sin(h_rad),
        J_root = Math.sqrt(J) * 0.1 || 0.25 * c * Q / ((A_w + 4) * F_L_4),
        alpha = (s == null) ? (C || (M / F_L_4) || 0) / J_root
            : 0.0004 * s * s * (A_w + 4) / c,
        t = Math.pow(alpha * Math.pow(1.64 - Math.pow(0.29, n), -0.73), 10 / 9),
        e_t = 0.25 * (Math.cos(h_rad + 2) + 3.8),
        A = A_w * Math.pow(J_root, 2 / c / z),
        p_1 = 5e4 / 13 * N_c * N_cb * e_t,
        p_2 = A / N_bb,
        r = 23 * (p_2 + 0.305) * t / (23 * p_1 + t * (11 * cos_h + 108 * sin_h)),
        a = r * cos_h,
        b = r * sin_h,
        denom = 1 / 1403,
        RGB_c = [(460 * p_2 + 451 * a + 288 * b) * denom,
        (460 * p_2 - 891 * a - 261 * b) * denom,
        (460 * p_2 - 220 * a - 6300 * b) * denom].map(unadapt),
        XYZ = M16_inv(elem_mul(RGB_c, D_RGB_inv));
    return XYZ;
}
// Convert CAM16 Uniform Color Space components to XYZ tristimulus values
// CAM16UCS - Object with CAM16UCS components J: lightness[0-100] , Q: brightness[0-197], C: chroma[0-], M: colorfulness, s: saturation, h: hue angle [0-360] }
// XYZ - Array[3 x 1] where XYZ tristimulus values (under standard illuminant D65, normalized so that the luminance of the display white is Yw = 100Y)
const cam16_ucs_to_xyz = function cam16_ucs_to_xyz({ Ju, Mu, h, a, b }) {
    const ab = exists(a) && exists(b), Mh = exists(Mu) && exists(h);
    if (ab ^ Mh == 0) {
        throw new Error(
            'Either {a, b} or {Mu, h} (but not both pairs) are required inputs.');
    }
    if (ab) {
        Mu = sqrt(a * a + b * b);
        h = degrees(Math.atan2(b, a));
    }
    const M = (Math.exp(Mu * 0.0228) - 1) / 0.0228;
    const J = Ju / (1.7 - 0.007 * Ju);
    return cam16_to_xyz({ J, M, h });
}
// Convert XYZ to sRGB (standard Red Green Blue) CRT color space
// XYZ - Array[3 x 1] where XYZ tristimulus values (under standard illuminant D65, normalized so that the luminance of the display white is Yw = 100Y)
// sRGB - Array[3 x 1] where R, G, B range from [0 to 1]
const xyz_to_srgb = function xyz_to_srgb([X, Y, Z]) {
    const
        R = + 0.03241003232976359 * X - 0.015373989694887858 * Y - 0.004986158819963629 * Z,
        G = - 0.009692242522025166 * X + 0.01875929983695176 * Y + 0.00041554226340084706 * Z,
        B = + 0.0005563941985197545 * X - 0.0020401120612391 * Y + 0.010571489771875336 * Z;
    return [ gamma(R), gamma(G), gamma(B) ]
}
// Convert sRGB to CSS RGB Hex value
// sRGB - Array[3 x 1] where R, G, B range from [0 to 1]
// hex - String RGB hex value #RRGGBB eg '#800000' = Maroon
const srgb_to_hex = function srgb_to_hex([R, G, B]) {
    R = Math.round(0xff * R), G = Math.round(0xff * G), B = Math.round(0xff * B);
    if (Math.max(R, G, B) > 255 || Math.min(R, G, B) < 0) {
        throw new Error('Bad Input: R, G, and B must be in range [0, 1]');
    }
    return '#' + (1 << 24 | R << 16 | G << 8 | B).toString(16).slice(1);
}
// Convert CAM16 components to XYZ tristimulus values
// CAM16 - Object with CAM16 components J,M and h
// XYZ - Array[3 x 1] where XYZ tristimulus values (under standard illuminant D65, normalized so that the luminance of the display white is Yw = 100Y)
const JMh_to_xyz = function JMh_to_xyz({ J, M, h }) {
    return cam16_to_xyz({ J, M, h })
}
// Convert CAM16 components to CSS RGB Hex value
// CAM16 - Object with CAM16 components J,M and h
// hex - String RGB hex value #RRGGBB eg '#800000' = Maroon
const JMh_to_hex = function JMh_to_hex({ J, M, h }) {
    const XYZ = cam16_to_xyz({ J, M, h })
    const sRGB = xyz_to_srgb(XYZ)
    return srgb_in_gamut(sRGB) ? srgb_to_hex(sRGB) : srgb_to_hex(sRGB)
}
// Convert CAM16 Uniform Color Space components to CSS RGB Hex value
// CAM16UCS - Object with CAM16 Uniform Color Space components (J, M and h) OR (J, a and b) 
// hex - String RGB hex value #RRGGBB eg '#800000' = Maroon
const JMh_ucs_to_hex = function JMh_ucs_to_hex({ Ju, Mu, h }) {
    const XYZ = cam16_ucs_to_xyz({ Ju, Mu, h })
    const sRGB = xyz_to_srgb(XYZ)
    return srgb_in_gamut(sRGB) ? srgb_to_hex(sRGB) : null
}
// Convert CAM16 components to XYZ tristimulus values
// CAM16 - Object with CAM16 components J, s and h
// XYZ - Array[3 x 1] where XYZ tristimulus values (under standard illuminant D65, normalized so that the luminance of the display white is Yw = 100Y)
const Jsh_to_xyz = function Jsh_to_xyz({ J, s, h }) {
    return cam16_to_xyz({ J, s, h })
}
// Convert CAM16 components to CSS RGB Hex value
// CAM16 - Object with CAM16 components J, s and h
// hex - String RGB hex value #RRGGBB eg '#800000' = Maroon
const Jsh_to_hex = function Jsh_to_hex({ J, s, h }) {
    const XYZ = cam16_to_xyz({ J, s, h })
    const sRGB = xyz_to_srgb(XYZ)
    return srgb_in_gamut(sRGB) ? srgb_to_hex(sRGB) : null
}

// Calculate the color difference metric between two colors in CAM16 UCS
const deltaE = function deltaE(hex0, hex1) {
    const
        { J: J0, a: a0, b: b0 } = hex_to_cam16_ucs(hex0),
        { J: J1, a: a1, b: b1 } = hex_to_cam16_ucs(hex1),
        dJ = J1 - J0, da = a1 - a0, db = b1 - b0;
    return 1.41 * Math.pow(dJ * dJ + da * da + db * db, 0.315);
}

// Test if given sRGB channels are in the sRGB gamut
// RGB - Array[3 x 1] where RGB are the red, green and blue channels [0 - 1]
const in_gamut = c => (c <= 1 + EPSILON) & (c >= 0 - EPSILON)
const srgb_in_gamut = function srgb_in_gamut([R, G, B]) {
    return !!(in_gamut(R) & in_gamut(G) & in_gamut(B))
}

module.exports = {
    // Forward path
    hex_to_cam16,
    hex_to_cam16_ucs,
    
    // Inverse path
    JMh_ucs_to_hex,
    JMh_to_hex,
    Jsh_to_hex,

    // Utility functions
    is_hex_code,
    deltaE,
    srgb_in_gamut,
    hex_to_srgb,
    srgb_to_hex,
    srgb_to_xyz,
    xyz_to_srgb,
    xyz_to_cam16,
    xyz_to_cam16_ucs,
    cam16_to_xyz,
    Jsh_to_xyz,
    JMh_to_xyz
}

