const Colors = require('./index')
const colors = new Colors()

describe('datasource/colors/index unit tests', () => {

    test('Sample test', () => {
        expect(1).toEqual(1);
    });

    test('findByName Orange, limited to 3 results, sorted by default colorfulness', () => {
        expect(colors.findByName('Orange', 3).map(x=>x.name)).toEqual(["Electric Orange", "Blood Orange", "Ultimate Orange"]);
    });

    test('findByName Lime, sorted ascending by lightness', () => {
        expect(colors.findByName('Lime', 5, 'J', false).map(x=>x.name)).toEqual(["Limed Spruce", "Twist of Lime", "Online Lime", "Limed Ash", "Limerick"]);
    });

    test('findByHex #ad6242 Mars Brown', () => {
        expect(colors.findByHex('#ad6242')).toMatchObject({ name: "Mars Brown" });
    });

    test('findByHex #ad6243 which doesnt match any named color', () => {
        expect(colors.findByHex('#ad6243')).toBeNull();
    });

    test('findPeakColorByHue for h=30', () => {
        expect(colors.findPeakColorByHue(30).name).toEqual('Ferrari Red');
    });

})

