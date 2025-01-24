import React from 'react';
import Title from './components/Title';
import Button from './components/Button';

function App() {
  return (
    <>
      <div id="centered-container">
        <main>
          <Title id="titlep1">Welcome to</Title>
          <Title id="titlep2">Smart Homes</Title>

          <Button id="button1">Login</Button>
          <Button id="button2">Sign up</Button>
        </main>
      </div>
    </>
  );
}

export default App;
