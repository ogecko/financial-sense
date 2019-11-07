const { RESTDataSource } = require('apollo-datasource-rest');
const equityListReducer = require('./equityListReducer');
const equityProfileReducer = require('./equityProfileReducer');

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

}

module.exports = Financials;