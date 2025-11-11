// src/components/GcpResourcesTreeChart.js
import React from 'react';
import ReactECharts from 'echarts-for-react';

const GcpResourcesTreeChart = () => {
  // --- Mock Data for a GCP Project's Resources ---
  // The structure is perfect for ECharts Tree chart as well.
  // We'll wrap it in an array as ECharts tree expects an array of roots.
  const mockTreeData = [
    {
      name: 'my-gcp-project-12345', // Top-level: The GCP Project
      children: [
        {
          name: 'API Enabled',
          children: [
            { name: 'Compute Engine API' },
            { name: 'Cloud Storage API' },
            { name: 'BigQuery API' },
            { name: 'Cloud Pub/Sub API' },
          ]
        },
        {
          name: 'IAM & Admin',
          children: [
            { name: 'IAM Policies', children: [
                { name: 'Project Editor' },
                { name: 'Storage Object Admin' },
                { name: 'BigQuery User' },
            ]},
            { name: 'Service Accounts', children: [
                { name: 'compute-engine-sa' },
                { name: 'cloud-run-sa' },
            ]},
            { name: 'Groups', children: [
                { name: 'gcp-devs@example.com' },
                { name: 'gcp-admins@example.com' },
            ]},
          ]
        },
        {
          name: 'Compute',
          children: [
            { name: 'VM Instances', children: [
                { name: 'instance-web-01' },
                { name: 'instance-db-01' },
            ]},
            { name: 'Managed Instance Groups', children: [
                { name: 'web-mig' },
            ]},
            { name: 'Cloud Run Services', children: [
                { name: 'my-api-service' },
            ]},
          ]
        },
        {
          name: 'Storage',
          children: [
            { name: 'Cloud Storage Buckets', children: [
                { name: 'my-app-data-bucket' },
                { name: 'logs-archive-bucket' },
            ]},
          ]
        },
        // Add more resource categories as needed (e.g., Networking, Databases, BigQuery Datasets)
      ]
    }
  ];

  const options = {
    tooltip: {
      trigger: 'item',
      triggerOn: 'mousemove'
    },
    series: [
      {
        type: 'tree',
        data: mockTreeData, // ECharts expects an array of roots for tree charts
        top: '1%',
        left: '7%',
        bottom: '1%',
        right: '20%', // Adjust right to give more space for labels on the right
        symbolSize: 7, // Size of the nodes
        orient: 'LR', // Layout from left to right
        expandAndCollapse: true, // Allow collapsing/expanding nodes
        label: {
          position: 'left', // Position labels to the left of the nodes
          verticalAlign: 'middle',
          align: 'right',
          fontSize: 10
        },
        leaves: {
          label: {
            position: 'right', // Leaves should have labels on the right
            verticalAlign: 'middle',
            align: 'left'
          }
        },
        emphasis: {
          focus: 'descendant' // Highlight descendants on hover
        },
        // Styling for the lines connecting nodes
        lineStyle: {
          color: '#ccc', // Lighter lines
          width: 1
        },
        // Initial depth to expand
        initialTreeDepth: 2 // Expand the first 2 levels by default
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
      height: '600px', // Explicit height for the tree chart container
      overflow: 'auto' // Add scroll if content overflows
    }}>
      <h3 style={{ marginTop: '0' }}>GCP Project Resources Tree: my-gcp-project-12345</h3>
      <ReactECharts option={options} style={{ height: '100%' }} />
    </div>
  );
};

export default GcpResourcesTreeChart;