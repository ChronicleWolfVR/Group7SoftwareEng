// schema for the lights collection in the database
//using mongoose to create the schema
const mongoose = require('mongoose');

const lightSchema = new mongoose.Schema({
    name: {type: String, required: true},
    status: {type: Boolean, required: true},
    energy: {type: Number, default: 0} });
    
// exporting the schema
module.exports = mongoose.model('Lights', lightSchema);