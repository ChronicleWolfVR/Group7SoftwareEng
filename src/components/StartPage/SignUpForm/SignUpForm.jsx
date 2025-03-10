import React, { useState } from 'react';
import './SignUpForm.css';
import { useNavigate } from 'react-router-dom';

// SignUpForm component
const SignUpForm = ({ onClose, onSignUpSuccess }) => {
  const navigate = useNavigate(); // Hook for navigation
  const [fullName, setFullName] = useState(''); // State variable for full name
  const [email, setEmail] = useState(''); // State variable for email
  const [username, setUsername] = useState(''); // State variable for username
  const [password, setPassword] = useState(''); // State variable for password

  // Handle form submission
  const handleSubmit = async (e) => {
    console.log("Submitting signup form...");
    e.preventDefault(); // Prevent default form submission behavior

    // Object with user sign up data
    const signUpData = {
      fullName,
      email,
      username,
      password
    };

    // Sending a POST request to the server
    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }, // Setting content type
        body: JSON.stringify(signUpData) // Converting to JSON as the request body
      });

      const data = await response.json(); // Parsing the response

      if (response.ok) {
        console.log('Signed up successfully');
        alert('Signed up successfully');

        // Calling the onSignUpSuccess function as a prop
        onSignUpSuccess();
        // Redirecting to the login page/form
        setTimeout(() => {navigate('/login')}, 100); 
        // Closing the form
        // onClose();

        // setTimeout(onSignUpSuccess,100);

      } else {
        console.log('Error signing up:', data.message);
        alert('Error signing up. Please try again.');
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="form-container">
      {/* Close button */}
      <button className="close-button" onClick={onClose}>×</button>
      
      {/* Sign up form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;