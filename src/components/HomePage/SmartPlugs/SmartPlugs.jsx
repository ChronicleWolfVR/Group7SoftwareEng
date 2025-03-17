import React, { useState, useEffect } from "react";
import "./SmartPlugs.css";
import Modal from "../Thermostat/Modal/Modal";

const SmartPlugs = () => {
  // State to manage the list of devices
  const [devices, setDevices] = useState([]);

  // State to manage the name of the new device being added
  const [newDeviceName, setNewDeviceName] = useState("");

  // State to manage the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/smartplugs");
        if (!response.ok) throw new Error("Failed to fetch devices");
        const data = await response.json();
        setDevices(data);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
    };

    fetchDevices();
  }, []);

  const addDevice = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!newDeviceName.trim()) return;

    const newDevice = {
      name: newDeviceName,
      status: false,
      energy: 100,
    };

    try {
      const response = await fetch("http://localhost:3000/api/smartplugs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDevice),
      });

      if (!response.ok) throw new Error("Failed to add device");

      const addedDevice = await response.json();
      setDevices((prevDevices) => [...prevDevices, addedDevice]);
      setNewDeviceName("");
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding device:", error);
    }
  };

  const toggleDevice = async (id) => {
    try {
      const deviceToToggle = devices.find((device) => device._id === id);
      const newStatus = !deviceToToggle.status;

      const response = await fetch(`http://localhost:3000/api/smartplugs/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to toggle device");

      setDevices((prevDevices) =>
        prevDevices.map((device) =>
          device._id === id ? { ...device, status: newStatus } : device
        )
      );
    } catch (error) {
      console.error("Error toggling device:", error);
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
            {devices.map((device) => (
              <div key={device._id} className="plugcard">
                <h3>{device.name}</h3>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={device.status}
                    onChange={() => toggleDevice(device._id)}
                  />
                  <span className="slider round"></span>
                </label>
                <button className="delete-plug-button">Delete</button>
              </div>
            ))}
          </div>
        </div>
        <div className="smartcard">
          <h2>Power Consumption</h2>
          <div className="power-consumption-container">
            <div className="scrollable-menu">
              {/* Render each device's power consumption */}
              {devices.map((device) => (
                <div key={device._id} className="device-item">
                  <span className="device-name">{device.name}</span>
                  <span className="power-consumption">{device.energy}W</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal for adding a new device */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form className="smartplug-form" onSubmit={addDevice}>
          <input
            className="device-input"
            type="text"
            value={newDeviceName}
            onChange={(e) => setNewDeviceName(e.target.value)}
            placeholder="Enter device name"
          />
          <button className="add-plug-button" type="submit">
            Add Plug+
          </button>
        </form>
      </Modal>
    </>
  );
};

export default SmartPlugs;