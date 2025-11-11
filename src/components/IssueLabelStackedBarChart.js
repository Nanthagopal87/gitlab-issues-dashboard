// src/components/IssueLabelStackedBarChart.js
import React from 'react';
import ReactECharts from 'echarts-for-react';

const IssueLabelStackedBarChart = () => {
  // --- Mock Data ---
  // In a real application, this data would come from your backend
  // aggregated from GitLab issues and their labels.
  const mockData = {
    labels: ['bug', 'feature', 'refactor', 'documentation', 'urgent'],
    projects: [
      { name: 'Project A', issuesByLabel: { bug: 10, feature: 15, refactor: 5, documentation: 3, urgent: 2 } },
      { name: 'Project B', issuesByLabel: { bug: 8, feature: 12, refactor: 7, documentation: 5, urgent: 1 } },
      { name: 'Project C', issuesByLabel: { bug: 12, feature: 10, refactor: 6, documentation: 2, urgent: 3 } },
      { name: 'Project D', issuesByLabel: { bug: 5, feature: 8, refactor: 3, documentation: 7, urgent: 0 } },
    ]
  };

  // Prepare data for ECharts options
  const projectNames = mockData.projects.map(p => p.name);
  const series = mockData.labels.map(label => {
    return {
      name: label,
      type: 'bar',
      stack: 'total', // This is key for stacking
      label: {
        show: true,
        formatter: (params) => params.value > 0 ? params.value : '', // Only show label if value > 0
        position: 'inside', // Position label inside the bar segment
      },
      emphasis: {
        focus: 'series'
      },
      data: mockData.projects.map(project => project.issuesByLabel[label] || 0)
    };
  });

  const options = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: mockData.labels,
      bottom: '0%' // Position legend at the bottom
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '10%', // Adjust bottom to make space for legend
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: projectNames.reverse() // Reverse to display in natural order from top
    },
    series: series.reverse() // Reverse series order to match yAxis
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      flex: 2, // Take up more space if needed
      minWidth: '500px',
    }}>
      <h3 style={{ marginTop: '0' }}>Issues by Label Category (Stacked)</h3>
      <ReactECharts option={options} style={{ height: '350px' }} />
    </div>
  );
};

export default IssueLabelStackedBarChart;