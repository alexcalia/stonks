import React from 'react';

const StockStats = ({worth, money, totalWorth}) => {
  return ( 
    <div className="stockStats">
      <h2 className="stockStatsHeader">Portfolio Overview</h2>
      <div className="stockOverview">
        <div className="statBox">
          <h3>Funds</h3>
          <p className="statMoney">${money}</p>
        </div>

        <div className="statBox">
          <h3>Stocks Worth</h3>
          <p className="statMoney">${worth}</p>
        </div>

        <div className="statBox">
          <h3>Total Worth</h3>
          <p className="statMoney">${totalWorth}</p>
        </div>
      </div>
    </div>
  );
}

export default StockStats;