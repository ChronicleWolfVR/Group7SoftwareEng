import React, { useState } from 'react';

const ScheduleForm = () => {
    const [schedule, setSchedule] = useState({
        day: '',
        startTime: '',
        endTime: '',
        temperature: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSchedule({
            ...schedule,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Schedule submitted:', schedule);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Day of the Week:</label>
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
                <input type="time" name="startTime" value={schedule.startTime} onChange={handleChange} />
            </div>
            <div>
                <label>End Time:</label>
                <input type="time" name="endTime" value={schedule.endTime} onChange={handleChange} />
            </div>
            <div>
                <label>Temperature (°C):</label>
                <input type="number" name="temperature" value={schedule.temperature} onChange={handleChange} />
            </div>
            <button type="submit">Set Schedule</button>
        </form>
    );
};

export default ScheduleForm;