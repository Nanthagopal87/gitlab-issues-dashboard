import React, { useState } from 'react';
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
      }
    ]
  };

  // Track which status is selected
  const [selectedStatus, setSelectedStatus] = useState('Open');

  // Prepare Y-axis (users)
  const userNames = mockData.users.map(u => u.name);

  // Build stacked series based on selected status
  const series = mockData.labels.map(label => ({
    name: label,
    type: 'bar',
    stack: selectedStatus, // stack per status
    label: {
      show: true,
      formatter: (params) => params.value > 0 ? params.value : '',
      position: 'inside',
    },
    emphasis: { focus: 'series' },
    data: mockData.users.map(
      u => u.issuesByStatusAndLabel[selectedStatus][label] ?? 0
    )
  }));

  const options = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' }},
    legend: {
      data: mockData.labels,
      bottom: '0%' 
    },
    grid: { left: '3%', right: '4%', bottom: '10%', containLabel: true },
    xAxis: { type: 'value' },
    yAxis: { type: 'category', data: userNames },
    series
  };

  return (
    <div style={{
      backgroundColor: '#fff',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      flex: 2,
      minWidth: '500px',
    }}>
      <h3>GitLab Issues By User (Stacked)</h3>

      {/* 🔥 Status Dropdown */}
      <select
        value={selectedStatus}
        onChange={e => setSelectedStatus(e.target.value)}
        style={{
          marginBottom: '10px',
          padding: '6px 10px',
          borderRadius: '6px',
          border: '1px solid #ccc'
        }}
      >
        {mockData.statuses.map(status => (
          <option key={status} value={status}>{status}</option>
        ))}
      </select>

      <ReactECharts option={options} style={{ height: '350px' }} />
    </div>
  );
};

export default IssueByUsersStackedBarChart;
