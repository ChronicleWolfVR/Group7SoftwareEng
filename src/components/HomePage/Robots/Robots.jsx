import React, { useState } from "react";
import "./Robots.css";
import robotvaccum from "./robot-vacuum-cleaner.png";
import Modal from "../Thermostat/Modal/Modal";

const Robots = () => {
  const [robots, setRobots] = useState([
    { id: 1, name: "TV", isOn: false },
    { id: 2, name: "Sprinkler", isOn: false },
    { id: 3, name: "RoboVacuum", isOn: false },
    { id: 4, name: "RoboCutter", isOn: false },
  ]);
  const [newRobotName, setNewRobotName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addRobot = () => {
    if (newRobotName.trim() === "") return;
    const newRobot = { id: robots.length + 1, name: newRobotName, isOn: false };
    setRobots([...robots, newRobot]);
    setNewRobotName("");
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

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
          <button className="add-robot-button" onClick={handleOpenModal}>
            Add Robot+
          </button>
          <div className="robots-container">
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
            <button className="clean">Clean</button>
            <button className="charge">Charge</button>
            <button className="pause">Pause</button>
          </div>
        </div>
      </div>
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
