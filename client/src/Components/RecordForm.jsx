import React, { useState } from 'react';

const RecordForm = ({ addRecord }) => {
  const [record, setRecord] = useState({
    quantity: '',
    amount: '',
    actionType: '',
    actionName: '',
    Impact: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecord({ ...record, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRecord = {
      ...record,
      status: 'in progress',
      postingYear: new Date().getFullYear(),
      postingMonth: new Date().toLocaleString('default', { month: 'long' })
    };
    addRecord(newRecord);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <input type="number" name="quantity" value={record.quantity} onChange={handleChange} placeholder="Quantity" required />
      <input type="number" name="amount" value={record.amount} onChange={handleChange} placeholder="Amount" required />
      <select name="actionType" value={record.actionType} onChange={handleChange}>
        <option value="Type1">Type-1</option>
        <option value="Type2">Type-2</option>
        <option value="Type3">Type-3</option>
      </select>
      <select name="actionName" value={record.actionName} onChange={handleChange}>
        <option value="Action1">Action-1</option>
        <option value="Action2">Action-2</option>
        <option value="Action3">Action-3</option>
        <option value="Action4">Action-4</option>
        <option value="Action5">Action-5</option>
      </select>
      <select name="Impact" value={record.Impact} onChange={handleChange}>
        <option value="Low">Low</option>
        <option value="Mid">Mid</option>
        <option value="High">High</option>
      </select>
      <button type="submit">Add Record</button>
    </form>
    </div>
  );
};

export default RecordForm;

