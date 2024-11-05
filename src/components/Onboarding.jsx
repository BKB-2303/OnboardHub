// src/components/Onboarding.jsx

import { PDFDownloadLink } from '@react-pdf/renderer';
import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import EmployeeTaskManager from './EmployeeTaskManager.jsx';
import PDFDocument from './PDFDocument.jsx';
import ProgressChart from './ProgressChart.jsx';

const Onboarding = () => {
  const [content, setContent] = useState('');
  const [employees, setEmployees] = useState([]);

  // Data structure for the progress chart
  const [progressData, setProgressData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Onboarding Progress',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    // Calculate progress for the chart
    const updatedLabels = [];
    const updatedData = [];

    employees.forEach((employeeData) => {
      updatedLabels.push(employeeData.name); // Use employee's name directly
      const completedTasks = employeeData.tasks.filter(task => task.completed).length;
      const totalTasks = employeeData.tasks.length;
      const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
      updatedData.push(progress);
    });

    setProgressData({
      labels: updatedLabels,
      datasets: [{ ...progressData.datasets[0], data: updatedData }],
    });
  }, [employees]);

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">Employee Onboarding Report</h1>

      <h2 className="text-2xl font-semibold mb-2">Create Onboarding Document</h2>
      <p className='text-stone-900'>Design an engaging onboarding document to support employees as they adapt to their new role.</p>
      <ReactQuill className="mb-4 border rounded shadow-sm" value={content} onChange={setContent} />

      <EmployeeTaskManager employees={employees} setEmployees={setEmployees} />

      <div className="my-4">
        <ProgressChart data={progressData} />
      </div>

      <h2 className="text-2xl font-semibold mb-2">Download Report as PDF Format</h2>
      <PDFDownloadLink
        document={<PDFDocument content={content} employees={employees} progress={progressData} />}
        fileName="onboarding_document.pdf"
      >
        {({ loading }) => (
          <button className="bg-stone-950 text-white font-semibold py-2 px-4 rounded hover:bg-stone-800 transition duration-200">
            {loading ? 'Loading document...' : 'Download PDF'}
          </button>
        )}
      </PDFDownloadLink>
    </div>
  );
};

export default Onboarding;
