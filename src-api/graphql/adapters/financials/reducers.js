function equityListReducer(equityListItem) {
    return {
      ticker: equityListItem.symbol,
      name: equityListItem.name,
      price: Number.parseFloat(equityListItem.price)
    };
}

function equityProfileReducer(equityProfile) {
    return {
        ticker: equityProfile.symbol,
        exchange: equityProfile.profile.exchange,
        name: equityProfile.profile.companyName,
        ceo: equityProfile.profile.ceo,
        description: equityProfile.profile.description,
        industry: equityProfile.profile.industry,
        sector: equityProfile.profile.sector,
        website: equityProfile.profile.website,
        image: equityProfile.profile.image,
        range: equityProfile.profile.range,
        price: Number.parseFloat(equityProfile.profile.price),
        beta: Number.parseFloat(equityProfile.profile.beta),
        volumeAvg: Number.parseFloat(equityProfile.profile.volAvg),
        marketCap: Number.parseFloat(equityProfile.profile.mktCap),
        lastDividend: Number.parseFloat(equityProfile.profile.lastDiv),
        change: Number.parseFloat(equityProfile.profile.changes),
        changePercent: Number.parseFloat(equityProfile.profile.changesPercentage),
    };
}


function incomeStatementReducer(ticker, period, is) {
    const n = field => Number.parseFloat(is[field])
    return {
        ticker,
        period,
        date: is.date,
        revenue: n('Revenue'),
        costOfRevenue: n('Cost of Revenue'),
        SGAExpenses: n('SG&A Expense'),
        RDExpenses: n('R&D Expenses'),
        otherExpenses: n('Operating Expenses') - n('SG&A Expense') - n('R&D Expenses'),
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


module.exports = {
    equityListReducer, 
    equityProfileReducer,
    incomeStatementReducer,
}