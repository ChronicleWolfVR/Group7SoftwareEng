const express = require('express');
const router = express.Router();
const Lights = require('../models/Lights');

router.get('/', async (req, res) => {
    try {
        const lights = await Lights.find();
        res.json(lights);
    } catch (err) {
        res.status(500).json({ message: "Error with the server" });
    }
});


router.post('/', async (req, res) => {
    const {name, status, energy} = req.body;
    try{
        const light = new Lights({
            name,
            status,
            energy
        });
    
    const newLight = await light.save();
    res.json(newLight);
    } catch (err) {
        console.error("MongoDB error",err);
        res.status(500).json({ message: "Error adding a light" });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const updatedLight = await Lights.findByIdAndUpdate(
            req.params.id,
            req.body,
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

module.exports = router;