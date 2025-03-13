const mongoose = require('mongoose');

const smartPlugsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    status: {type: Boolean, required: true},
    energy: {type: Number, default: 100} });

module.exports = mongoose.model('SmartPlugs', smartPlugsSchema);