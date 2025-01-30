import React, { useState } from "react";
import Title from "./components/Title/Title";
import Button from "./components/Button/Button";
import LoginForm from "./components/LoginForm/LoginForm";
import SignUpForm from "./components/SignUpForm/SignUpForm";
import "./index.css";

function App() {
  // State to track the current form type (login or signup)
  const [formType, setFormType] = useState(null);
  // State to manage fade-in and fade-out classes for form transitions
  const [fadeClass, setFadeClass] = useState("");
  // State to manage fade-in and fade-out classes for title transitions
  const [titleFadeClass, setTitleFadeClass] = useState("");

  // Handle form button click to show the selected form with fade effect
  const handleFormClick = (type) => {
    setTitleFadeClass("fade-out");
    setTimeout(() => {
      setFormType(type);
      setFadeClass("fade-in");
    }, 500);
  };

  // Handle form close action to hide the form with fade effect
  const handleCloseForm = () => {
    setFadeClass("fade-out");
    setTimeout(() => {
      setFormType(null);
      setFadeClass("");
      setTitleFadeClass("fade-in");
    }, 500);
  };

  // Render the appropriate form section based on the form type
  const renderFormSection = () => {
    if (formType === "login") {
      return (
        <section id="Login" className={fadeClass}>
          <CommonTitle />
          <LoginForm onClose={handleCloseForm} />
        </section>
      );
    } else if (formType === "signup") {
      return (
        <section id="SignUp" className={fadeClass}>
          <CommonTitle />
          <SignUpForm onClose={handleCloseForm} />
        </section>
      );
    }
    return null;
  };

  // Common title component used in both the main section and form sections
  const CommonTitle = () => (
    <>
      <Title id="titlep1">Welcome to</Title>
      <Title id="titlep2">Smart Homes</Title>
    </>
  );

  return (
    <div id="centered-container">
      <main>
        {/* Render the title and buttons if no form is selected */}
        {!formType && (
          <section id="title" className={titleFadeClass}>
            <CommonTitle />
            <Button id="button1" onClick={() => handleFormClick("login")}>
              Login
            </Button>
            <Button id="button2" onClick={() => handleFormClick("signup")}>
              Sign up
            </Button>
          </section>
        )}
        {/* Render the selected form section */}
        {renderFormSection()}
      </main>
    </div>
  );
}

export default App;
