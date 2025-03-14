import React, { useState, useEffect } from "react";
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

  // State to manage the confirmation message for presets
  const [presetMessage, setPresetMessage] = useState("Charge mode");

  // Fetching robots from the backend
  useEffect(() => {
    const fetchRobots = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/robots");

        if (!response.ok) throw new Error("Failed to fetch robots");
        const data = await response.json();
        setRobots(data);
      } catch (error) {
        console.error("Error fetching robots:", error);
      }
    };

    fetchRobots();
  }, []);

  const addRobot = async () => {
    if (!newRobotName.trim()) return;

    const newRobot = {
      name: newRobotName,
      status: false,
      energy: 0,
    };

    try {
      const response = await fetch("http://localhost:3000/api/robots", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRobot),
      });

      if (!response.ok) throw new Error("Failed to add robot");

      const addedRobot = await response.json();
      setRobots((prevRobots) => [...prevRobots, addedRobot]);
      setNewRobotName("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding robot:", error);
    }
  };

  const toggleRobot = async (id) => {
    try {
      const robotToToggle = robots.find((robot) => robot._id === id);
      const newStatus = !robotToToggle.status;

      const response = await fetch(`http://localhost:3000/api/robots/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to toggle robots status");

      setRobots((prevRobots) =>
        prevRobots.map((robot) =>
          robot._id === id ? { ...robot, status: newStatus } : robot
        )
      );
    } catch (error) {
      console.error("Error toggling robot status:", error);
    }
  };

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to handle preset button clicks
  const handlePresetClick = (preset) => {
    setPresetMessage(`${preset} mode activated`);
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
              <div key={robot._id} className="robotcard">
                <h3>{robot.name}</h3>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={robot.status}
                    onChange={() => toggleRobot(robot._id)}
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
            <button className="clean" onClick={() => handlePresetClick("Clean")}>Clean</button>
            <button className="charge" onClick={() => handlePresetClick("Charge")}>Charge</button>
            <button className="pause" onClick={() => handlePresetClick("Pause")}>Pause</button>
          </div>
          <div className="message-container">
            <p className="preset-message">{presetMessage}</p>
          </div>
        </div>
      </div>
      {/* Modal to add a new robot */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form className="robot-form">
          <input
            className="robot-input"
            type="text"
            value={newRobotName}
            onChange={(e) => setNewRobotName(e.target.value)}
            placeholder="Enter robot name"
          />
          <button className="add-robot-button" onClick={addRobot}>
            Add Robot+
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Robots;