// routes for the lights
// importing the express module
const express = require('express');
// importing the Lights model
const router = express.Router();
const Lights = require('../models/Lights');

//GET request to get all the lights
router.get('/', async (req, res) => {
    try {
        //finding all the lights
        const lights = await Lights.find();
        res.json(lights);
    } catch (err) {
        res.status(500).json({ message: "Error with the server" });
    }
});

//POST request to add a new light
router.post('/', async (req, res) => {
    const {name, status, energy} = req.body;
    try{
        const light = new Lights({
            name,
            status,
            energy
        });
    //saving the light to the database
    const newLight = await light.save();
    res.json(newLight);
    } catch (err) {
        console.error("MongoDB error",err);
        res.status(500).json({ message: "Error adding a light" });
    }
});

//PATCH request to update the status of a light
router.patch('/:id', async (req, res) => {
    try {
        //updating the light with the given id
        const updatedLight = await Lights.findByIdAndUpdate(
            req.params.id,
            //req.body,
            {status: req.body.status},
            { new: true }
        );
        if (!updatedLight) {
            return res.status(404).json({ message: "Light not found" });
        }
        res.json(updatedLight);
    } catch (err) {
        res.status(500).json({ message: "Error updating light" });
    }
});

//exporting the router
module.exports = router;