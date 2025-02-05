import React from 'react';
import Title from '../Title/Title';
import Button from '../Button/Button';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home-page">
      <button className="menu-button">=</button>
      <div id="centered-container">
      <Title id="titlep2">Smart Home</Title>
      </div>
    </div>
  );
};

export default HomePage;