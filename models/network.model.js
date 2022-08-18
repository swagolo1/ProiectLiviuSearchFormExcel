const mongoose = require('mongoose');

var networkSchema = new mongoose.Schema({
    pcName: {
        type: String,
        require: 'This field is required'
    },
    newIP: {
        type: String,
        required: 'This field is required'
    },
    gateway: {
        type: String,
        required: 'This field is required'
    },
    mac: {
        type: String,
        required: 'This field is required'
    },
    ciscoPort: {
        type: String,
        require: 'This field is required'
    },
    userName: {
        type: String,
        required: 'This field is required'
    },
    location: {
        type: String,
        required: 'This field is required'
    },
    birou: {
        type: String,
        required: 'This field is required'
    },
    apps: {
        type: String,
        require: 'This field is required'
    },
    comp: {
        type: String,
        required: 'This field is required'
    },
    connected: {
        type: String,
        required: 'This field is required'
    },
    portLocSwitch: {
        type: String,
        required: 'This field is required'
    },
    so: {
        type: String,
        require: 'This field is required'
    },
    phone: {
        type: String,
        required: 'This field is required'
    },
    data: {
        type: String,
        required: 'This field is required'
    },
    portSec: {
        type: String,
        required: 'This field is required'
    },
});

    // pcName, newIP, gateway, mac, ciscoPort, userName, location, birou, apps, comp, connected, portLocSwitch, so, phone, data, portSec
    
    // numePC, ipNou, gateway, mac, portCisco, userName, location, birou, apps, comp, connected, portLocSwitch, so, phone, data, portSec
                    

mongoose.model("Network", networkSchema);