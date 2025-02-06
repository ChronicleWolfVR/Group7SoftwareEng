import React, { useState } from 'react';
import Title from '../Title/Title';
import TabButton from './TabButton/TabButton';
import './HomePage.css';

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState('Overview');

  const tabs = ['Overview', 'Lights', 'Thermostat', 'Smart Plugs', 'Robots'];

  return (
    <>
    <button className="menu-button">=</button>
    <div className="home-page">
        <Title id="titlep2">Smart Home</Title>
        <menu id="examples">
          {tabs.map((tab) => (
            <TabButton
              key={tab}
              isSelected={selectedTab === tab}
              onClick={() => setSelectedTab(tab)}
            >
              {tab}
            </TabButton>
          ))}
        </menu>
        <div id="tab-content">
          {selectedTab === 'Overview' && <div>Overview Content</div>}
          {selectedTab === 'Lights' && <div>Lights Content</div>}
          {selectedTab === 'Thermostat' && <div>Thermostat Content</div>}
          {selectedTab === 'Smart Plugs' && <div>Smart Plugs Content</div>}
          {selectedTab === 'Robots' && <div>Robots Content</div>}
        </div>
      </div>
    </>
  );
};

export default HomePage;