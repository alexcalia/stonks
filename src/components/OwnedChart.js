import React from 'react';
import {Doughnut} from 'react-chartjs-2';

const OwnedChart = ({data}) => {
  return ( 
    <div className="chartBox">
      <h3 className="chartHeader">Stonks Breakdown</h3>
      <div className="chartWrapper">
        <Doughnut data={data} options={{
          legend: {
            position: 'bottom',
            labels: {
              boxWidth: 15
            }
          }
        }}/>
      </div>
    </div>
  );
}

export default OwnedChart;