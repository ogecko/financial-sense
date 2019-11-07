const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
    equityList: [EquityListItem]!
    equityProfile(ticker: String!): EquityProfile
    equityProfiles(tickers: [String]!): [EquityProfile]
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
    LastDividend: Float
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