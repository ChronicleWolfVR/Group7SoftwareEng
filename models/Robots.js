// schema for the Robots collection
//using mongoose to create the schema
const mongoose = require('mongoose');

const robotsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    status: {type: Boolean, required: true},
    energy: {type: Number, default: 0} });

// exporting the schema
module.exports = mongoose.model('Robots', robotsSchema);