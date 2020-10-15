export default (stocks) => {
  const ownedStocks = stocks.filter(stock => stock.owned > 0);
  const sumArray = ownedStocks.map(item => item.owned * item.price);
  const sum = sumArray.reduce((a, b) => a + b, 0);
  return (Math.round(sum*100)/100);
}