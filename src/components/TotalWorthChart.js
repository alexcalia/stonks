import React from 'react';
import {Line} from 'react-chartjs-2';

const TotalWorthChart = ({total}) => {

  // Create object for the chart from the array passed in
  const chartData = {
    labels: total.map(item => {
      return item.day
    }),
    datasets: [
      {
        label: 'Total Worth',
        data: total.map(item => {
          return item.totalWorth
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

  return ( 
    <div className="chartBox">
      <h3 className="chartHeader">Portfolio Performance</h3>
      <div className="chartWrapper">
        <Line data={chartData} options={{
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              scaleLabel: {
                display: true,
                labelString: '$',
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
      </div>
    </div>
  );
}

export default TotalWorthChart;