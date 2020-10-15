import React, {useState} from 'react';
import StockItem from './StockItem';

const StockTable = ({stocks, stockChange, buyError, day, stockClick}) => {

  const [type, setType] = useState('BUY_STOCK');

  const changeType = () => {
    if (type === 'BUY_STOCK') {
      setType('SELL_STOCK');
    } else {
      setType('BUY_STOCK');
    }
  }

  return (
    <div className="stockTable">
      <div className="tableHeader">
        <h2 className="tableHeaderText">Stonk Market</h2>
        <p>Mode:</p><button className="buySellBtn" onClick={changeType}>Buy/Sell</button>
      </div>
      <ul>
        {stocks.map(stock => {
          return (<StockItem stock={stock} key={stock.id} type={type} stockChange={stockChange} buyError={buyError} day={day} stockClick={stockClick} />)
        })}
      </ul>
    </div>
  );
}

export default StockTable;