// src/components/IssueBarChart.js
import React from 'react';
import ReactECharts from 'echarts-for-react';

const IssueBarChart = ({ data }) => {
  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: data.map(item => item.assignee).reverse() // Reverse for horizontal bar chart
    },
    series: [
      {
        name: 'Issues',
        type: 'bar',
        data: data.map(item => item.issues).reverse(), // Reverse to match yAxis
        itemStyle: {
          color: '#5470C6' // A nice blue color
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
      flex: 2,
      minWidth: '400px',
    }}>
      <h3 style={{ marginTop: '0' }}>GitLab Issues by Assignee</h3>
      <ReactECharts option={options} style={{ height: '300px' }} />
    </div>
  );
};

export default IssueBarChart;