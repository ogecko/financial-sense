module.exports = {
    Query: {
      equityList: (_, __, { dataSources }) => dataSources.financials.getEquityList(),
      equityProfile: (_, { ticker }, { dataSources }) => dataSources.financials.getEquityProfile({ ticker }),
      equityProfiles: (_, { tickers }, { dataSources }) => dataSources.financials.getEquityProfiles({ tickers }),
      incomeStatement: (_, { ticker, period }, { dataSources }) => dataSources.financials.getIncomeStatement({ ticker, period }),
    }
  };