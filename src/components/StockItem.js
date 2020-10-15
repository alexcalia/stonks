import React, {useState, useEffect} from 'react';

const StockItem = ({stock, type, stockChange, buyError, day, stockClick}) => {

  // Setting state
  const [amount, setAmount] = useState(0);
  const [percentChange, setPercentChange] = useState(0);
  const [gainLoss, setGainLoss] = useState(0);

  // Regex for the input box, only numbers and backspace allowed
  const regex = RegExp("[0-9\b]+");

  // Function for submitting the form for buying/seling stocks
  const handleSubmit = (e) => {
    e.preventDefault();
    stockChange(type, stock.id, amount, stock.price, day);
    setAmount(0);
  }

  // Handles the percntage and user's stock value change as days go by
  useEffect(()=> {
    if (stock.prices[stock.prices.length - 2]) {
      const previousPrice = stock.prices[stock.prices.length-2].price
      const difference = stock.price - previousPrice;
      setPercentChange(Math.round(((difference / previousPrice)*100)*100)/100);

      // Determines when stock was initially bought so the gain/loss number is accurate
      if (stock.buyDay === day) {
        setGainLoss(0);
      } else {
        setGainLoss(Math.round(((stock.prices[stock.prices.length -1].price * stock.owned) - (stock.prices[stock.prices.length - 2].price * stock.owned))*100)/100)
      }
    }
  }, [stock, day])

  return ( 
    <li onClick={()=> stockClick(stock.id)} tabIndex="0" onFocus={()=> stockClick(stock.id)}>
      <div className="stockNameWorth">
        <p className="stockName">{stock.name}</p>
        <p className="stockWorth">Worth: <span className="numbers">${Math.round((stock.owned * stock.price)*100)/100}</span></p>
      </div>
      
      <div className="stockPriceChange">
        <div className="stockChange">
          <p className="stockPrice">${stock.price}</p>
          <p className={percentChange >= 0 ? "percentChange greenFont" : "percentChange redFont"} >{percentChange > 0 ? `+${percentChange}%` : `${percentChange}%`}</p>
        </div>
  <p className={gainLoss >=0 ? " gainLoss greenFont" : "gainLoss redFont"}>${gainLoss}</p>
      </div>
        
      <div className="buySellOwned">
        <form className="buySell" onSubmit={handleSubmit}>
          <button>{type === 'BUY_STOCK' ? 'Buy' : 'Sell'}</button>
          <input 
            type="number"
            min="0"
            onChange={(e) => {
              if (regex.test(e.target.value)) {
                setAmount(e.target.value)
              }
            }} 
            onBlur={(e) => {
              if (regex.test(e.target.value)) {
                setAmount(e.target.value)
              }
            }} 
            value={amount} />
        </form>
        <p className="quantity">Qty: <span className="numbers">{stock.owned}</span></p>
      </div>
    </li>
  )
}

export default StockItem;