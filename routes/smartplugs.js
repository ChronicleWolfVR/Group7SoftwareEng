const express = require('express');
const router = express.Router();
const SmartPlugs = require('../models/SmartPlugs');

router.get('/', async (req, res) => {
    try {
        const smartPlugs = await SmartPlugs.find();
        res.json(smartPlugs);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching smart plugs' });
    }
});

router.post('/', async (req, res) => {
    const { name, status, energy } = req.body;

    try {
        const newSmartPlug = new SmartPlugs({ name, status, energy });
        await newSmartPlug.save();
        res.status(201).json(newSmartPlug);
    } catch (err) {
        res.status(500).json({ message: 'Error adding smart plug' });
    }
});

router.patch('/:id', async (req, res) => {
    try{
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

module.exports = router;