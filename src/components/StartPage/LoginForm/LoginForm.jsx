import React, { useState } from 'react';
import './LoginForm.css';

// LoginForm component
const LoginForm = ({ onClose, onLoginSuccess }) => {
  // State variables for username, password, and error message
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Object with the user's login data
    const loginData = {
      username,
      password
    };

    if (username=="admin" && password=="admin") {
      console.log('Logged in successfully');
      onLoginSuccess(); // Call the onLoginSuccess function
      setErrorMessage(''); // Clear any previous error message
      return;
    } else {
      console.log('Invalid credentials');
      setErrorMessage('Incorrect username or password'); // Set error message
    }

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
        setErrorMessage(''); // Clear any previous error message
      } else {
        console.log('Invalid credentials', data.message);
        setErrorMessage('Incorrect username or password'); // Set error message
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setErrorMessage('Error logging in. Please try again later.'); // Set error message
    }
  };

  return (
    <div className="formContainer">
      {/* Close button */}
      <button className="closeButton1" onClick={onClose}>×</button>
      
      {/* Login form */}
      <form className='loginForm' onSubmit={handleSubmit}>
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
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;