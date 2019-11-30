const { gql } = require('apollo-server');

const typeDefs = gql`
type Query {
    node(id: ID!): Node
    equity(ticker: String!): Equity
    color(hex: String!): Color

    equityList: [EquityListItem]!
    equityProfile(ticker: String!): EquityProfile
    equityProfiles(tickers: [String]!): [EquityProfile]
    incomeStatement(ticker: String!, period: Period): [IncomeStatement]

    findColor(needle: String!, limit: Float, sort: String, decr: Boolean): [Color]
  }

interface Node {
  id: ID!
}

type Equity implements Node {
  id: ID!
  ticker: String!
  profile: EquityProfile
  incomeStmt(period: Period = QUARTER): IncomeStatement
  incomeStmts(period: Period = QUARTER): [IncomeStatement]
}

enum Period {
  QUARTER
  ANNUAL
}

type Color {
  id: ID!

  "RGB hexadecimal color value often used in CSS. Formated as '#RRGGBB' where R (red), G (green), B (blue) are hexadecimal characters (0–9, A–F). For example, #ff0000 is equivalent pure Red."
  hex: String

  "Human readable name of the color. A handpicked list of 18264 unique color names from various sources and thousands of curated user submissions."
  name: String

  "Lightness (CAM16). [0 Black - 100 White]. Lightness is perceived reflectance. It represents the visual system's attempt to extract reflectance based on the luminances in the scene."
  J: Float

  "Brightness (CAM16). [0 Black - 197 White]. Represents the perceived intensity of light coming from the image itself, rather than any property of the portrayed scene. Brightness is sometimes defined as perceived luminance."
  Q: Float

  "Hue (CAM16). [0 - 360].  Represents the degree to which a stimulus can be described as similar to or different from stimuli that are described as [30 red | 111 yellow | 142 green | 282 blue | 335 Majenta]."
  h: Float

  "Colorfulness (CAM16). [0 B/W - 100 Colorful]. Represents how an area appears to be more or less chromatic. Depends on reflectance and illumination."
  M: Float

  "Chroma (CAM16). [0 B/W - 113 Colorful]. Represents the perceived chromatic appearance as a proportion of the brightness of a similarly illuminated area that appears white."
  C: Float

  "Saturation (CAM16). [0 - 87]. Represents is perceived chromatic appearnce of an area in proportion to its brightness. An object with a given spectral reflectance exhibits approximately constant saturation for all levels of illumination."
  s: Float

  "Lightness (CAM16 Uniform Color Space). [0 Black - 100 White]. Related to J but scaled to support cartesian calculations of color differences DeltaE."
  Ju: Float

  "Colorfulness (CAM16 Uniform Color Space). [0 B/W - 52 Colorful]. Related to M but scaled to support cartesian calculations of color differences DeltaE."
  Mu: Float

  "Red-Green component (CAM16 Uniform Color Space). [-39 to 49]. +vs magenta -ve teal. Related to Mu and Hue but in cartesian co-ordinates for color differences calculations DeltaE."
  a: Float

  "Blue-Yellow component (CAM16 Uniform Color Space). [-42 to 37]. +ve yellow -ve blue. Related to Mu and Hue but in cartesian co-ordinates for color differences calculations DeltaE."
  b: Float

  "A list of five hex codes suitable for contrasting text over the background color, in decreasing contrast"
  textColors: [String!]!

  "A list of lighter colors with similar hue and colorfulness"
  lighterColors: [Color]

  "A list of darker colors with similar hue and colorfulness"
  darkerColors: [Color]

  "A list of more colorful colors with similar hue and lightness"
  strongerColors: [Color]

  "A list of more colorful colors with similar hue and lightness"
  weakerColors: [Color]

  "A list of warmer colors with similar colorfulness and lightness"
  warmerColors: [Color]

  "A list of cooler colors with similar colorfulness and lightness"
  coolerColors: [Color]

  "A list of cooler and warmer colors with similar colorfulness and lightness"
  analogousColors: [Color]

  "A list of colors from the triadic color scheme composed of three colors evenly spaced on the color wheel"
  triadicColors: [Color]

  "A list of colors from the tetradic color scheme composed of four colors evenly spaced on the color wheel"
  tetradicColors: [Color]
}

type IncomeStatement {
    date: String
    ticker: String
    period: String
    revenue: Float
    costOfRevenue: Float
    RDExpenses: Float
    SGAExpenses: Float
    otherExpenses: Float
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