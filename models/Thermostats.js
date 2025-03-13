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

module.exports = mongoose.model('Thermostats', thermostatsSchema);