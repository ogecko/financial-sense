module.exports = function equityListReducer(equityListItem) {
    return {
      ticker: equityListItem.symbol,
      name: equityListItem.name,
      price: Number.parseFloat(equityListItem.price)
    };
}