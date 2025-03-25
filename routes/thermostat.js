//routes for the thermostat
const express = require('express');
//importing the express module
//importing the Thermostats model
const router = express.Router();
const Thermostats = require('../models/Thermostats');

//GET request to get the thermostat
router.get('/', async (req, res) => {
    try{
        //finding the thermostat
        const thermostat = await Thermostats.findOne();
        if(!thermostat) {
            return res.status(404).json({ message: 'Thermostat not found' });
        }
        res.json(thermostat);
    } catch(err) {
        res.status(500).json({ message: 'Error fetching thermostat error' });
    }
});

//PATCH request to update the current temperature of the thermostat
router.patch('/temp', async (req, res) => {
    const {currentTemp} = req.body;
    try{
        //updating the thermostat
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

//POST request to add a new schedule
router.post('/schedule', async (req, res) => {
    const {day, startTime, endTime, temp} = req.body;
    try{
        //adding a new schedule
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
//exporting the router
module.exports = router;
