import React, { useState } from "react";
import "./SmartPlugs.css";
import Modal from "../Thermostat/Modal/Modal";

const SmartPlugs = () => {
  // State to manage the list of devices
  const [devices, setDevices] = useState([
    { name: "Air Conditioner", wattage: 100 },
    { name: "Coffee Machine", wattage: 100 },
    { name: "Washing Machine", wattage: 100 },
    { name: "Air Purifier", wattage: 100 },
    { name: "Dryer", wattage: 100 },
    { name: "Microwave", wattage: 100 },
  ]);

  // State to manage the name of the new device being added
  const [newDeviceName, setNewDeviceName] = useState("");

  // State to manage the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to add a new device to the list
  const addDevice = () => {
    if (newDeviceName.trim() === "") return; // Prevent adding empty device names
    const newDevice = { name: newDeviceName, wattage: 100 }; // Default wattage
    setDevices([...devices, newDevice]); // Update the devices state
    setNewDeviceName(""); // Reset the input field
    setIsModalOpen(false); // Close the modal after adding a new device
  };

  // Function to open the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="cards-container">
        <div className="smartcard">
          {/* Button to open the modal for adding a new plug */}
          <button className="add-plug-button" onClick={handleOpenModal}>
            Add Plug+
          </button>
          <div className="plugs-container">
            {/* Render each device as a plug card */}
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
              {/* Render each device's power consumption */}
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

      {/* Modal for adding a new device */}
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
