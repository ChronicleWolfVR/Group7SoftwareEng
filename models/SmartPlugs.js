//schema for the SmartPlugs collection
//using mongoose to create the schema
const mongoose = require('mongoose');

const smartPlugsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    status: {type: Boolean, required: true},
    energy: {type: Number, default: 100} });

// exporting the schema
module.exports = mongoose.model('SmartPlugs', smartPlugsSchema);