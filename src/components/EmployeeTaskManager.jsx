// src/components/EmployeeTaskManager.jsx

import React, { useState } from 'react';

const EmployeeTaskManager = ({ employees, setEmployees }) => {
  const [employeeName, setEmployeeName] = useState('');
  const [taskText, setTaskText] = useState('');
  const [selectedEmployeeIndex, setSelectedEmployeeIndex] = useState(null);

  const handleAddEmployee = () => {
    if (employeeName) {
      setEmployees([...employees, { name: employeeName, tasks: [] }]);
      setEmployeeName('');
    }
  };

  const handleAddTask = () => {
    if (taskText && selectedEmployeeIndex !== null) {
      const updatedEmployees = [...employees];
      updatedEmployees[selectedEmployeeIndex].tasks.push({ text: taskText, completed: false });
      setEmployees(updatedEmployees);
      setTaskText('');
    }
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">Employee Task Manager</h2>
      
      <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Employee Name"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-950 w-52"
        />
        <button 
          onClick={handleAddEmployee} 
          className="ml-2 bg-stone-950 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition duration-200"
        >
          Add Employee
        </button>
      </div>

      <h3 className="font-semibold text-lg text-gray-700 mb-2">Employee List</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {employees.map((employee, index) => (
          <div key={index} className="mb-4 p-4 bg-white rounded-lg shadow-md">
            <h3 className="font-bold text-lg text-gray-700">{employee.name}</h3>
            <div className="flex mt-2">
              <input
                type="text"
                placeholder="New Task"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-950 flex-grow"
              />
              <button 
                onClick={() => {
                  handleAddTask();
                  setSelectedEmployeeIndex(index);
                }} 
                className="ml-2 bg-stone-950 text-white px-4 py-2 rounded-lg hover:bg-stone-800 transition duration-200"
              >
                Add Task
              </button>
            </div>
            {employee.tasks.map((task, taskIndex) => (
              <div key={taskIndex} className="flex items-center mt-2">
                <input 
                  type="checkbox" 
                  checked={task.completed} 
                  onChange={() => {
                    const updatedEmployees = [...employees];
                    updatedEmployees[index].tasks[taskIndex].completed = !task.completed;
                    setEmployees(updatedEmployees);
                  }} 
                  className="mr-2 h-5 w-5 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <span className={`flex-grow ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                  {task.text}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmployeeTaskManager;
