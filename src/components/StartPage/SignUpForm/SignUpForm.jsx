import React, { useState } from 'react';
import './SignUpForm.css';

const SignUpForm = ({ onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    console.log("Submitting signup form...");
    e.preventDefault();
    // Handle sign up logic here
    // console.log('Full Name:', fullName);
    // console.log('Email:', email);
    // console.log('Username:', username);
    // console.log('Password:', password);

    const signUpData = {
      fullName,
      email,
      username,
      password
    };

    try {
      const response = await fetch('http://localhost:3000/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signUpData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Signed up successfully');
      } else {
        console.log('Error signing up:', data.message);
      }
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="form-container">
      <button className="close-button" onClick={onClose}>×</button>
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