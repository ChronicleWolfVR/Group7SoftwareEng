const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors'); //handling cross origin requests
const lightsRouter = require('./routes/lights'); //importing lights routes
const usersRouter = require('./routes/users'); //importing user routes
const robotsRouter = require('./routes/robots'); //importing robots routes
const smartPlugsRouter = require('./routes/smartplugs'); //importing smart plugs routes
const thermostatRouter = require('./routes/thermostat'); //importing thermostat routes
//const Lights = require('./models/Lights');


dotenv.config();

//middleware
//app.use(cors());
app.use(cors({ 
//error handling cors
  origin: 'http://localhost:5173', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], 
  allowedHeaders: ['Content-Type', 'Authorization'], 
  credentials: true, 
}));
//using express.json() to parse json data
app.use(express.json());

//using cors for all routes
app.options('*', cors());



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



//const PORT = process.env.PORT || 3000;



// Serve static files from the dist directory
app.use('/api/lights', lightsRouter); //using lights routes for api requests
app.use('/api/users', usersRouter); //using user routes for api requests
app.use('/api/robots', robotsRouter); //using robots routes for api requests
app.use('/api/smartplugs', smartPlugsRouter); //using smart plugs routes for api requests
app.use('/api/thermostat', thermostatRouter); //using thermostat routes for api requests

app.use(express.static(path.join(__dirname, 'dist')));

// Handle all routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});