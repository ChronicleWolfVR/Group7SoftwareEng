const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true}, //name is required
    email: { type: String, required: true, unique: true}, // emial is required and is unique
    username: { type: String, required: true, unique: true}, //username is required and is unique
    password: { type: String, required: true } //password is required
});

module.exports = mongoose.model('Users', userSchema);