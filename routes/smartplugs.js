//routes for smart plugs
//importing the express module
const express = require('express');
//importing the SmartPlugs model
const router = express.Router();
const SmartPlugs = require('../models/SmartPlugs');

//GET request to get all the smart plugs
router.get('/', async (req, res) => {
    try {
        //finding all the smart plugs
        const smartPlugs = await SmartPlugs.find();
        res.json(smartPlugs);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching smart plugs' });
    }
});

//POST request to add a new smart plug
router.post('/', async (req, res) => {
    const { name, status, energy } = req.body;

    try {
        //creating a new smart plug
        const newSmartPlug = new SmartPlugs({ name, status, energy });
        await newSmartPlug.save();
        res.status(201).json(newSmartPlug);
    } catch (err) {
        res.status(500).json({ message: 'Error adding smart plug' });
    }
});

//PATCH request to update the status of a smart plug
router.patch('/:id', async (req, res) => {
    try{
        //updating the smart plug with the given id
        const updatedSmartPlug = await SmartPlugs.findByIdAndUpdate(
            req.params.id,
            {status: req.body.status},
            {new: true}
        );
        if (!updatedSmartPlug) {
            return res.status(404).json({ message: 'Smart plug not found' });
        }
        res.json(updatedSmartPlug);
    } catch (err) {
        res.status(500).json({ message: 'Error updating smart plug' });
    }
});

//exporting the router
module.exports = router;