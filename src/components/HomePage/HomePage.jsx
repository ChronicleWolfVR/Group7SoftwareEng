import React, { useState } from "react";
import Title from "../Title/Title";
import TabButton from "./TabButton/TabButton";
import Overiew from "./Overview/Overview";
import Thermostat from "./Thermostat/Thermostat";
import Lights from "./Lights/Lights";
import SmartPlugs from "./SmartPlugs/SmartPlugs";
import Robots from "./Robots/Robots";
import SideMenu from "./SideMenu/SideMenu";
import "./HomePage.css";

const HomePage = () => {
  const [selectedTab, setSelectedTab] = useState("Overview");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const tabs = ["Overview", "Thermostat", "Lights", "Smart Plugs", "Robots"];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const buttoncheck = () => {
    console.log("button clicked");
  };

  return (
    <>
      <div className="home-page">
      <button className="menu-button" onClick={toggleMenu}>☰</button>
      <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />

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
          {selectedTab === "Lights" && (
            <div>
              <Lights />
            </div>
          )}
          {selectedTab === "Thermostat" && (
            <div>
              <Thermostat />
            </div>
          )}
          {selectedTab === "Smart Plugs" && (
            <div>
              <SmartPlugs />
            </div>
          )}
          {selectedTab === "Robots" && (
            <div>
              <Robots />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HomePage;
