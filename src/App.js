import React, {useState, useEffect, useReducer} from 'react';
// Components
import Header from './components/Header';
import StockStats from './components/StockStats';
import StockTable from './components/StockTable';
import Footer from './components/Footer';
// Charts
import TotalWorthChart from './components/TotalWorthChart';
import StockChart from './components/StockChart';
import OwnedChart from './components/OwnedChart';
// Utilities
import priceChange from './utils/priceChange';
import stocksFile from './utils/stocks'
import {stocksReducer} from './utils/stocksReducer';
import doughnutColors from './utils/doughnutColorArray';
import worthCalc from './utils/worthCalc';

function App() {

  // Setting state
  const [stocks, dispatch] = useReducer(stocksReducer, stocksFile)
  const [day, setDay] = useState(0);
  const [worth, setWorth] = useState(0);
  const [money, setMoney] = useState(10000);
  const [buyError, setBuyError] = useState(false);
  const [totalWorth, setTotalWorth] = useState(10000);
  const [total, setTotal] = useState([{day: 0, totalWorth: 10000}]);
  const [stockID, setStockID] = useState(0);
  const [stockData, setStockData] = useState({});
  const [ownedData, setOwnedData] = useState({});
  const [speed, setSpeed] = useState(60000);

  // Set the time passing interval
  useEffect(()=> {
    const interval = setInterval(()=> {
      // Increase day by 1
      setDay(day + 1);
      // Set new stock prices
      const newStockPrices = stocks.map(stock => {
        // Generate random stock rice multiplier
        const priceUpdater = priceChange();
        return {
          ...stock, 
          price: (stock.price * priceUpdater).toFixed(2),
          prices: [...stock.prices, {day: day+1, price: (stock.price * priceUpdater).toFixed(2)}],
        }
      });
      // Pass the new stock prices into function to determine total worth 
      const worthSet = worthCalc(newStockPrices);
      // Create and set new array of objects for the "portfolio Performance" chart
      const newTotal = [...total, {day: day+1, totalWorth: Math.round((money + worthSet)*100)/100 }];
      setTotal(newTotal);
      // Run the reducer to set the new stock prices in state
      dispatch({type: 'NEW_PRICES', state: newStockPrices});
    }, speed);
    return () => clearInterval(interval)
  }, [stocks, day]);

  // Set object for "OwnedChart" and set the total stock worth
  useEffect(() => {
    // Filter for all stocks that user owns
    const ownedStocks = stocks.filter(stock => stock.owned > 0);
    // Find total worth of owned stocks and set it in state
    const worthSet = worthCalc(stocks);
    setWorth(worthSet);
    // Set total worth of money and stock value
    setTotalWorth(Math.round((money + worthSet)*100)/100);
    // Create the object to pass to the "OwnedChart"
    setOwnedData({
      labels: ownedStocks.map(item => item.name),
      datasets: [
        {
          label: `Owned`,
          data: ownedStocks.map(item => item.owned),
          backgroundColor: doughnutColors
        }
      ]
    });
  }, [worth, stocks, money]);

  // Set object for the "StockChart"
  useEffect(() => {
    if (stockID) {
      // Find the index of the stock item based off of the "stockID" passed on click
      const itemIndex = stocks.findIndex(item => item.id === stockID);
      const stock = stocks[itemIndex];
      // Set the object for passing to the "StockChart" 
      setStockData({
        name: stock.name,
        data: {
          labels: stock.prices.map(item => {
            return item.day
          }),
          datasets: [
            {
              label: 'Price',
              data: stock.prices.map(item => {
                return item.price
              }),
              backgroundColor: 'rgba(4, 109, 165, 0.1)',
              pointBackgroundColor: '#046da5',
              borderColor: '#0086c7',
              pointBorderColor: '#011a36',
              pointRadius: 4,
              pointHoverRadius: 5,
              pointBorderWidth: 2
            }
          ]
        }
      });
    }
  }, [stockID, stocks]);

  // Function that runs when the user clicks Buy or Sell button for each stock
  const stockChange = (type, id, amount, price, day) => {
    // Find the index of the stock item
    const itemIndex = stocks.findIndex(item => item.id === id)
    // Run the reducer function based on the action type
    if (type === 'BUY_STOCK') {
      if (money < (amount*price)) {
        setBuyError(true);
      } else {
        dispatch({type, id, amount, itemIndex, day});
        setMoney(Math.round((money - (amount * price))*100)/100)
      }
    } else if (type === 'SELL_STOCK') {
      if (stocks[itemIndex].owned < amount) {
        amount = stocks[itemIndex].owned;
      }
      dispatch({type, id, amount, itemIndex})
      setMoney(Math.round((money + (amount * price))*100)/100)
    }
  }

  return (
    <div className="App">
      <Header day={day} setSpeed={setSpeed} />
      <div className="wrapper">
        <div className="tables">
          <div className="stocksStuff">
            <StockStats worth={worth} money={money} totalWorth={totalWorth} />
            <StockTable path="stocks" stocks={stocks} stockChange={stockChange} buyError={buyError} day={day} stockClick={setStockID} />
          </div>
          <div className="graphsStuff">
            <TotalWorthChart total={total} />
            <StockChart data={stockData}/>
            <OwnedChart data={ownedData}/>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;