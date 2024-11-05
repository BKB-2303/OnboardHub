

import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import React from 'react';


const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 20,
  },
  title: {
    fontSize: 18,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 10,
  },
  employeeHeader: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  task: {
    fontSize: 12,
    marginBottom: 2,
  },
  progressSection: {
    marginTop: 10,
  },
  progressText: {
    fontSize: 12,
    marginBottom: 2,
  },
});


const sanitizeHTML = (htmlString) => {
  const div = document.createElement('div');
  div.innerHTML = htmlString;
  return div.textContent || div.innerText || '';
};

const PDFDocument = ({ content, employees, progress }) => {
  const sanitizedContent = sanitizeHTML(content); 

  return (
    <Document>
      <Page style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.title}>Onboarding Document</Text>
          <Text>{sanitizedContent}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.employeeHeader}>Employee Task Manager</Text>
          {employees.map((employee, index) => (
            <View key={index} style={styles.section}>
              <Text>Employee {index + 1}</Text>
              {employee.tasks.length > 0 ? (
                employee.tasks.map((task, taskIndex) => (
                  <Text key={taskIndex} style={styles.task}>
                    {task.text} - {task.completed ? 'Completed' : 'Not Completed'}
                  </Text>
                ))
              ) : (
                <Text style={styles.task}>No tasks assigned</Text>
              )}
            </View>
          ))}
        </View>

        <View style={styles.progressSection}>
          <Text style={styles.employeeHeader}>Progress Overview</Text>
          {progress.labels.map((label, index) => (
            <Text key={index} style={styles.progressText}>
              {label}: {progress.datasets[0].data[index].toFixed(2)}%
            </Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
