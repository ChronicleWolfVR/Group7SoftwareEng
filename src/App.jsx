import React, { useState } from 'react';
import Title from './components/Title/Title';
import Button from './components/Button/Button';
import LoginForm from './components/LoginForm/LoginForm';
import SignUpForm from './components/SignUpForm/SignUpForm'; // Assuming you have a SignUpForm component

function App() {
  const [formType, setFormType] = useState(null);

  const handleLoginClick = () => {
    setFormType('login');
  };

  const handleSignUpClick = () => {
    setFormType('signup');
  };

  return (
    <>
      <div id="centered-container">
        <main>
          {!formType && (
            <>
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
            </>
          )}
          {formType === 'login' && (
            <section id="Login">
              <Title id="titlep1">Welcome to</Title>
              <Title id="titlep2">Smart Homes</Title>
              <LoginForm />
            </section>
          )}
          {formType === 'signup' && (
            <section id="SignUp">
              <Title id="titlep1">Welcome to</Title>
              <Title id="titlep2">Smart Homes</Title>
              <SignUpForm />
            </section>
          )}
        </main>
      </div>
    </>
  );
}

export default App;