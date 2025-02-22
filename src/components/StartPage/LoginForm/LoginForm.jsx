import React, { useState } from 'react';
import './LoginForm.css';

const LoginForm = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin") {
      console.log('Logged in successfully');
      onLoginSuccess(); // Call the onLoginSuccess function
    } else {
      console.log('Invalid credentials');
    }

    const loginData = {
      username,
      password
    }
  

  try {
    const response = await fetch('http://localhost:3000/api/users/login',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Logged in successfully');
        onLoginSuccess(); // Call the onLoginSuccess function
      } else {
        console.log('Invalid credentials', data.message);
        
      }
      } catch (error) {
        console.error('Error logging in:', error);
        
      }
  };

  return (
    <div className="form-container">
      <button className="close-button" onClick={onClose}>×</button>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};


export default LoginForm;