const _ = require('lodash')
const {
    hex_to_srgb,
    srgb_to_xyz,
    srgb_to_hex,
    xyz_to_srgb,
    xyz_to_cam16,
    xyz_to_cam16_ucs,
    hex_to_cam16,
    hex_to_cam16_ucs,
    cam16_to_xyz,
    JMh_to_hex,
    JMh_ucs_to_hex,
    Jsh_to_hex
} = require('./cam16')

const marsBrownHex = '#ad6242'
const marsBrownRGB = [0.6784313725490196, 0.3843137254901961, 0.25882352941176473]
const marsBrownXYZ = [22.583696650753893, 18.014172167112505, 7.4413134055600425]
const marsBrownJMh = { J: 40.28881859208339, M: 33.603245246341054, h: 40.68152541215197 }
const marsBrownJsh = { J: 40.28881859208339, s: 51.83540410993695, h: 40.68152541215197 }
const marsBrownCam16 = { ...marsBrownJMh, C: 38.42631313761, Q: 125.0628277886822, s: 51.83540410993695 }
const marsBrownCam16ucs = { ...marsBrownCam16, Ju: 53.42420490705527, Mu: 24.94755685750558, a: 18.918844051828103, b: 16.2621626145197 }

const approxArr = arr => _.map(arr, x => x.toFixed(12))
const approxObj = obj => _.mapValues(obj, x => x.toFixed(12))

describe('datasources/colors/cam16 unit tests', () => {

    test('hex_to_srgb converts arbitary #ff80ff correctly', () => {
        expect(hex_to_srgb('#ff80ff')).toEqual([1, 0.5019607843137255, 1]);
    });

    test('hex_to_srgb converts #ad6242 Mars Brown correctly', () => {
        expect(hex_to_srgb(marsBrownHex)).toEqual(marsBrownRGB);
    });

    test('srgb_to_hex converts #ad6242 Mars Brown correctly', () => {
        expect(srgb_to_hex(marsBrownRGB)).toEqual(marsBrownHex);
    });

    test('srgb_to_xyz converts #ad6242 Mars Brown correctly', () => {
        expect(srgb_to_xyz(marsBrownRGB)).toEqual(marsBrownXYZ);
    });

    test('xyz_to_srgb converts #ad6242 Mars Brown correctly', () => {
        expect(approxArr(xyz_to_srgb(marsBrownXYZ))).toEqual(approxArr(marsBrownRGB));
    });
 
    test('xyz_to_cam16 converts #ad6242 Mars Brown correctly', () => {
        expect(xyz_to_cam16(marsBrownXYZ)).toEqual(marsBrownCam16);
    });

    test('xyz_to_cam16_ucs converts #ad6242 Mars Brown correctly', () => {
        expect(xyz_to_cam16_ucs(marsBrownXYZ)).toEqual(marsBrownCam16ucs);
    });

    test('hex_to_cam16 converts #ad6242 Mars Brown correctly', () => {
        expect(hex_to_cam16(marsBrownHex)).toEqual(marsBrownCam16);
    });

    test('hex_to_cam16_ucs converts #ad6242 Mars Brown correctly', () => {
        expect(hex_to_cam16_ucs(marsBrownHex)).toEqual(marsBrownCam16ucs);
    });

    test('cam16_to_xyz converts #ad6242 Mars Brown correctly', () => {
        expect(approxArr(cam16_to_xyz(marsBrownJMh))).toEqual(approxArr(marsBrownXYZ));
    });

    test('JMh_to_hex converts #ad6242 Mars Brown correctly', () => {
        expect(JMh_to_hex(marsBrownCam16)).toEqual(marsBrownHex);
    });

    test('JMh_ucs_to_hex converts #ad6242 Mars Brown correctly', () => {
        expect(JMh_ucs_to_hex(marsBrownCam16ucs)).toEqual(marsBrownHex);
    });

    test('Jsh_to_hex converts #ad6242 Mars Brown correctly', () => {
        expect(Jsh_to_hex(marsBrownJsh)).toEqual(marsBrownHex);
    });

})

