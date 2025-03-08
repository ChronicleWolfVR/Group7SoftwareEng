const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const usersRouter = require('./routes/users'); //importing user routes
const cors = require('cors'); //handling cross origin requests
const Lights = require('./models/Lights');


dotenv.config();

//middleware
//app.use(cors());
app.use(cors({ 
//error handling cors
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
}));
app.use(express.json());



//error handling in the console (not needed anymore)
console.log('Attempting to connect to MongoDB...');
console.log('MongoDB URI:', process.env.MONGO_URI.replace(/:[^:]*@/, ':****@'));

//connecting to the database
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error details:', {
      message: err.message,
      code: err.code,
      codeName: err.codeName
    });
    process.exit(1);
  });

app.post('/api/lights', async (req, res) => {
  try{
    const {name, status, energy} = req.body;
    const newLight = new Lights({name, status, energy});
    await newLight.save();
    res.status(201).json(newLight);
  } catch(err) {
    console.error('Error adding light:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use('/api/users', usersRouter); //using user routes for api requests
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});