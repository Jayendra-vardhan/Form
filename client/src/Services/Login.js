import React from 'react';
import '../App.css'; 

const Login = ({ setRole }) => {
  return (
    <div>
        <div className="ButtonContainer">
          <button className="Button" onClick={() => setRole('admin')}>Login as Admin</button>
          <button className="Button" onClick={() => setRole('user')}>Login as User</button>
        </div>
    </div>
  );
};

export default Login;

