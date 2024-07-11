import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Login from './Services/Login';
import RecordForm from './Components/RecordForm';
import RecordTable from './Components/RecordTable';
import './App.css'; 

const App = () => {
  const [records, setRecords] = useState([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    axios.get('https://form-server-shzd.onrender.com/records')
    .then(response => {
      const sortedRecords = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setRecords(sortedRecords);
    })
    .catch(error => {
      console.error("There was an error fetching the records!", error);
    });
  }, []);

  const addRecord = (newRecord) => {
    axios.post('https://form-server-shzd.onrender.com/records', newRecord)
    .then(response => {
        setRecords([response.data, ...records]);
      })
    .catch(error => {
      console.error('Error creating record:', error);
    });
  };

  const updateStatus = (id, status) => {
    const updatedRecord = records.find(record => record.id === id);
    updatedRecord.status = status;
    axios.put(`https://form-server-shzd.onrender.com/records/${id}`, updatedRecord)
      .then(response => {
        const updatedRecords = records.map(record => record.id === id ? response.data : record);
        const sortedRecords = updatedRecords.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setRecords(sortedRecords);
      })
      .catch(error => {
        console.error("There was an error updating the record status!", error);
      });
  };

  if (!role) {
    return <Login setRole={setRole} />;
  }

  return (
    <div className='mainScreen'>
      <RecordForm addRecord={addRecord} />
      <RecordTable records={records} updateStatus={updateStatus} isAdmin={role === 'admin'} />
    </div>
  );
};

export default App;
