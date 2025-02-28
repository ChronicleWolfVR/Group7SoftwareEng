import React, { useState } from "react";
import "./SmartPlugs.css";
import Modal from "../Thermostat/Modal/Modal";

const SmartPlugs = () => {
  const [devices, setDevices] = useState([
    { name: "Air Conditioner", wattage: 100 },
    { name: "Coffee Machine", wattage: 100 },
    { name: "Washing Machine", wattage: 100 },
    { name: "Air Purifier", wattage: 100 },
    { name: "Dryer", wattage: 100 },
    { name: "Microwave", wattage: 100 },
  ]);
  const [newDeviceName, setNewDeviceName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addDevice = () => {
    if (newDeviceName.trim() === "") return;
    const newDevice = { name: newDeviceName, wattage: 100 }; // Default wattage
    setDevices([...devices, newDevice]);
    setNewDeviceName("");
    setIsModalOpen(false); // Close the modal after adding a new device
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
        <div className="smartcard">
          <button className="add-plug-button" onClick={handleOpenModal}>
            Add Plug+
          </button>
          <div className="plugs-container">
            {devices.map((device, index) => (
              <div key={index} className="plugcard">
                <h3>{device.name}</h3>
                <label className="switch">
                  <input type="checkbox" />
                  <span className="slider round"></span>
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="smartcard">
          <h2>Power Consumption</h2>
          <div className="power-consumption-container">
            <div className="scrollable-menu">
              {devices.map((device, index) => (
                <div key={index} className="device-item">
                  <span className="device-name">{device.name}</span>
                  <span className="power-consumption">{device.wattage}W</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <input
          type="text"
          value={newDeviceName}
          onChange={(e) => setNewDeviceName(e.target.value)}
          placeholder="Enter device name"
        />
        <button className="add-plug-button" onClick={addDevice}>
          Add Plug+
        </button>
      </Modal>
    </>
  );
};

export default SmartPlugs;