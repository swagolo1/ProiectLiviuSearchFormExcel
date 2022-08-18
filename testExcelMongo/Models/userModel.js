//const src = require('debug');
var mongoose = require('mongoose');

var excelSchema = new mongoose.Schema({
    _id: {type: Number},
    name: { type: String },
    address: { type: String},
    age: { type: Number}
});

module.exports = mongoose.model('userModel', excelSchema);

//Az gyerek, aki az újság fölött ebédel.
//Azok diákok, akik a villamos mögött futnak.
//Az rossz, ami az újság mellett van.
