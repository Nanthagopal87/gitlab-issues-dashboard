// src/components/Dashboard.js
import React from 'react';
import Card from './card';
import IssueBarChart from './issue-bar-chart';
import IssuePieChart from './IssuePieChart';
import IssueLabelStackedBarChart from './IssueLabelStackedBarChart';
import HourlyTicketLineChart from './HourlyTicketLineChart';
import NetworkDashboardCards from './NetworkDashboardCards';
import GcpResourcesTreemap from './GcpResourcesTreemap';
import GcpResourcesTreeChart from './GcpResourcesTreeChart';

const Dashboard = () => {
  // --- Dummy Data (In a real app, this would come from your GitLab API) ---
  const dummyCardData = [
    { title: 'Total Open Issues', value: 452, color: '#4A90E2', textColor: '#fff' },
    { title: 'Total Closed Issues', value: 1289, color: '#7ED321', textColor: '#fff' },
    { title: 'Average Age of Open Issues', value: 7.5, unit: ' days', color: '#F5A623', textColor: '#fff' },
    { title: 'Urgent Issues', value: 15, color: '#D0021B', textColor: '#fff' },
  ];

  const dummyBarChartData = [
    { assignee: 'John S', issues: 85 },
    { assignee: 'Sarah K', issues: 65 },
    { assignee: 'Mike L', issues: 40 },
    { assignee: 'Emily R', issues: 75 },
    { assignee: 'David B', issues: 30 },
    { assignee: 'Alice M', issues: 50 },
  ];


  // --- End Dummy Data ---

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', backgroundColor: '#f4f7f6', minHeight: '100vh' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>GitLab Issues Dashboard</h1>

      {/* Cards Section */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', marginBottom: '20px' }}>
        {dummyCardData.map((card, index) => (
          <Card
            key={index}
            title={card.title}
            value={card.value}
            unit={card.unit}
            color={card.color}
            // You can pass textColor if your Card component supports it
          />
        ))}
      </div>

      {/* Charts Section */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        <IssueBarChart data={dummyBarChartData} />

         <IssuePieChart
          openCount={5}
          closedCount={10}
        />
         <IssueLabelStackedBarChart />

         {/* Add the new Hourly Line Chart, taking full width */}
        <HourlyTicketLineChart />

        {/* You can add more charts here, e.g., a Pie Chart for Open vs. Closed */}
        {/* <div style={{
          backgroundColor: '#fff',
          borderRadius: '8px',
          padding: '20px',
          margin: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          flex: 1,
          minWidth: '300px',
        }}>
          <h3>Open vs. Closed Issues</h3>
          <p>This is where another EChart (e.g., Pie Chart) would go.</p>
        </div> */}

      </div>

        <NetworkDashboardCards />

      {/* Treemap Section */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {/* <GcpResourcesTreemap /> */}
        <GcpResourcesTreeChart />
      </div>

    </div>
  );
};

export default Dashboard;