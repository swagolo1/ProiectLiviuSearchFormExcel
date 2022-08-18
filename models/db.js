const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/NetworkDB',{
    useNewUrlParser: true
},
err => {
    if(!err){
    console.log('Connection succeeded');
}else {
    console.log('Error in connection' + err);
}})

require('./network.model');