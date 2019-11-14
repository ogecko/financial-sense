
module.exports = function incomeStatementReducer(ticker, period, is) {
    const n = field => Number.parseFloat(is[field])
    return {
        ticker,
        period,
        date: is.date,
        revenue: n('Revenue'),
        costOfRevenue: n('Cost of Revenue'),
        SGAExpenses: n('SG&A Expense'),
        RDExpenses: n('R&D Expenses'),
        DAExpenses: n('EBITDA') - n('EBIT'),
        otherExpenses: n('Operating Expenses') - n('SG&A Expense') - n('R&D Expenses') - (n('EBITDA') - n('EBIT')),
        operatingExpenses: n('Operating Expenses'),
        interestExpense: n('Interest Expense'),
        incomeTaxExpense: n('Income Tax Expense'),

        grossProfit: n('Gross Profit'),
        operatingIncome: n('Operating Income'),
        EBITDA: n('EBITDA'),
        EBIT: n('EBIT'),
        netIncomeNonControllingInterest: n('Net Income - Non-Controlling int'),
        netIncomeDiscontinuedOps: n('Net Income - Discontinued ops'),
        consolidatedIncome: n('Consolidated Income'),
        netIncome: n('Net Income'),

        sharesOutstandingAvg: n('Weighted Average Shs Out'),
        sharesOutstandingDilutedAvg: n('Weighted Average Shs Out (Dil)'),
        earningsPerShare: n('EPS'),
        earningsPerShareDiluted: n('EPS Diluted'),
        dividendPerShare: n('Dividend per Share'),
        revenueGrowth: n('Revenue Growth'),

        grossMargin: n('Gross Margin'),
        EBITDAMargin: n('EBITDA Margin'),
        EBITMargin: n('EBIT Margin'),
        profitMargin: n('Profit Margin'),
        freeCashFlowMargin: n('Free Cash Flow margin'),
        earningsBeforeTaxMargin: n('Earnings Before Tax Margin'),
        netProfitMargin: n('Net Profit Margin'),
    };
}
