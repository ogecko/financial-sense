module.exports = {
    Query: {
      color: (_, { hex }, { dataSources }) => dataSources.colors.findByName(hex),
      findColor: (_, { needle, limit, sort, decr}, { dataSources }) => dataSources.colors.searchByName(needle, limit, sort, decr)
    },
    Color: {
      textColors: (c, _, { dataSources }) => dataSources.colors.findTextColors(c),
      lighterColors: (c, _, { dataSources }) => dataSources.colors.lighterColors(c.hex),
      darkerColors: (c, _, { dataSources }) => dataSources.colors.darkerColors(c.hex),
      strongerColors: (c, _, { dataSources }) => dataSources.colors.strongerColors(c.hex),
      weakerColors: (c, _, { dataSources }) => dataSources.colors.weakerColors(c.hex),
      warmerColors: (c, _, { dataSources }) => dataSources.colors.warmerColors(c.hex),
      coolerColors: (c, _, { dataSources }) => dataSources.colors.coolerColors(c.hex),
      analogousColors: (c, _, { dataSources }) => dataSources.colors.analogousColors(c.hex),
      triadicColors: (c, _, { dataSources }) => dataSources.colors.triadicColors(c.hex),
      tetradicColors: (c, _, { dataSources }) => dataSources.colors.tetradicColors(c.hex),
    },
  };