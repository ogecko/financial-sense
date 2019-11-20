module.exports = {
    Query: {
      equity: (_, { ticker }, __) => ({ id: ticker, ticker }),
      color: (_, { hex }, { dataSources }) => dataSources.colors.findByName(hex),

      equityList: (_, __, { dataSources }) => dataSources.financials.getEquityList(),
      equityProfile: (_, { ticker }, { dataSources }) => dataSources.financials.getEquityProfile({ ticker }),
      equityProfiles: (_, { tickers }, { dataSources }) => dataSources.financials.getEquityProfiles({ tickers }),
      incomeStatement: (_, { ticker, period }, { dataSources }) => dataSources.financials.getIncomeStatement({ ticker, period }),
      findColor: (_, { needle, limit, sort, decr}, { dataSources }) => dataSources.colors.searchByName(needle, limit, sort, decr)
    },
    Node: {
      id: (_, { id }, __) => ({ id }),
      __resolveType: (node, _, __) => 'Equity',
    },
    Equity: {
      profile: ({ ticker }, _, { dataSources }) => dataSources.financials.getEquityProfile({ ticker }),
      incomeStmt: ({ ticker }, { period }, { dataSources }) => dataSources.financials.getIncomeStatement({ ticker, period }),
      incomeStmts: ({ ticker }, { period }, { dataSources }) => dataSources.financials.getIncomeStatements({ ticker, period }),
    },
    Color: {
      textColors: (c, _, { dataSources }) => dataSources.colors.findTextColors(c),
    },
    Period: {
      ANNUAL: 'annual',
      QUARTER: 'quarter'
    }
  };