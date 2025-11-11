// src/components/IssuePieChart.js
import React from 'react';
import ReactECharts from 'echarts-for-react';

const IssuePieChart = ({ openCount, closedCount }) => {
  const options = {
    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
      orient: 'vertical',
      left: 'left',
      data: ['Open', 'Closed']
    },
    series: [
      {
        name: 'Issue State',
        type: 'pie',
        radius: ['50%', '70%'], // Donut chart style
        avoidLabelOverlap: false,
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '20',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: openCount, name: 'Open', itemStyle: { color: '#4A90E2' } }, // Blue
          { value: closedCount, name: 'Closed', itemStyle: { color: '#7ED321' } } // Green
        ]
      }
    ]
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      flex: 1, // Allows it to take up available space
      minWidth: '300px', // Minimum width for the chart
    }}>
      <h3 style={{ marginTop: '0' }}>Open vs. Closed Issues</h3>
      <ReactECharts option={options} style={{ height: '300px' }} />
    </div>
  );
};

export default IssuePieChart;