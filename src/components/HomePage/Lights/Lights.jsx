import React, { useState,useEffect } from "react";
import Slider from "rc-slider";
import "./Lights.css";
import Modal from "../Thermostat/Modal/Modal";
import leaf from "./leaf-1531.svg";
import night from "./night.png";
import dim from "./half-full.png";

const Lights = () => {
  const [lights, setLights] = useState([
    // { id: 1, name: "Master Bedroom", isOn: false },
    // { id: 2, name: "Bedroom 1", isOn: false },
    // { id: 3, name: "Guest Room", isOn: false },
    // { id: 4, name: "Dining Room", isOn: false },
    // { id: 5, name: "Living Room", isOn: false },
    // { id: 6, name: "Kitchen", isOn: false },
  ]);
  const [newLightName, setNewLightName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchLights = async () => {
      try{
        const response = await fetch("http://localhost:3000/api/lights");
        if(!response.ok) throw new Error("Failed to fetch lights");

        const data = await response.json();
        setLights(data);
      } catch (error) {
        console.error("Error fetching lights:", error);
      }
    };

    fetchLights();
  }, []);

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

  // const addLight = () => {
  //   if (newLightName.trim() === "") return;
  //   const newLight = {
  //     id: lights.length + 1,
  //     name: newLightName,
  //     isOn: false,
  //   };
  //   setLights([...lights, newLight]);
  //   setNewLightName("");
  //   setIsModalOpen(false); // Close the modal after adding a new light
  // };

  const addLight = async () => {
    if (!newLightName.trim()) return;

    const newLight = {
      name: newLightName,
      status: false,
      energy: 0
    };

    try {
      const response = await fetch("http://localhost:3000/api/lights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLight),
      });

      if (!response.ok) throw new Error("Failed to add light");
    

    const addedLight = await response.json();
    setLights((prevLights) => [...prevLights, addedLight]);
    setNewLightName("");
    setIsModalOpen(false);
  } catch(err) {
    console.error("Error adding light:", err);
  }
};

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const [mainLightBrightness, setMainLightBrightness] = useState(50);
  const [floorLampsBrightness, setFloorLampsBrightness] = useState(50);

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
        <div className="lightcard">
          <div className="light-presets">
            <button className="saver">
              <img src={leaf} alt="saver" />
              Saver
            </button>
            <button className="dim">
              <img src={dim} alt="dim" /> Dim
            </button>
            <button className="night">
              <img src={night} alt="saver" />
              Night
            </button>
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
                  onChange={(value) => {
                    setMainLightBrightness(value);
                    console.log(`Main Light brightness: ${value}`);
                  }}
                />
              </div>
              <div className="light-slider-item">
                <h3>Floor Lamps</h3>
                <p>Brightness: {floorLampsBrightness}%</p>
                <Slider
                  min={0}
                  max={100}
                  value={floorLampsBrightness}
                  onChange={(value) => {
                    setFloorLampsBrightness(value);
                    console.log(`Floor Lamps brightness: ${value}`);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <input
          className="light-input"
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
