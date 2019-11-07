const { RESTDataSource } = require('apollo-datasource-rest');
const equityListReducer = require('./equityListReducer');
const equityProfileReducer = require('./equityProfileReducer');
const incomeStatementReducer = require('./incomeStatementReducer');

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
    return Array.isArray(response.financials)
        ? response.financials.map(incomeStatement => incomeStatementReducer(ticker, period, incomeStatement))
        : [];
  }
  

}

module.exports = Financials;