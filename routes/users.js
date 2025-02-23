//the routs folder is where we define the routes for our app and how they are handled
const express = require('express');
const router = express.Router(); // creating a new router fur user routes
const bcrypt = require('bcryptjs'); //password hashing
const Users = require('../models/Users'); // importing the user model

//error handling cors (not needed anymore)
// router.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5173');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     next();
//   });

//get route to fetch all users (for testing)
router.get('/', async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
        }
});


//registering a user endpoint
router.post('/register', async (req, res) => {
    //console.log('Request Body: ', req.body);
    //for debugging
    console.log('Registration attempt:', {
        body: req.body,
        headers: req.headers });

    const { fullName, email, username, password } = req.body;

//validation
    if(!fullName || !email || !username || !password) {
        return res.status(400).json({ message: "Please enter all fields" });
    }

    // Checking if a user with the same username and email already exists
    const existingUser = await Users.findOne({ $or: [{ email: email }, { username: username }] });
    if (existingUser) {
        return res.status(400).json({ message: existingUser.email === email ? "Email already exists" : "Username already exists" });
    }

    //hasing the password
    //const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);

    //creating a new user
    const newUser = new Users({
        fullName,
        email,
        username,
        password: hashedPassword
    });

    try{ //const savedUser = 
        //saving the user to the databse
        await newUser.save();
        res.status(201).json({message: 'User sucessfully registered', user: newUser});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message:'Error registering user', error: err.message });
    }
});



//login user endpoint
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    //checking if the user exists with the same username
    const user = await Users.findOne({ username });
    if (!user) {
        return res.status(400).json({ message: "Invalid username" });
    }

    //comparing the password with the hashed password
    const passMatch = await bcrypt.compare(password, user.password);
    if (!passMatch) {
        return res.status(400).json({ message: "Invalid password" });
    }

    res.status(200).json({ message: "Login successful", user });
}
);

//then exporting the to be used in other parts of the app
module.exports = router;
