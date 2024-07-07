import React from 'react';

const RecordTable = ({ records, updateStatus, isAdmin }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Quantity</th>
          <th>Amount</th>
          <th>Posting Year</th>
          <th>Posting Month</th>
          <th>Action Type</th>
          <th>Action Name</th>
          <th>Status</th>
          <th>Impact</th>
        </tr>
      </thead>
      <tbody>
        {records.map(record => (
          <tr key={record.id}>
            <td>{record.id}</td>
            <td>{record.quantity}</td>
            <td>{record.amount}</td>
            <td>{record.postingYear}</td>
            <td>{record.postingMonth}</td>
            <td>{record.actionType}</td>
            <td>{record.actionName}</td>
            <td>
              {isAdmin ? (
                <select value={record.status} onChange={(e) => updateStatus(record.id, e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Approved">Approved</option>
                </select>
              ) : (
                record.status
              )}
            </td>
            <td>{record.Impact}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RecordTable;

