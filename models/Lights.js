const mongoose = require('mongoose');

const lightSchema = new mongoose.Schema({
    name: {type: String, required: true},
    status: {type: Boolean, required: true},
    energy: {type: Number, default: 0} });

module.exports = mongoose.model('Lights', lightSchema);