const Colors = require('./index')
const colors = new Colors()
const marsBrownJMh = { J: 40.28881859208339, M: 33.603245246341054, h: 40.68152541215197 }
const marsBrownColor = { name: 'Mars Brown', hex: '#ad6242', ...marsBrownJMh }

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

    test('range creates an array of numbers from 10 to 15 (excluding) with a step of 2', () => {
        expect(colors.range({ start: 10, stop: 15, step: 2 })).toEqual([10, 12, 14]);
    });

    test('range creates an array of numbers from 15 to 10 (excluding) with a step of -2', () => {
        expect(colors.range({ start: 15, stop: 10, step: -2 })).toEqual([15, 13, 11]);
    });

    test('range creates an array of 2 evenly spaced numbers from 10 to 20 inclusive', () => {
        expect(colors.range({ start: 10, stop: 20, n: 2 })).toEqual([10, 20]);
    });

    test('range creates an array of 11 evenly spaced numbers from start to stop inclusive', () => {
        expect(colors.range({ start: 10, stop: 20, n: 11 })).toEqual([10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]);
    });

    test('range creates an array of 2 evenly spaced numbers from 20 to 10 inclusive', () => {
        expect(colors.range({ start: 20, stop: 10, n: 3 })).toEqual([20, 15, 10]);
    });

    test('range creates an array of numbers rotating from 20 to 60 with a step of 10, for circular numbers', () => {
        expect(colors.range({ start: 20, stop: 61, rotate: 10 })).toEqual([20, 30, 40, 50, 60 ]);
    });

    test('range creates an array of numbers rotating from 350 to 10 with a step of 5, for circular numbers', () => {
        expect(colors.range({ start: 350, stop: 10.1, rotate: 5 })).toEqual([350, 355, 0, 5, 10]);
    });

    test('range creates an array of numbers rotating from 10 to 350 with a step of -5, for circular numbers', () => {
        expect(colors.range({ start: 10, stop: 349, rotate: -5 })).toEqual([10, 5, 0, 355]);
    });


    test('rangeOfJMh creates an array of 5 evenly spaced colors with differing hue', () => {
        expect(colors.rangeOfJMh({ J: 20, M:6, h: { start: 350, stop: 10.1, rotate: 5 }}))
            .toEqual([{J: 20, M: 6, h: 350}, {J: 20, M: 6, h: 355}, {J: 20, M: 6, h: 0}, {J: 20, M: 6, h: 5}, {J: 20, M: 6, h: 10}]);
    });

    test('rangeOfJMh creates an array of 3 evenly spaced colors with differing colorfulness, undefined hue', () => {
        expect(colors.rangeOfJMh({ J: 50, M: { start: 10, stop: 12, n: 3 }}))
            .toEqual([{ J: 50, M: 10 }, { J: 50, M: 11 }, { J: 50, M: 12 }]);
    });

    test('rangeOfJMh creates an array of 3 evenly spaced colors with differing colorfulness', () => {
        expect(colors.rangeOfJMh({ J: 50, M: { start: 10, stop: 12, n: 3 }, h: 270  }))
            .toEqual([{ J: 50, M: 10, h: 270 }, { J: 50, M: 11, h: 270 }, { J: 50, M: 12, h: 270 }]);
    });

    test('rangeOfJMh creates three arrays of a sequence of 2 evenly spaced colors with differing lightness and colorfulness', () => {
        expect(colors.rangeOfJMh({ J: { start: 80, stop: 90, n: 2 }, M: { start: 10, stop: 12, n: 3 }, h: 270 }))
            .toEqual([
                [{"J": 80, "M": 10, "h": 270}, {"J": 90, "M": 10, "h": 270}], 
                [{"J": 80, "M": 11, "h": 270}, {"J": 90, "M": 11, "h": 270}], 
                [{"J": 80, "M": 12, "h": 270}, {"J": 90, "M": 12, "h": 270}]
            ]);
    });

    test('pickColor selects a named color closest to JMh', () => {
        expect(colors.pickColor({ J: 50, M: 20, h: 81 }).name).toEqual('Fall Harvest');
    });

    test('pickColor selects a named color closest to Mars Brown', () => {
        expect(colors.pickColor(marsBrownJMh).name).toEqual('Mars Brown');
    });

    test('pickColor selects a named color closest to white', () => {
        expect(colors.pickColor({ J: 100, M: 0, h: 209 }).name).toEqual('White');
    });

    test('pickColor selects a named color closest to black', () => {
        expect(colors.pickColor({ J: 0, M: 0, h: 0 }).name).toEqual('Black');
    });

    // test('darkerColors can return a bunch of darker colors', () => {
    //     expect(colors.darkerColors('#99ccff').map(c => c.name)).toEqual('a')
    // });


})

