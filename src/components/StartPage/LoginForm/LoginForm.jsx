import React, { useState } from 'react';
import './LoginForm.css';

// LoginForm component
const LoginForm = ({ onClose, onLoginSuccess }) => {
  // State variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Check if the username and password are correct
    if (username === "admin" && password === "admin") {
      console.log('Logged in successfully');
      onLoginSuccess(); // Call the onLoginSuccess function
    } else {
      console.log('Invalid credentials');
    }

    // Object with the user's login data
    const loginData = {
      username,
      password
    };

    // Sending a POST request to the server
    try {
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Setting content type
        body: JSON.stringify(loginData) // Converting to JSON as the request body
      });

      // Parsing the response
      const data = await response.json();

      // Check if the response is OK
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
      {/* Close button */}
      <button className="close-button" onClick={onClose}>×</button>
      
      {/* Login form */}
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