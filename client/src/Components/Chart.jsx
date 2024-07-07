import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js';
import '../App.css';

const ChartComponent = ({ records }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    const impactData = records.reduce((acc, record) => {
      acc[record.Impact] = acc[record.Impact] ? acc[record.Impact] + 1 : 1;
      return acc;
    }, {});

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(impactData),
        datasets: [{
          label: 'Impact Count',
          data: Object.values(impactData),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }, [records]);

  return (
    <div className="chart-container">
      <canvas ref={chartRef} />
    </div>
  );
};

export default ChartComponent;
