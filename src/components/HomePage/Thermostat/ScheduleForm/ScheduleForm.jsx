import React, { useState } from "react";

const ScheduleForm = () => {
  // Initialize state for the schedule form
  const [schedule, setSchedule] = useState({
    day: "",
    startTime: "",
    endTime: "",
    temperature: "",
  });

  // Handle input changes and update the state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSchedule({
      ...schedule,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/thermostat/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(schedule),
      });

      if (!response.ok) throw new Error("Failed to set the schedule");

      const data = await response.json();
      console.log("Schedule set successfully:", data);
      alert("Schedule set successfully!");
      } catch (error) {
        console.error("Error setting the schedule:", error);
    }
    // Handle form submission logic here
    //console.log("Schedule submitted:", schedule);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Day of the Week:</label>
        {/* Dropdown to select the day of the week */}
        <select name="day" value={schedule.day} onChange={handleChange}>
          <option value="">Select a day</option>
          <option value="Monday">Monday</option>
          <option value="Tuesday">Tuesday</option>
          <option value="Wednesday">Wednesday</option>
          <option value="Thursday">Thursday</option>
          <option value="Friday">Friday</option>
          <option value="Saturday">Saturday</option>
          <option value="Sunday">Sunday</option>
        </select>
      </div>
      <div>
        <label>Start Time:</label>
        {/* Input for selecting the start time */}
        <input
          type="time"
          name="startTime"
          value={schedule.startTime}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>End Time:</label>
        {/* Input for selecting the end time */}
        <input
          type="time"
          name="endTime"
          value={schedule.endTime}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Temperature (°C):</label>
        {/* Input for setting the temperature */}
        <input
          type="number"
          name="temperature"
          value={schedule.temp}
          onChange={handleChange}
        />
      </div>
      {/* Button to submit the form */}
      <button type="submit">Set Schedule</button>
    </form>
  );
};

export default ScheduleForm;
