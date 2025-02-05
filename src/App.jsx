import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Title from './components/Title/Title';
import Button from './components/Button/Button';
import LoginForm from './components/StartPage/LoginForm/LoginForm';
import SignUpForm from './components/StartPage/SignUpForm/SignUpForm';
import HomePage from './components/HomePage/HomePage'; // Ensure you have this component
import './index.css'; // Ensure you import the CSS file

function App() {
  const [formType, setFormType] = useState(null);
  const [fadeClass, setFadeClass] = useState('');
  const [titleFadeClass, setTitleFadeClass] = useState('');
  const [hasTitleDisplayed, setHasTitleDisplayed] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate('/home'); // Navigate to the home page
  };

  const handleLoginClick = () => {
    setTitleFadeClass('fade-out');
    setTimeout(() => {
      setFormType('login');
      setFadeClass('fade-in');
    }, 500);
  };

  const handleSignUpClick = () => {
    setTitleFadeClass('fade-out');
    setTimeout(() => {
      setFormType('signup');
      setFadeClass('fade-in');
    }, 500);
  };

  const handleCloseForm = () => {
    setFadeClass('fade-out');
    setTimeout(() => {
      setFormType(null);
      setFadeClass('');
      setTitleFadeClass('fade-in');
    }, 500);
  };

  return (
    <div id="centered-container">
      <main>
        {!formType && (
          <>
          <div className={titleFadeClass}>
            <section id="title">
              <Title id="titlep1">Welcome to</Title>
              <Title id="titlep2">Smart Homes</Title>
            </section>
            <Button id="button1" onClick={handleLoginClick}>
              Login
            </Button>
            <Button id="button2" onClick={handleSignUpClick}>
              Sign up
            </Button>
          </div>
          </>
        )}
        {formType === 'login' && (
          <section id="Login" className={fadeClass}>
            <Title id="titlep1">Welcome to</Title>
            <Title id="titlep2">Smart Homes</Title>
            <LoginForm onClose={handleCloseForm} onLoginSuccess={handleLoginSuccess} />
          </section>
        )}
        {formType === 'signup' && (
          <section id="SignUp" className={fadeClass}>
            <Title id="titlep1">Welcome to</Title>
            <Title id="titlep2">Smart Homes</Title>
            <SignUpForm onClose={handleCloseForm} />
          </section>
        )}
      </main>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<App />} />
      </Routes>
    </Router>
  );
}

export default AppWrapper;