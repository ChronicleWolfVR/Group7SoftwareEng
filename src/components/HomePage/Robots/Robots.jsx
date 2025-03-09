import React, { useState } from "react";
import "./Robots.css";
import robotvaccum from "./robot-vacuum-cleaner.png";
import Modal from "../Thermostat/Modal/Modal";

const Robots = () => {
  // State to manage the list of robots
  const [robots, setRobots] = useState([
    { id: 1, name: "TV", isOn: false },
    { id: 2, name: "Sprinkler", isOn: false },
    { id: 3, name: "RoboVacuum", isOn: false },
    { id: 4, name: "RoboCutter", isOn: false },
  ]);

  // State to manage the new robot name input
  const [newRobotName, setNewRobotName] = useState("");

  // State to manage the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to add a new robot to the list
  const addRobot = () => {
    if (newRobotName.trim() === "") return;
    const newRobot = { id: robots.length + 1, name: newRobotName, isOn: false };
    setRobots([...robots, newRobot]);
    setNewRobotName("");
    setIsModalOpen(false);
  };

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to toggle the state of a robot (on/off)
  const toggleRobot = (id) => {
    setRobots((prevRobots) =>
      prevRobots.map((robot) => {
        if (robot.id === id) {
          const newState = !robot.isOn;
          console.log(`${robot.name} is now ${newState ? "ON" : "OFF"}`);
          return { ...robot, isOn: newState };
        }
        return robot;
      })
    );
  };

  return (
    <>
      <div className="cards-container">
        <div className="robotcard1">
          {/* Button to open the modal to add a new robot */}
          <button className="add-robot-button" onClick={handleOpenModal}>
            Add Robot+
          </button>
          <div className="robots-container">
            {/* Render the list of robots */}
            {robots.map((robot) => (
              <div key={robot.id} className="robotcard">
                <h3>{robot.name}</h3>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={robot.isOn}
                    onChange={() => toggleRobot(robot.id)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="robotcard2">
          <h2>RoboVacuum</h2>
          <img src={robotvaccum} alt="RoboVacuum" />
          <div className="presets-container">
            {/* Buttons for RoboVacuum actions */}
            <button className="clean">Clean</button>
            <button className="charge">Charge</button>
            <button className="pause">Pause</button>
          </div>
        </div>
      </div>
      {/* Modal to add a new robot */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <input
          type="text"
          value={newRobotName}
          onChange={(e) => setNewRobotName(e.target.value)}
          placeholder="Enter robot name"
        />
        <button className="add-robot-button" onClick={addRobot}>
          Add Robot+
        </button>
      </Modal>
    </>
  );
};

export default Robots;
