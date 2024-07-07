import React, { useState } from 'react';
//import Chart from './Chart';
import '../App.css'; 

const RecordForm = ({ addRecord }) => {
  const [record, setRecord] = useState({
    quantity: '',
    amount: '',
    actionType: '',
    actionName: '',
    Impact: ''
  });

  const [showChart, setShowChart] = useState(false);

  const toggleChart = () => {
    setShowChart(!showChart);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord({ ...record, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      ...record,
      status: 'pending',
      postingYear: new Date().getFullYear(),
      postingMonth: new Date().toLocaleString('default', { month: 'long' })
    };
    addRecord(newRecord);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input type="number" id="quantity" name="quantity" value={record.quantity} onChange={handleChange} placeholder="Quantity" required />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input type="number" id="amount" name="amount" value={record.amount} onChange={handleChange} placeholder="Amount" required />
        </div>
        <div className="form-group">
          <label htmlFor="actionType">Action Type</label>
          <select id="actionType" name="actionType" value={record.actionType} onChange={handleChange} required>
            <option value="Type1">Type-1</option>
            <option value="Type2">Type-2</option>
            <option value="Type3">Type-3</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="actionName">Action Name</label>
          <select id="actionName" name="actionName" value={record.actionName} onChange={handleChange} required>
            <option value="Action1">Action-1</option>
            <option value="Action2">Action-2</option>
            <option value="Action3">Action-3</option>
            <option value="Action4">Action-4</option>
            <option value="Action5">Action-5</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="Impact">Impact</label>
          <select id="Impact" name="Impact" value={record.Impact} onChange={handleChange} required>
            <option value="Low">Low</option>
            <option value="Mid">Mid</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="form-group">
          <button type="submit" className="form-button">Add Record</button>
          <button type="button" onClick={toggleChart} className="form-button">{showChart ? 'Hide Chart' : 'Show Chart'}</button>

        </div>
      </form>
    </div>
  );
};

export default RecordForm;

