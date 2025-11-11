// src/components/IssueLabelStackedBarChart.js
import React from 'react';
import ReactECharts from 'echarts-for-react';

const IssueByUsersStackedBarChart = () => {

  const mockData = {
    labels: ['bug', 'feature', 'refactor', 'documentation', 'urgent'],
    statuses: ['Open', 'Closed'],
    users: [
      {
        name: 'Sarah K',
        issuesByStatusAndLabel: {
          Open:   { bug: 6, feature: 9, refactor: 2, documentation: 1, urgent: 1 },
          Closed: { bug: 4, feature: 6, refactor: 3, documentation: 2, urgent: 1 }
        }
      },
      {
        name: 'Mike L',
        issuesByStatusAndLabel: {
          Open:   { bug: 5, feature: 7, refactor: 4, documentation: 2, urgent: 0 },
          Closed: { bug: 3, feature: 5, refactor: 3, documentation: 3, urgent: 1 }
        }
      },
      {
        name: 'Emily R',
        issuesByStatusAndLabel: {
          Open:   { bug: 7, feature: 6, refactor: 3, documentation: 1, urgent: 1 },
          Closed: { bug: 5, feature: 4, refactor: 3, documentation: 1, urgent: 2 }
        }
      }
    ]
  };

  const userNames = mockData.users.map(u => u.name);

  // ✅ Generate series with name = label, stack = status
  const series = [];
  mockData.statuses.forEach(status => {
    mockData.labels.forEach(label => {
      series.push({
        name: label,              // Legend shows only the label name
        type: 'bar',
        stack: status,            // Stack grouped by status (Open vs Closed)
        label: {
          show: true,
          formatter: params => params.value > 0 ? params.value : '',
          position: 'inside'
        },
        emphasis: { focus: 'series' },
        data: mockData.users.map(
          user => user.issuesByStatusAndLabel?.[status]?.[label] ?? 0
        )
      });
    });
  });

  const options = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: {
      bottom: '0%',
      type: 'scroll',                  // Allows scrolling if many labels
      data: mockData.labels            // ✅ Only show labels here
    },
    grid: { left: '3%', right: '4%', bottom: '15%', containLabel: true },
    xAxis: { type: 'value' },
    yAxis: { type: 'category', data: userNames },
    series
  };

  return (
    <div style={{
      background: '#fff',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      minWidth: '600px'
    }}>
      <h3>GitLab Issues By User (Open vs Closed - Stacked by Label)</h3>
      <ReactECharts option={options} style={{ height: '400px' }} />
    </div>
  );
};

export default IssueByUsersStackedBarChart;
