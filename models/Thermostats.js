// schema for thermostat and schedules collection
//using mongoose to create the schema
const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    day: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    temp: { type: Number, required: true },
});

const thermostatsSchema = new mongoose.Schema({
    currentTemp: { type: Number, default: 20 },
    schedules : [scheduleSchema],
});

// exporting the schema
module.exports = mongoose.model('Thermostats', thermostatsSchema);