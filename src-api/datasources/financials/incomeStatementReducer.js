module.exports = function incomeStatementReducer(ticker, period, is) {
    return {
        ticker,
        period,
        date: is.date,
        revenue: Number.parseFloat(is["Revenue"]),
        costOfRevenue: Number.parseFloat(is["Cost of Revenue"]),
        RDExpenses: Number.parseFloat(is["R&D Expenses"]),
        SGAExpenses: Number.parseFloat(is["SG&A Expense"]),
        operatingExpenses: Number.parseFloat(is["Operating Expenses"]),
        interestExpense: Number.parseFloat(is["Interest Expense"]),
        incomeTaxExpense: Number.parseFloat(is["Income Tax Expense"]),

        grossProfit: Number.parseFloat(is["Gross Profit"]),
        operatingIncome: Number.parseFloat(is["Operating Income"]),
        EBITDA: Number.parseFloat(is["EBITDA"]),
        EBIT: Number.parseFloat(is["EBIT"]),
        netIncomeNonControllingInterest: Number.parseFloat(is["Net Income - Non-Controlling int"]),
        netIncomeDiscontinuedOps: Number.parseFloat(is["Net Income - Discontinued ops"]),
        consolidatedIncome: Number.parseFloat(is["Consolidated Income"]),
        netIncome: Number.parseFloat(is["Net Income"]),

        sharesOutstandingAvg: Number.parseFloat(is["Weighted Average Shs Out"]),
        sharesOutstandingDilutedAvg: Number.parseFloat(is["Weighted Average Shs Out (Dil)"]),
        earningsPerShare: Number.parseFloat(is["EPS"]),
        earningsPerShareDiluted: Number.parseFloat(is["EPS Diluted"]),
        dividendPerShare: Number.parseFloat(is["Dividend per Share"]),
        revenueGrowth: Number.parseFloat(is["Revenue Growth"]),

        grossMargin: Number.parseFloat(is["Gross Margin"]),
        EBITDAMargin: Number.parseFloat(is["EBITDA Margin"]),
        EBITMargin: Number.parseFloat(is["EBIT Margin"]),
        profitMargin: Number.parseFloat(is["Profit Margin"]),
        freeCashFlowMargin: Number.parseFloat(is["Free Cash Flow margin"]),
        earningsBeforeTaxMargin: Number.parseFloat(is["Earnings Before Tax Margin"]),
        netProfitMargin: Number.parseFloat(is["Net Profit Margin"]),
    };
}
