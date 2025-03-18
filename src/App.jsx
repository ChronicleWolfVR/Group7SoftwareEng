import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Title from "./components/Title/Title";
import Button from "./components/Button/Button";
import LoginForm from "./components/StartPage/LoginForm/LoginForm";
import SignUpForm from "./components/StartPage/SignUpForm/SignUpForm";
import HomePage from "./components/HomePage/HomePage"; // Ensure you have this component
import "./index.css"; // Ensure you import the CSS file
import { UserProvider } from "./context/UserContext";

function App() {
  const [signInSuccess, setSignInSuccess] = useState(false); // Tracks if the signup was successful
  const [formType, setFormType] = useState(null); // Tracks the current form type (login or signup)
  const [fadeClass, setFadeClass] = useState(""); // Tracks the fade-in/out class for form transitions
  const [titleFadeClass, setTitleFadeClass] = useState(""); // Tracks the fade-in/out class for the title
  const [hasTitleDisplayed, setHasTitleDisplayed] = useState(false); // Tracks if the title has been displayed
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Tracks if the user is logged in
  const navigate = useNavigate(); // Hook for navigation

  // Handle successful login
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate("/home"); // Navigate to the home page
  };

  // Handle login button click
  const handleLoginClick = () => {
    setTitleFadeClass("fade-out");
    setTimeout(() => {
      setFormType("login");
      setFadeClass("fade-in");
    }, 500);
  };

  // Handle sign up button click
  const handleSignUpClick = () => {
    setTitleFadeClass("fade-out");
    setTimeout(() => {
      setFormType("signup");
      setFadeClass("fade-in");
    }, 500);
  };

  // Handle successful sign up
  const handleSignUp = () => {
    setSignInSuccess(true);
    setFormType("login");
  };

  // Handle closing the form
  const handleCloseForm = () => {
    setFadeClass("fade-out");
    setTimeout(() => {
      setFormType(null);
      setFadeClass("");
      setTitleFadeClass("fade-in");
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
        {formType === "login" && (
          <section id="Login" className={fadeClass}>
            <Title id="titlep1">Welcome to</Title>
            <Title id="titlep2">Smart Homes</Title>
            <LoginForm
              onClose={handleCloseForm}
              onLoginSuccess={handleLoginSuccess}
            />
          </section>
        )}
        {formType === "signup" && (
          <section id="SignUp" className={fadeClass}>
            <Title id="titlep1">Welcome to</Title>
            <Title id="titlep2">Smart Homes</Title>
            <SignUpForm
              onClose={handleCloseForm}
              onSignUpSuccess={handleSignUp}
            />
          </section>
        )}
      </main>
    </div>
  );
}

function AppWrapper() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/home" element={<HomePage />} />{" "}
          {/* Route for the home page */}
          <Route path="/login" element={<App formType="login" />} />{" "}
          {/* Route for the login form */}
          <Route path="/" element={<App />} /> {/* Default route */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default AppWrapper;
