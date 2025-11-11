// src/components/Card.js
import React from 'react';

const Card = ({ title, value, unit, color }) => {
  return (
    <div style={{
      backgroundColor: color || '#f0f0f0',
      borderRadius: '8px',
      padding: '20px',
      margin: '10px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      flex: 1,
      minWidth: '200px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#333' // Default text color
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2em', textAlign: 'center' }}>{title}</h3>
      <p style={{ margin: '0', fontSize: '2.5em', fontWeight: 'bold' }}>{value}{unit}</p>
    </div>
  );
};

export default Card;