const mongoose = require('mongoose');

const robotsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    status: {type: Boolean, required: true},
    energy: {type: Number, default: 0} });

module.exports = mongoose.model('Robots', robotsSchema);