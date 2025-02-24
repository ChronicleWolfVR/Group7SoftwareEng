//the models folder is where we define the schema for our database
const mongoose = require('mongoose'); //imporintg mongoose to inetarct with the database

//the schema we ater going to use to create a user
const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true}, //full name is required
    email: { type: String, required: true, unique: true}, // emial is required and is unique
    username: { type: String, required: true, unique: true}, //username is required and is unique
    password: { type: String, required: true } //password is required
});

//then exporting it so that it can be used in other parts of the app
module.exports = mongoose.model('Users', userSchema);