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

  // Status Colors
  const statusColors = {
    Open: '#4CAF50',   // Green
    Closed: '#F44336', // Red
  };

  // Build Stacked Series
  const series = [];
  mockData.statuses.forEach(status => {
    mockData.labels.forEach(label => {
      series.push({
        name: label,
        type: 'bar',
        stack: status,
        //itemStyle: { color: statusColors[status] },
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

  // Compute Totals Per User
  const totalsByUser = mockData.users.map(user =>
    mockData.labels.reduce((sum, label) => {
      const openVal = user.issuesByStatusAndLabel.Open?.[label] ?? 0;
      const closedVal = user.issuesByStatusAndLabel.Closed?.[label] ?? 0;
      return sum + openVal + closedVal;
    }, 0)
  );

  // Add Total Series (not stacked)
  series.push({
    name: 'Total',
    type: 'bar',
    label: { show: true, position: 'right', fontWeight: 'bold' },
    itemStyle: { color: '#efd1d1ff' },
    emphasis: { focus: 'series' },
    data: totalsByUser
  });

  const options = {
    // ✅ Enhanced Tooltip
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: (params) => {
        const userIndex = params[0].dataIndex;
        const user = mockData.users[userIndex];

        let openSection = '';
        let closedSection = '';

        mockData.labels.forEach(label => {
          const openVal = user.issuesByStatusAndLabel.Open?.[label] ?? 0;
          const closedVal = user.issuesByStatusAndLabel.Closed?.[label] ?? 0;

          if (openVal > 0) openSection += `&nbsp;&nbsp;${label}: <b>${openVal}</b><br/>`;
          if (closedVal > 0) closedSection += `&nbsp;&nbsp;${label}: <b>${closedVal}</b><br/>`;
        });

        const total = totalsByUser[userIndex];

        return `
          <b>${user.name}</b><br/><br/>
          <span style="color:#4CAF50;">Open:</span><br/>
          ${openSection || '&nbsp;&nbsp;None<br/>'}
          <span style="color:#F44336;">Closed:</span><br/>
          ${closedSection || '&nbsp;&nbsp;None<br/>'}
          <hr style="margin:4px 0;"/>
          Total: <b>${total}</b>
        `;
      }
    },

    // Two Legends
    legend: [
      {
        top: '0%',
        orient: 'horizontal',
        left: 'center',
        data: mockData.statuses,
      },
      {
        bottom: '0%',
        type: 'scroll',
        data: mockData.labels
      }
    ],

    grid: { left: '3%', right: '4%', bottom: '18%', containLabel: true },
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
      minWidth: '650px'
    }}>
      <h3>GitLab Issues By User (Open vs Closed - Stacked by Label)</h3>
      <ReactECharts option={options} style={{ height: '450px' }} />
    </div>
  );
};

export default IssueByUsersStackedBarChart;
