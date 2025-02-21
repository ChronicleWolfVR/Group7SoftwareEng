import React, { useState } from "react";
import "./Lights.css";
import Modal from "../Thermostat/Modal/Modal";

const Lights = () => {
  const [lights, setLights] = useState([
    { id: 1, name: "Master Bedroom", isOn: false },
    { id: 2, name: "Bedroom 1", isOn: false },
    { id: 3, name: "Guest Room", isOn: false },
    { id: 4, name: "Dining Room", isOn: false },
    { id: 5, name: "Living Room", isOn: false },
    { id: 6, name: "Kitchen", isOn: false },
  ]);
  const [newLightName, setNewLightName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleLight = (id) => {
    setLights((prevLights) =>
      prevLights.map((light) => {
        if (light.id === id) {
          const newState = !light.isOn;
          console.log(`${light.name} is now ${newState ? "ON" : "OFF"}`);
          return { ...light, isOn: newState };
        }
        return light;
      })
    );
  };

  const addLight = () => {
    if (newLightName.trim() === "") return;
    const newLight = {
      id: lights.length + 1,
      name: newLightName,
      isOn: false,
    };
    setLights([...lights, newLight]);
    setNewLightName("");
    setIsModalOpen(false); // Close the modal after adding a new light
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="cards-container">
        <div className="lightcard">
          <button className="add-light-button" onClick={handleOpenModal}>
            Add Light+
          </button>
          <div className="lights-container">
            {lights.map((light) => (
              <div className="light-bulb-card" key={light.id}>
                <h3>{light.name}</h3>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={light.isOn}
                    onChange={() => toggleLight(light.id)}
                  />
                  <span className="slider round"></span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="lightcard"> </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <input className="light-input"
          type="text"
          value={newLightName}
          onChange={(e) => setNewLightName(e.target.value)}
          placeholder="Enter light name"
        />
        <button className="add-light-button" onClick={addLight}>
          Add Light+
        </button>
      </Modal>
    </>
  );
};

export default Lights;