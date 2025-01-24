import React, { useState } from "react";
import Title from "./components/Title/Title";
import Button from "./components/Button/Button";
import LoginForm from "./components/LoginForm/LoginForm";

function App() {
  const [isVisible, setIsVisible] = useState(true);

  const handleButtonClick = () => {
    setIsVisible(false);
  };

  return (
    <>
      <div id="centered-container">
        <main>
          {isVisible && (
            <>
              <section id="title">
                <Title id="titlep1">Welcome to</Title>
                <Title id="titlep2">Smart Homes</Title>
              </section>
              <Button id="button1" onClick={handleButtonClick}>
                Login
              </Button>
              <Button id="button2" onClick={handleButtonClick}>
                Sign up
              </Button>
            </>
          )}
          {!isVisible && (
            <section id="Login">
              <Title id="titlep1">Welcome to</Title>
              <Title id="titlep2">Smart Homes</Title>
              <LoginForm />
            </section>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
