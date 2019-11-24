const Colors = require('./index')
const colors = new Colors()
const marsBrownColor = {
    name: 'Mars Brown', hex: '#ad6242',
    J: 40.28, M: 33.60, h: 40.68
}

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
        expect(colors.findTextColors(20)).toEqual(["#FFFFFFff", "#FFFFFFe6", "#FFFFFFcd", "#FFFFFFb4", "#FFFFFF9b", "#FFFFFF82"]);
    });

    test('findTextColors for a light color', () => {
        expect(colors.findTextColors(80)).toEqual(["#FFFFFFff", "#FFFFFFe6", "#FFFFFFcd", "#FFFFFFb4", "#FFFFFF9b", "#FFFFFF82"]);
    });

    test('findTextColors for a midtone color', () => {
        expect(colors.findTextColors(50)).toEqual(["#FFFFFFff", "#FFFFFFe6", "#FFFFFFcd", "#FFFFFFb4", "#FFFFFF9b", "#FFFFFF82"]);
    });

    test('linearMinMaxReducer finds min and max for a series of numbers', () => {
        expect([4,3,7,2,1,-5].reduce(colors.linearMinMaxReducer, {})).toEqual({ max: 7, min: -5 });
    });

    test('minMaxHues finds min and max for a series of hues in top half', () => {
        expect(colors.minMaxHues([4, 70, 170, 5])).toEqual({ max: 170, min: 4 });
    });

    test('minMaxHues finds min and max for a series of hues in bottom half', () => {
        expect(colors.minMaxHues([181, 270, 263, 290])).toEqual({ max: 290, min: 181 });
    });

    test('minMaxHues finds min and max for a series of hues that cross 180', () => {
        expect(colors.minMaxHues([170,181,180,190])).toEqual({ max: 190, min: 170 });
    });

    test('minMaxHues finds min and max for a series of hues that cross 180 and a large range', () => {
        expect(colors.minMaxHues([170,5,181,180,190, 355])).toEqual({ max: 355, min: 5 });
    });

    test('minMaxHues finds min and max for a series of hues that cross 360', () => {
        expect(colors.minMaxHues([10, 23,  350])).toEqual({ max: 23, min: 350 });
    });

    test('minMaxHues finds min and max for a series of hues that cross 360 and a large range', () => {
        expect(colors.minMaxHues([10, 90, 23,  350])).toEqual({ max: 90, min: 350 });
    });

    test('minMaxHues finds min and max for a series of hues that cross 360 and a very large range', () => {
        expect(colors.minMaxHues([10, 179, 90, 23,  350])).toEqual({ max: 179, min: 350 });
    });

    test('minMaxHues finds min and max for a series of hues that cross 360 and a very large range', () => {
        expect(colors.minMaxHues([10, 185, 90, 23,  350])).toEqual({ max: 90, min: 185 });
    });

    test('minMaxLinearDelta defines min and max around a mid point', () => {
        expect(colors.minMaxLinearDelta({ mid: 10, delta: 4 })).toEqual({"max": 14, "min": 6});
    });

    test('minMaxCircularDelta defines min and max around a mid point', () => {
        expect(colors.minMaxCircularDelta({ mid: 10, delta: 4 })).toEqual({"max": 14, "min": 6});
    });

    test('minMaxCircularDelta defines min and max around a crossover mid point', () => {
        expect(colors.minMaxCircularDelta({ mid: 2, delta: 10 })).toEqual({"max": 12, "min": 352});
    });

    test('minMaxJMhColors defines min and max for J, M and h', () => {
        expect(colors.minMaxJMhColors(colors.colornames)).toEqual({ 
                J: {"max": 99.99955537650459, "min": 0.8867566246525433},
                M: {"max": 99.06063864657223, "min": 0.2055202514208325},
                h: {"max": 179.9520832580398, "min": 180.00714064643273}}
        );
    });

    test('isInsideLinearRange can check whether value is inside a linear range', () => {
        expect(colors.isInsideLinearRange(9, { min: 10, max: 20 })).toEqual(false);
        expect(colors.isInsideLinearRange(10, { min: 10, max: 20 })).toEqual(true);
        expect(colors.isInsideLinearRange(15, { min: 10, max: 20 })).toEqual(true);
        expect(colors.isInsideLinearRange(20, { min: 10, max: 20 })).toEqual(true);
        expect(colors.isInsideLinearRange(30, { min: 10, max: 20 })).toEqual(false);
    });

    test('isInsideCircularRange can check whether value is inside a 10 to 20 range', () => {
        expect(colors.isInsideCircularRange(9, { min: 10, max: 20 })).toEqual(false);
        expect(colors.isInsideCircularRange(10, { min: 10, max: 20 })).toEqual(true);
        expect(colors.isInsideCircularRange(15, { min: 10, max: 20 })).toEqual(true);
        expect(colors.isInsideCircularRange(20, { min: 10, max: 20 })).toEqual(true);
        expect(colors.isInsideCircularRange(30, { min: 10, max: 20 })).toEqual(false);
    });

    test('isInsideCircularRange can check whether value is inside a 350 to 20 range', () => {
        expect(colors.isInsideCircularRange(349, { min: 350, max: 20 })).toEqual(false);
        expect(colors.isInsideCircularRange(350, { min: 350, max: 20 })).toEqual(true);
        expect(colors.isInsideCircularRange(5, { min: 350, max: 20 })).toEqual(true);
        expect(colors.isInsideCircularRange(20, { min: 350, max: 20 })).toEqual(true);
        expect(colors.isInsideCircularRange(30, { min: 350, max: 20 })).toEqual(false);
    });
    

    test('isColorMatchingQueryFn can check whether color name has NO partial match', () => {
        const isMatchingJ = colors.isColorMatchingQueryFn({ J: {mid: 45, delta: 5} })
        const isNotMatchingJ = colors.isColorMatchingQueryFn({ J: {mid: 45, delta: 4} })
        const isMatchingh = colors.isColorMatchingQueryFn({ h: {mid: 350, delta: 55} })
        const isNotMatchingh = colors.isColorMatchingQueryFn({ h: {mid: 350, delta: 50} })
        expect(isMatchingJ(marsBrownColor)).toEqual(true);
        expect(isNotMatchingJ(marsBrownColor)).toEqual(false);
        expect(isMatchingh(marsBrownColor)).toEqual(true);
        expect(isNotMatchingh(marsBrownColor)).toEqual(false);
    });

    test('isColorMatchingQueryFn can check whether color name matches a needle', () => {
        const isMatch = colors.isColorMatchingQueryFn({ name: 'Mars Brown' })
        expect(isMatch(marsBrownColor)).toEqual(true);
    });

    test('isColorMatchingQueryFn can check whether color hex matches a needle', () => {
        const isMatch = colors.isColorMatchingQueryFn({ name: '#ad6242' })
        expect(isMatch(marsBrownColor)).toEqual(true);
    });

    test('isColorMatchingQueryFn can check whether color hex does not match a needle', () => {
        const isMatch = colors.isColorMatchingQueryFn({ name: '#ad62FF' })
        expect(isMatch(marsBrownColor)).toEqual(false);
    });

    test('isColorMatchingQueryFn can check whether color name has a partial match', () => {
        const isMatch = colors.isColorMatchingQueryFn({ search: 'Brow' })
        expect(isMatch(marsBrownColor)).toEqual(true);
    });

    test('isColorMatchingQueryFn can check whether color name has NO partial match', () => {
        const isMatch = colors.isColorMatchingQueryFn({ search: 'pea' })
        expect(isMatch(marsBrownColor)).toEqual(false);
    });

    test('range creates an array of numbers progressing from min up to, but not including, max', () => {
        expect(colors.range({ min: 10, max: 15, step: 2 })).toEqual([10, 12, 14]);
    });

    test('range creates an array of 2 evenly spaced numbers from min to max inclusive', () => {
        expect(colors.range({ min: 10, max: 20, n: 2 })).toEqual([10, 20]);
    });

    test('range creates an array of 11 evenly spaced numbers from min to max inclusive', () => {
        expect(colors.range({ min: 10, max: 20, n: 11 })).toEqual([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    });

    test('range creates an array of numbers rotating from min up to, but not including, max, for circular numbers', () => {
        expect(colors.range({ min: 350, max: 10.1, rotate: 5 })).toEqual([350, 355, 0, 5, 10]);
    });

    // test('isLighterColors can return a bunch of lighter colors', () => {
    //     expect(colors.lighterColors(marsBrownColor.hex).map(c => c.name)).toEqual('a')
    // });


})

