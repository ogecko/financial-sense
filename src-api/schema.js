const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
    equityList: [EquityListItem]!
    equityProfile(ticker: String!): EquityProfile
    equityProfiles(tickers: [String]!): [EquityProfile]
    incomeStatement(ticker: String!, period: Period): [IncomeStatement]
  }
enum Period {
  QUATER
  ANNUAL
}
type IncomeStatement {
    date: String
    ticker: String
    period: String
    revenue: Float
    costOfRevenue: Float
    RDExpenses: Float
    SGAExpenses: Float
    operatingExpenses: Float
    interestExpense: Float
    incomeTaxExpense: Float

    grossProfit: Float
    operatingIncome: Float
    EBITDA: Float
    EBIT: Float
    netIncomeNonControllingInterest: Float
    netIncomeDiscontinuedOps: Float
    consolidatedIncome: Float
    netIncome: Float
    sharesOutstandingAvg: Float
    sharesOutstandingDilutedAvg: Float
    earningsPerShare: Float
    earningsPerShareDiluted: Float
    dividendPerShare: Float
    revenueGrowth: Float

    grossMargin: Float
    EBITDAMargin: Float
    EBITMargin: Float
    profitMargin: Float
    freeCashFlowMargin: Float
    earningsBeforeTaxMargin: Float
    netProfitMargin: Float
  }
type EquityProfile {
    "The name of the company."
    name: String
    description: String
    exchange: String
    ticker: String
    image: String
    industry: String
    sector: String
    website: String
    ceo: String
    price: Float
    beta: Float
    volumeAvg: Float
    marketCap: Float
    lastDividend: Float
    range: String
    change: Float
    changePercent: Float
  }
type EquityListItem {
    "The name of the company."
    name: String
    ticker: String
    price: Float
  }
`;

module.exports = typeDefs;