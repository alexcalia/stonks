import React from 'react';
import {Line} from 'react-chartjs-2'

const StockGraph = ({data}) => {
  return ( 
    <div className="chartBox">
      <h3 className="chartHeader" ><span className={data.name ? "greenFont" : ""}>{data.name ? data.name : 'Stonk'}</span> Price Performance</h3>
      <div className="chartWrapper">
        {data.name
          ? <Line data={data.data} options={{
            legend: {
              display: false
            },
            scales: {
              yAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: '$'
                },
                gridLines: {
                  color: '#1c324b'
                },
                ticks: {
                  mirror: true,
                  labelOffset: 8
                }
              }],
              xAxes: [{
                scaleLabel: {
                  display: true,
                  labelString: 'Day'
                },
                gridLines: {
                  color: '#1c324b'
                }
              }]
            }
          }} />
          : <p className="stockChartPlaceholder">Click on a stonk to see its performance.</p>
        }
      </div>
    </div>
  );
}

export default StockGraph;