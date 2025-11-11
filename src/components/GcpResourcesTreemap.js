// src/components/GcpResourcesTreemap.js
import React from 'react';
import ReactECharts from 'echarts-for-react';

const GcpResourcesTreemap = () => {
  // --- Mock Data for a GCP Project's Resources ---
  // The 'value' field can be used for the size of the rectangle.
  // For simply showing presence, we can use a small arbitrary value.
  const baseValue = 1; // Arbitrary value for presence/existence

  const mockTreemapData = [
    {
      name: 'my-gcp-project-12345', // Top-level: The GCP Project
      value: baseValue, // Overall project representation
      children: [
        {
          name: 'API Enabled',
          value: baseValue,
          children: [
            { name: 'Compute Engine API', value: baseValue },
            { name: 'Cloud Storage API', value: baseValue },
            { name: 'BigQuery API', value: baseValue },
            { name: 'Cloud Pub/Sub API', value: baseValue },
          ]
        },
        {
          name: 'IAM & Admin',
          value: baseValue,
          children: [
            { name: 'IAM Policies', value: baseValue, children: [
                { name: 'Project Editor', value: baseValue },
                { name: 'Storage Object Admin', value: baseValue },
                { name: 'BigQuery User', value: baseValue },
            ]},
            { name: 'Service Accounts', value: baseValue, children: [
                { name: 'compute-engine-sa', value: baseValue },
                { name: 'cloud-run-sa', value: baseValue },
            ]},
            { name: 'Groups', value: baseValue, children: [
                { name: 'gcp-devs@example.com', value: baseValue },
                { name: 'gcp-admins@example.com', value: baseValue },
            ]},
          ]
        },
        {
          name: 'Compute',
          value: baseValue,
          children: [
            { name: 'VM Instances', value: baseValue, children: [
                { name: 'instance-web-01', value: baseValue },
                { name: 'instance-db-01', value: baseValue },
            ]},
            { name: 'Managed Instance Groups', value: baseValue, children: [
                { name: 'web-mig', value: baseValue },
            ]},
            { name: 'Cloud Run Services', value: baseValue, children: [
                { name: 'my-api-service', value: baseValue },
            ]},
          ]
        },
        {
          name: 'Storage',
          value: baseValue,
          children: [
            { name: 'Cloud Storage Buckets', value: baseValue, children: [
                { name: 'my-app-data-bucket', value: baseValue },
                { name: 'logs-archive-bucket', value: baseValue },
            ]},
          ]
        },
        // Add more resource categories as needed (e.g., Networking, Databases, BigQuery Datasets)
      ]
    }
  ];

  const options = {
    tooltip: {
      formatter: function (info) {
        // Customize tooltip to show the path of the resource
        let treePathInfo = info.treePathInfo;
        let html = '';
        for (let i = 1; i < treePathInfo.length; i++) {
          html +=
            (i === 1 ? '' : ' > ') +
            '<span style="font-weight: bold">' +
            treePathInfo[i].name +
            '</span>';
        }
        return html;
      }
    },
    series: [
      {
        name: 'GCP Resources',
        type: 'treemap',
        width: '98%',
        height: '98%',
        roam: false, // Disable zoom/pan
        nodeClick: false, // Disable node clicking if you don't need drill-down
        breadcrumb: {
          show: true // Show navigation breadcrumbs
        },
        data: mockTreemapData,
        label: {
          show: true,
          formatter: '{b}' // Display the name of the node
        },
        itemStyle: {
          borderColor: '#fff'
        },
        levels: [
          {
            itemStyle: {
              borderColor: '#777',
              borderWidth: 0,
              gapWidth: 1
            },
            upperLabel: {
              show: false // No upper label for the very first level (project name)
            }
          },
          {
            itemStyle: {
              borderColor: '#555',
              borderWidth: 5,
              gapWidth: 1
            },
            emphasis: {
              itemStyle: {
                borderColor: '#DDD'
              }
            }
          },
          {
            itemStyle: {
              borderColor: '#555',
              borderWidth: 2,
              gapWidth: 1
            },
            emphasis: {
              itemStyle: {
                borderColor: '#DDD'
              }
            }
          },
          {
            itemStyle: {
              borderColor: '#555',
              borderWidth: 1,
              gapWidth: 1
            },
            emphasis: {
              itemStyle: {
                borderColor: '#DDD'
              }
            }
          }
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
      flex: '1 1 100%', // Takes full width in its row
      minWidth: '600px',
      height: '600px', // Explicit height for the treemap container
    }}>
      <h3 style={{ marginTop: '0' }}>GCP Project Resources: my-gcp-project-12345</h3>
      <ReactECharts option={options} style={{ height: '100%' }} />
    </div>
  );
};

export default GcpResourcesTreemap;