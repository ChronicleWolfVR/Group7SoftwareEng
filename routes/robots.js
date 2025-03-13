const express = require('express');
const router = express.Router();
const Robots = require('../models/Robots');

//gettimng all robots
router.get('/', async (req, res) => {
    try{
        const robots = await Robots.find();
        res.json(robots);
    } catch(err) {
        res.status(500).json({ message: "Error fetching robots" });
    }
});


router.post('/', async (req, res) => {
    const {name, status, energy} = req.body;
    try{
        const newRobot = new Robots({name, status, energy});
        await newRobot.save();
        res.status(201).json(newRobot);
        } catch(err) {
            res.status(500).json({ message: 'Error adding Robot' });
        }
});


router.patch('/:id', async (req, res) => {
    try{
        const updatedRobot = await Robots.findByIdAndUpdate
        (req.params.id,
        {status: req.body.status},
        {new: true}
    );
    if(!updatedRobot){
        return res.status(404).json({ message: 'Robot not found' });
    }
    res.json(updatedRobot);
} catch(err) {
    res.status(500).json({ message: 'Error updating Robot' });
}
});

module.exports = router;

//deleting a robot
// router.delete('/:id', async (req, res) => {
//     try{
//         await Robots.findByIdAndDelete(req.params.id);
//         res.json({ message: 'Robot deleted' });
//     } catch(err) {
//         res.status(500).json({ message: 'Error deleting Robot' });
//     }
// }
