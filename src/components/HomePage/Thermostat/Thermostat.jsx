import React from "react";
import "./Thermostat.css";

const Thermostat = () => {
  return (
    <div className="cards-container">
      <div className="card">
        <h2>Temperature</h2>
        <h3>20°C</h3>
        <button>View More</button>
      </div>
      <div className="card">
        <h2>Humidity</h2>
        <h3>50%</h3>
        <button>View More</button>
      </div>
      <div className="card">
        <h2>Outside Temprature</h2>
        <h3>15°C</h3>
        <button>View More</button>
      </div>
      <div className="card">
        <h2>Schedule</h2>
        <h3>Set Schedule</h3>
        <button>View More</button>
      </div>
    </div>
  );
};

export default Thermostat;
