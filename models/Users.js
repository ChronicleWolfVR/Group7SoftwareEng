const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true}, //name is required
    email: { type: String, required: true, unique: true}, // emial is required and is unique
    password: { type: String, required: true } //password is required
});

module.exports = mongoose.model('Users', userSchema);