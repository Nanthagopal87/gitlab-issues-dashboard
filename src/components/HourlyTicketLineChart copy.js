// src/components/HourlyTicketLineChart.js
import React from 'react';
import ReactECharts from 'echarts-for-react';

const HourlyTicketLineChart = () => {
  // --- Mock Data ---
  // In a real application, this data would be aggregated by your backend
  // based on the 'created_at' and 'closed_at' timestamps of your issues.
  // This example assumes data for a single day, hour by hour.
  const mockHours = Array.from({ length: 24 }, (_, i) => `${i.toString().padStart(2, '0')}:00`);

  const mockOpenTicketData = Array.from({ length: 24 }, () => Math.floor(Math.random() * 20) + 10); // Random numbers for open tickets
  const mockClosedTicketData = Array.from({ length: 24 }, () => Math.floor(Math.random() * 15) + 5); // Random numbers for closed tickets

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
      data: ['Open Tickets', 'Closed Tickets'],
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
        name: 'Open Tickets',
        type: 'line',
        stack: 'total', // Stacks visually if desired, but for trends, often not stacked
        areaStyle: {}, // Fill the area below the line
        emphasis: {
          focus: 'series'
        },
        data: mockOpenTicketData,
        itemStyle: {
          color: '#4A90E2' // Blue for open
        }
      },
      {
        name: 'Closed Tickets',
        type: 'line',
        stack: 'total',
        areaStyle: {}, // Fill the area below the line
        emphasis: {
          focus: 'series'
        },
        data: mockClosedTicketData,
        itemStyle: {
          color: '#7ED321' // Green for closed
        }
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
      flex: '1 1 100%', // Takes full width in its row
      minWidth: '600px',
    }}>
      <h3 style={{ marginTop: '0' }}>Hourly Ticket Trend (Open vs. Closed)</h3>
      <ReactECharts option={options} style={{ height: '350px' }} />
    </div>
  );
};

export default HourlyTicketLineChart;