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

  //fetching robots from the backend
  useEffect(() => {
    const fetchRobots = async () => {
      try{
        const response = await fetch("http://localhost:3000/api/robots");

        if (!response.ok) throw new Error("Failed to fetch robots");
        const data = await response.json();
        setRobots(data);
      } catch (error){
        console.error("Error fetching robots:", error);
      }
    };

    fetchRobots();
  } , []);


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
        headers: {"Content-Type": "application/json"},
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
    try{
      const robotToToggle = robots.find((robot) => robot._id === id);
      const newStatus = !robotToToggle.status;

      const response = await fetch(`http://localhost:3000/api/robots/${id}`, 
        {
        method: "PATCH",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({status: newStatus}),
      });

      if (!response.ok) throw new Error("Failed to toggle robots status");

      //const updatedRobot = await response.json();
      setRobots((prevRobots) => prevRobots.map((robot) => robot._id === id ? {...robot, status: newStatus} : robot));
    } catch (error) {
      console.error("Error toggling robot status:", error);
    }
  };


  // Function to add a new robot to the list
  // const addRobot = () => {
  //   if (newRobotName.trim() === "") return;
  //   const newRobot = { id: robots.length + 1, name: newRobotName, isOn: false };
  //   setRobots([...robots, newRobot]);
  //   setNewRobotName("");
  //   setIsModalOpen(false);
  // };

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Function to toggle the state of a robot (on/off)
  // const toggleRobot = (id) => {
  //   setRobots((prevRobots) =>
  //     prevRobots.map((robot) => {
  //       if (robot.id === id) {
  //         const newState = !robot.isOn;
  //         console.log(`${robot.name} is now ${newState ? "ON" : "OFF"}`);
  //         return { ...robot, isOn: newState };
  //       }
  //       return robot;
  //     })
  //   );
  // };

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
