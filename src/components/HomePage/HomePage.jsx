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
  // State to keep track of the selected tab
  const [selectedTab, setSelectedTab] = useState("Overview");
  // State to manage the side menu open/close status
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // List of tabs available
  const tabs = ["Overview", "Thermostat", "Lights", "Smart Plugs", "Robots"];

  // Function to toggle the side menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="home-page">
        {/* Button to toggle the side menu */}
        <button className="menu-button" onClick={toggleMenu}>
          ☰
        </button>
        <SideMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />

        {/* Title of the page */}
        <Title id="titlep2">Smart Home</Title>

        {/* Tabs menu */}
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

        {/* Content of the selected tab */}
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
