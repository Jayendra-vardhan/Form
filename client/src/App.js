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
    axios.get('http://localhost:5000/records').then(response => {
      setRecords(response.data);
    });
  }, []);

  const addRecord = (newRecord) => {
    axios.post('http://localhost:5000/records', newRecord).then(response => {
      setRecords([response.data, ...records]);
    });
  };

  const updateStatus = (id, status) => {
    const updatedRecord = records.find(record => record.id === id);
    updatedRecord.status = status;
    axios.put(`http://localhost:5000/records/${id}`, updatedRecord).then(response => {
      setRecords(records.map(record => record.id === id ? response.data : record));
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
