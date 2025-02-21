import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Thermostat.css";
import Modal from "./Modal/Modal";
import ScheduleForm from "./ScheduleForm/ScheduleForm";

const Thermostat = () => {
  const [temperature, setTemperature] = useState(20);
  const [isChanging, setIsChanging] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTemperatureChange = (value) => {
    setTemperature(value);
    setIsChanging(true);
  };

  const handleSubmit = () => {
    // Submit the temperature value
    console.log("Temperature submitted:", temperature);
    // Add your submission logic here (e.g., API call)
  };

  const handleViewMoreClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isChanging) {
      const timer = setTimeout(() => {
        handleSubmit();
        setIsChanging(false);
      }, 2000); // 2 seconds delay

      return () => clearTimeout(timer);
    }
  }, [temperature, isChanging]);

  return (
    <>
      <div className="cards-container">
        <div className="card">
          <h2>Temperature</h2>
          <Slider
            min={10}
            max={30}
            value={temperature}
            onChange={handleTemperatureChange}
          />
          <h3>{temperature}°C</h3>
          <button onClick={handleSubmit}>Submit</button>
        </div>
        <div className="card-humidity">
          <h2>Humidity</h2>
          <h3>50%</h3>
        </div>
        <div className="card-outside-temperature">
          <h2>Outside Temperature</h2>
          <h3>15°C</h3>
        </div>
        <div className="card">
          <h2>Schedule</h2>
          <h3>Set Schedule</h3>
          <button onClick={handleViewMoreClick}>View More</button>
        </div>
      </div>

      <div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ScheduleForm />
        </Modal>
      </div>
    </>
  );
};

export default Thermostat;
