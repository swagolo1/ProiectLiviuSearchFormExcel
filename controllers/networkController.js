const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Network = mongoose.model('Network');

router.get('/', (req, res) => {
    res.render('network/addOrEdit', {
        viewTitle: 'Insert Network'
    })
});



router.post('/', (req, res) => {
    if(req.body._id == '') {
        insertRecord(req, res)
    }else {
        updateRecord(req, res)
    }
})


// pcName, newIP, gateway, mac, ciscoPort, userName, location, birou, apps, comp, connected, portLocSwitch, so, phone, data, portSec
function insertRecord(req, res) {
    var network = new Network();
    network.pcName = req.body.pcName;
    network.newIP = req.body.newIP;
    network.gateway = req.body.gateway;
    network.mac = req.body.mac;

    network.ciscoPort = req.body.ciscoPort;
    network.userName = req.body.userName;
    network.location = req.body.location;
    network.birou = req.body.birou;

    network.apps = req.body.apps;
    network.comp = req.body.comp;
    network.connected = req.body.connected;
    network.portLocSwitch = req.body.portLocSwitch;

    network.so = req.body.so;
    network.phone = req.body.phone;
    network.data = req.body.data;
    network.portSec = req.body.portSec;

    network.save((err, doc) => {
        if(!err){
            res.redirect('network/list');
        }else {
            console.log('Error during insert'+ err);
        }
    })
}

function updateRecord(req, res){
    Network.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err) {
            res.redirect('network/list');
        }else {
            console.log("Error during update: " + err);
        }
    });
}

router.get('/list', (req, res) => {
    Network.find((err, docs) => {
        if(!err) {
            res.render('../views/network/list',  {
                list: docs
            })
        }else {
            console.log('Error in retrieval: '+err);
        }
    })
})

router.get('/:id', (req, res) => {
    Network.findById(req.params.id, (err, doc) => {
        if(!err) {
            res.render('network/addOrEdit', {
                viewTitle: 'Update Network',
                network: doc,
            })
        } console.log(doc);
    });
});

router.get('/delete/:id', (req, res) => {
    Network.findByIdAndRemove(req.params.id, (err, doc) =>{
        if(!err){
            //res.redirect("network/list");
            res.render('../views/network/list.hbs');
        }else {
            console.log("Error in deletion" + err);
        }
    });
});

module.exports = router;


// 1960405055061
// 000000526115

//Excel import
// router.get('/excel', (req, res) => {
//     res.sendFile('/network/index.hbs');
// });


// router.post('/', (req, res, next) => {

//     var query = req.body.pcName;
//     Network.findOne({pcName:query}, function(err, example){
//         if(err) console.log(err);
//         if(example) {
//             console.log("This has already been saved");
//             //alert("this has already been saved");
//             res.redirect('/');
//         }else{
                    
//             if(req.body._id == '') {
//                 insertRecord(req, res)
//             }else {
//                 updateRecord(req, res)
//             }
//         }
//     })

// })



