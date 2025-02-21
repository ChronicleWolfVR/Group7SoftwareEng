import React, { useState } from "react";
import Title from "../Title/Title";
import TabButton from "./TabButton/TabButton";
import Overiew from "./Overview/Overview";
import Thermostat from "./Thermostat/Thermostat";
import Lights from "./Lights/Lights";
import "./HomePage.css";

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState("Overview");

  const tabs = ["Overview", "Thermostat", "Lights", "Smart Plugs", "Robots"];

  return (
    <>
      <button className="menu-button">=</button>
      <div className="home-page">
        <Title id="titlep2">Smart Home</Title>
        <menu id="tabs">
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
          {selectedTab === "Overview" && (
            <div>
              <Overiew />
            </div>
          )}
          {selectedTab === "Lights" && <div><Lights /></div>}
          {selectedTab === "Thermostat" && (
            <div>
              <Thermostat />
            </div>
          )}
          {selectedTab === "Smart Plugs" && <div>Smart Plugs Content</div>}
          {selectedTab === "Robots" && <div>Robots Content</div>}
        </div>
      </div>
    </>
  );
};

export default HomePage;
