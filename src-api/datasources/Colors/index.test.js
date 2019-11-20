const Colors = require('./index')
const colors = new Colors()

describe('datasource/colors/index unit tests', () => {

    test('Sample test', () => {
        expect(1).toEqual(1);
    });

    test('searchByName Orange, limited to 3 results, sorted by default colorfulness', () => {
        expect(colors.searchByName('Orange', 3).map(x=>x.name)).toEqual(["Electric Orange", "Blood Orange", "Ultimate Orange"]);
    });

    test('searchByName Lime, sorted ascending by lightness', () => {
        expect(colors.searchByName('Lime', 5, 'J', false).map(x=>x.name)).toEqual(["Limed Spruce", "Twist of Lime", "Online Lime", "Limed Ash", "Limerick"]);
    });

    test('findByName "Mars Brown"', () => {
        expect(colors.findByName('Mars Brown')).toMatchObject({ name: "Mars Brown" });
    });

    test('findByName #ad6242 which is Mars Brown', () => {
        expect(colors.findByName('#ad6242')).toMatchObject({ name: "Mars Brown" });
    });

    test('findByName #ad6243 which doesnt match any named color, but is still a hex code', () => {
        expect(colors.findByName('#ad6243').name).toEqual('#ad6243');
    });

    test('findByName "Blah Blah" which doesnt match any named color', () => {
        expect(colors.findByName('Blah Blah')).toBeNull();
    });

    test('findPeakColorByHue for h=30', () => {
        expect(colors.findPeakColorByHue(30).name).toEqual('Ferrari Red');
    });

    test('findTextColors for a dark color', () => {
        expect(colors.findTextColors(20)).toEqual(["#fffcfc", "#dedbda", "#bbb8b8", "#969494", "#6e6d6c"]);
    });

    test('findTextColors for a light color', () => {
        expect(colors.findTextColors(80)).toEqual(["#000000", "#363535", "#646362", "#8d8b8b", "#b3b1b0"]);
    });

    test('findTextColors for a midtone color', () => {
        expect(colors.findTextColors(50)).toEqual(["#fffcfc", "#ebe8e7", "#d5d3d2", "#c0bdbd", "#a9a7a7"]);
    });

})

