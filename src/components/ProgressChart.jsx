// src/components/ProgressChart.js

import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

const ProgressChart = ({ data }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Onboarding Progress Chart</h2>
      <Bar 
        data={data} 
        options={{
          responsive: true,
          plugins: {
            legend: {
              labels: {
                font: {
                  size: 16,
                  family: 'Arial',
                  weight: 'bold',
                },
                color: '#333',
              },
            },
            tooltip: {
              titleFont: {
                size: 14,
                weight: 'bold',
              },
              bodyFont: {
                size: 12,
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: '#333',
              },
            },
            y: {
              ticks: {
                color: '#333',
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default ProgressChart;
