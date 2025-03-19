import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./Thermostat.css";
import Modal from "./Modal/Modal";
import ScheduleForm from "./ScheduleForm/ScheduleForm";

const Thermostat = () => {
  const [temperature, setTemperature] = useState(20); // State to store the current temperature
  const [isChanging, setIsChanging] = useState(false); // State to track if the temperature is being changed
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control the visibility of the modal
  const [confirmationMessage, setConfirmationMessage] = useState(''); // State to store the confirmation message

  useEffect(() => {
    const fetchTemperature = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/thermostat");
        if (!response.ok) throw new Error("Failed to fetch the thermostat");
        const data = await response.json();
        setTemperature(data.currentTemp);
      } catch (error) {
        console.error("Error fetching thermostat:", error);
      }
    };

    fetchTemperature();
  }, []);

  // Function to handle temperature change
  const handleTemperatureChange = async (value) => {
    setTemperature(value);
    setIsChanging(true);

    try {
      const response = await fetch("http://localhost:3000/api/thermostat/temp", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentTemp: value }),
      });

      if (!response.ok) throw new Error("Failed to update the temperature");
      setConfirmationMessage('Temperature updated successfully'); // Set confirmation message

      // Clear the confirmation message after 2 seconds
      setTimeout(() => {
        setConfirmationMessage('');
      }, 2000);
    } catch (error) {
      console.error("Error updating the temperature:", error);
      setConfirmationMessage('Error updating the temperature'); // Set error message

      // Clear the error message after 2 seconds
      setTimeout(() => {
        setConfirmationMessage('');
      }, 2000);
    }
  };

  // Function to handle temperature submission
  const handleSubmit = () => {
    console.log("Temperature submitted:", temperature);
    // Add your submission logic here (e.g., API call)
  };

  // Function to handle the "View More" button click
  const handleViewMoreClick = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Effect to handle delayed submission of temperature change
  useEffect(() => {
    if (isChanging) {
      const timer = setTimeout(() => {
        handleSubmit();
        setIsChanging(false);
      }, 2000); // 2 seconds delay

      return () => clearTimeout(timer); // Cleanup the timer on component unmount or when dependencies change
    }
  }, [temperature, isChanging]);

  return (
    <>
      <div className="cards-container">
        <div className="card">
          <h2>Temperature</h2>
          {/* Slider to adjust the temperature */}
          <Slider
            min={10}
            max={30}
            value={temperature}
            onChange={handleTemperatureChange}
          />
          <h3>{temperature}°C</h3>
          {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
        </div>
        <div className="card-humidity">
          <h2>Humidity</h2>
          {/* Displaying static humidity value */}
          <h3>66%</h3>
        </div>
        <div className="card-outside-temperature">
          <h2>Outside Temperature</h2>
          {/* Displaying static outside temperature value */}
          <h3>2°C</h3>
        </div>
        <div className="card">
          <h2>Schedule</h2>
          <h3>Set Schedule</h3>
          {/* Button to open the schedule modal */}
          <button onClick={handleViewMoreClick}>View More</button>
        </div>
      </div>

      <div>
        {/* Modal component to display the schedule form */}
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ScheduleForm />
        </Modal>
      </div>
    </>
  );
};

export default Thermostat;
