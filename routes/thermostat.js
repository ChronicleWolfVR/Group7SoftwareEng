const express = require('express');
const router = express.Router();
const Thermostats = require('../models/Thermostats');


router.get('/', async (req, res) => {
    try{
        const thermostat = await Thermostats.findOne();
        if(!thermostat) {
            return res.status(404).json({ message: 'Thermostat not found' });
        }
        res.json(thermostat);
    } catch(err) {
        res.status(500).json({ message: 'Error fetching thermostat error' });
    }
});

router.patch('/temp', async (req, res) => {
    const {currentTemp} = req.body;
    try{
        const thermostat = await Thermostats.findOneAndUpdate(
            {},
            {currentTemp},
            {new: true, upsert: true}
        );
        res.json(thermostat);
      } catch(err) {
        res.status(500).json({ message: 'Error updating thermostat' });
    }
});

router.post('/schedule', async (req, res) => {
    const {day, startTime, endTime, temp} = req.body;
    try{
        const thermostat = await Thermostats.findOneAndUpdate(
            {},
            { $push: { schedules: {day, startTime, endTime, temp} } },
            {new: true, upsert: true}
        );
        res.json(thermostat);
    } catch(err) {
        res.status(500).json({ message: 'Error adding schedule' });
    }
});

module.exports = router;
