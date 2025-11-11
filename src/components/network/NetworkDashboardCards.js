// src/components/NetworkDashboardCards.js
import React from 'react';
import Card from '../card'; // Re-use the existing Card component

const NetworkDashboardCards = () => {
  // --- Mock Data ---
  const mockCardData = [
    { title: 'Total Projects', value: 15, color: '#3498DB' },
    { title: 'Total Cost (Monthly)', value: '€25,450', color: '#27AE60' },
    { title: 'Compute Cost', value: '€12,100', color: '#F39C12' },
    { title: 'Storage Cost', value: '€5,200', color: '#E74C3C' },
    { title: 'BigQuery Cost', value: '€3,150', color: '#9B59B6' },
    // You could add more, e.g., 'Network Cost'
  ];

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      marginBottom: '20px',
      gap: '10px' // Add some space between cards
    }}>
      {mockCardData.map((card, index) => (
        <Card
          key={index}
          title={card.title}
          value={card.value}
          color={card.color}
          // Assuming the Card component can intelligently handle string values without a 'unit' prop
        />
      ))}
    </div>
  );
};

export default NetworkDashboardCards;