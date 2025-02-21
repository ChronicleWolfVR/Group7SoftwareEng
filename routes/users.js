const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Users = require('../models/Users'); // importing the user model

//get all users (for testing)
router.get('/', async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
        }
});


//registering a user 
router.post('/register', async (req, res) => {
    console.log('Request Body: ', req.body);

    const { name, email, password } = req.body;

//validation
    if(!name || !email || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    // Checking if the email already exists
    const existingUser = await Users.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already in use" });
    }

    //hasing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating a new user
    const newUser = new Users({
        name,
        email,
        password: hashedPassword
    });

    try{
        const savedUser = await newUser.save();
        res.status(201).json({message: 'User sucessfully registered', user: savedUser});
    } catch (err) {
        console.error(err);
        res.status(400).json({ message:'Error registering user', error: err.message });
    }
});

module.exports = router;
