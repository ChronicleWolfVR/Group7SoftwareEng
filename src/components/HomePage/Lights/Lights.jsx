import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "./Lights.css";
import Modal from "../Thermostat/Modal/Modal";
import leaf from "./leaf-1531.svg";
import night from "./night.png";
import dim from "./half-full.png";

const Lights = ({ isManager }) => {
  // State to manage the list of lights
  const [lights, setLights] = useState([]);

  // State to manage the name of a new light
  const [newLightName, setNewLightName] = useState("");

  // State to manage the visibility of the modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to manage the brightness of the main light
  const [mainLightBrightness, setMainLightBrightness] = useState(50);

  // State to manage the brightness of the floor lamps
  const [floorLampsBrightness, setFloorLampsBrightness] = useState(50);

  // State to manage the confirmation messages for light presets
  const [presetMessage, setPresetMessage] = useState("Manual Mode");

  // State to manage the brightness messages
  const [brightnessMessage, setBrightnessMessage] = useState("");

  // State to manage the visibility of delete buttons
  const [showDeleteButtons, setShowDeleteButtons] = useState(false);

  // Fetch the list of lights from the database
  useEffect(() => {
    const fetchLights = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/lights");
        if (!response.ok) throw new Error("Failed to fetch lights");

        const data = await response.json();
        setLights(data);
      } catch (error) {
        console.error("Error fetching lights:", error);
      }
    };

    fetchLights();
  }, []);

  // Function to toggle the status of a light
  const toggleLight = async (id) => {
    try {
      console.log("Toggling light:", id); // Debugging
      const lightToToggle = lights.find((light) => light._id === id);
      if (!lightToToggle) {
        console.error("Light not found");
        return;
      }
      const newStatus = !lightToToggle.status;
      console.log("New status:", newStatus);
      //using the fetch API to send a PATCH request to the server
      const response = await fetch(`http://localhost:3000/api/lights/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error("Failed to update light status");

      setLights((prevLights) =>
        prevLights.map((light) =>
          light._id === id ? { ...light, status: newStatus } : light
        )
      );
    } catch (error) {
      console.error("Error toggling light:", error);
    }
  };
  // Function to add a new light
  const addLight = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    if (!newLightName.trim()) return;

    const newLight = {
      name: newLightName,
      status: false,
      energy: 0,
    };
    //using the fetch API to send a POST request to the server
    try {
      console.log("Adding light:", newLight); // Debugging
      const response = await fetch("http://localhost:3000/api/lights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLight),
      });

      if (!response.ok) {
        const error = await response.json();
        console.error("Failed to add light:", error);
        throw new Error("Failed to add light");
      }

      const addedLight = await response.json();
      console.log("Added light:", addedLight);
      // Update the list of lights with the new light
      setLights((prevLights) => [...prevLights, addedLight]);
      setNewLightName("");
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error adding light:", err);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handlePresetClick = (preset) => {
    setPresetMessage(`${preset} mode activated`);
  };

  const handleBrightnessChange = (type, value) => {
    if (type === "main") {
      setMainLightBrightness(value);
      setBrightnessMessage(`Main Light brightness set to ${value}%`);
    } else if (type === "floor") {
      setFloorLampsBrightness(value);
      setBrightnessMessage(`Floor Lamps brightness set to ${value}%`);
    }
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
              <div className="light-bulb-card" key={light._id}>
                <h3>{light.name}</h3>
                <label className="switch">
                  <input
                    type="checkbox"
                    checked={light.status}
                    onChange={() => toggleLight(light._id)}
                  />
                  <span className="slider round"></span>
                </label>
                {isManager && (
                  <button className="delete-light-button">Delete</button>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="lightcard">
          <div className="light-presets">
            <button
              className="saver"
              onClick={() => handlePresetClick("Saver")}
            >
              <img src={leaf} alt="saver" />
              Saver
            </button>
            <button className="dim" onClick={() => handlePresetClick("Dim")}>
              <img src={dim} alt="dim" /> Dim
            </button>
            <button
              className="night"
              onClick={() => handlePresetClick("Night")}
            >
              <img src={night} alt="night" />
              Night
            </button>
          </div>
          <div className="message-container">
            <p className="preset-message">{presetMessage}</p>
          </div>
          <div>
            <div className="light-sliders-container">
              <div className="light-slider-item">
                <h3>Main Light</h3>
                <p>Brightness: {mainLightBrightness}%</p>
                <Slider
                  min={0}
                  max={100}
                  value={mainLightBrightness}
                  onChange={(value) => handleBrightnessChange("main", value)}
                />
              </div>
              <div className="light-slider-item">
                <h3>Floor Lamps</h3>
                <p>Brightness: {floorLampsBrightness}%</p>
                <Slider
                  min={0}
                  max={100}
                  value={floorLampsBrightness}
                  onChange={(value) => handleBrightnessChange("floor", value)}
                />
              </div>
            </div>
          </div>
          <p className="brightness-message">{brightnessMessage}</p>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form className="light-form" onSubmit={addLight}>
          <input
            className="light-input"
            type="text"
            value={newLightName}
            onChange={(e) => setNewLightName(e.target.value)}
            placeholder="Enter light name"
          />
          <button className="add-light-button" type="submit">
            Sync and Add Light+
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Lights;
