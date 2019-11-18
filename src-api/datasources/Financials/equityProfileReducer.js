module.exports = function equityProfileReducer(equityProfile) {
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
