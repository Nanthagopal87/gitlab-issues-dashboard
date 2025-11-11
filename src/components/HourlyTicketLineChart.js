// src/components/HourlyTicketLineChart.js
import React from 'react';
import ReactECharts from 'echarts-for-react';

const HourlyTicketLineChart = () => {
  // --- Mock Data ---
  const mockHours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  // Generate more complex mock data for multiple series
  const generateHourlyData = () => {
    return Array.from({ length: 24 }, () => ({
      open: Math.floor(Math.random() * 15) + 5,
      closed: Math.floor(Math.random() * 10) + 3,
    }));
  };

  const mockData = {
    all: generateHourlyData(),
    userA: generateHourlyData(),
    userB: generateHourlyData(),
  };

  // Function to extract data for a specific type (open/closed) and user
  const getDataForSeries = (userKey, ticketType) => {
    return mockData[userKey].map(data => data[ticketType]);
  };

  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: [
        'All Open', 'All Closed',
        'User A Open', 'User A Closed',
        'User B Open', 'User B Closed'
      ],
      top: '0%' // Position legend at the top
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: mockHours // Hours of the day
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'All Open',
        type: 'line',
        // stack: 'total', // Stacking multiple lines for different users might make it hard to read
        areaStyle: {},
        emphasis: { focus: 'series' },
        data: getDataForSeries('all', 'open'),
        itemStyle: { color: '#4A90E2' } // Blue
      },
      {
        name: 'All Closed',
        type: 'line',
        // stack: 'total',
        areaStyle: {},
        emphasis: { focus: 'series' },
        data: getDataForSeries('all', 'closed'),
        itemStyle: { color: '#7ED321' } // Green
      },
      {
        name: 'User A Open',
        type: 'line',
        // stack: 'total',
        areaStyle: {},
        emphasis: { focus: 'series' },
        data: getDataForSeries('userA', 'open'),
        itemStyle: { color: '#FF7F50' } // Coral for User A
      },
      {
        name: 'User A Closed',
        type: 'line',
        // stack: 'total',
        areaStyle: {},
        emphasis: { focus: 'series' },
        data: getDataForSeries('userA', 'closed'),
        itemStyle: { color: '#BA55D3' } // Medium Orchid for User A
      },
      {
        name: 'User B Open',
        type: 'line',
        // stack: 'total',
        areaStyle: {},
        emphasis: { focus: 'series' },
        data: getDataForSeries('userB', 'open'),
        itemStyle: { color: '#FFD700' } // Gold for User B
      },
      {
        name: 'User B Closed',
        type: 'line',
        // stack: 'total',
        areaStyle: {},
        emphasis: { focus: 'series' },
        data: getDataForSeries('userB', 'closed'),
        itemStyle: { color: '#00CED1' } // Dark Turquoise for User B
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
      flex: '1 1 100%',
      minWidth: '600px',
    }}>
      <h3 style={{ marginTop: '0' }}>Hourly Ticket Trend (All, User A, User B)</h3>
      <ReactECharts option={options} style={{ height: '350px' }} />
    </div>
  );
};

export default HourlyTicketLineChart;