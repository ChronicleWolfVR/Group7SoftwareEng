const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const usersRouter = require('./routes/users');


dotenv.config();

//middleware
app.use(express.json());

app.use('/api/users', usersRouter);

//error handling in the console
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



const PORT = process.env.PORT || 3000;

// Serve static files from the dist directory
app.use(express.static(path.join(__dirname, 'dist')));

// Handle all routes by serving the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});