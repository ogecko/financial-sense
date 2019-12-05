const { RESTDataSource } = require('apollo-datasource-rest');
const { equityListReducer, equityProfileReducer, incomeStatementReducer } = require('./reducers');
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

class Financials extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = 'https://financialmodellingprep.com/api/v3/';
  }

  async getEquityList() {
    const response = await this.get('company/stock/list');
    return Array.isArray(response.symbolsList)
        ? response.symbolsList.map(equity => equityListReducer(equity))
        : [];
  }

  async getEquityProfile({ ticker }) {
    const response = await this.get(`company/profile/${ticker}`);
    return equityProfileReducer(response);
  }
  
  getEquityProfiles({ tickers }) {
    return Promise.all(
      tickers.map(ticker => this.getEquityProfile({ ticker })),
    );
  }

  async getIncomeStatement({ ticker, period="quarter" }) {
    const response = await this.get(`financials/income-statement/${ticker}?period=${period}`);
    return incomeStatementReducer(ticker, period, response.financials[0]);
  }

  async getIncomeStatements({ ticker, period="quarter" }) {
    const response = await this.get(`financials/income-statement/${ticker}?period=${period}`);
    return Array.isArray(response.financials)
        ? response.financials.map(incomeStatement => incomeStatementReducer(ticker, period, incomeStatement))
        : [];
  }
  
}


module.exports = {
  ds: Financials,
  typeDefs,
  resolvers,
}