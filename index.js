require('./models/db');
const mongoose = require('mongoose');
const Network = mongoose.model('Network');
const express = require('express');
const path = require('path');
const handlebars = require('handlebars');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');

const networkController = require('./controllers/networkController');
const { response } = require('express');

var app = express();

app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());

const csvtojson = require("csvtojson");


//var collection;

// app.get("/search", async (req, res) => {
//     try {
//         let result = await collection.aggregate ([{
//             "$search": {
//                 "autocomplete": {
//                     "query": `${req.query.term}`,
//                     "path": "name",
//                     "fuzzy": {
//                         "maxEdits": 2
//                     }
//                 }
//             } 
//         }]).toArray();
//         response.send(result);
//     }catch(e) {
//         res.status(500).send({message: e.message});
    
//     }
// });

app.get("/get/:id", async (req, res) => {
    try{
        let result = await collection.findOne({ "_id": mongoose.isValidObjectId(req.params.id)});
        res.send(result);
    } catch(e) {
        res.status(500).send({ message: e.message});
    }
});




app.get('/',(req, res) => {
    res.redirect('/network/list'
        //`<h2> welcome to students DB!</h2> 
        //<h3>Click to get to the <b><a href="/network/list">Database</a></b></h3>`
    );
});
// app.get('/excel',(req, res) => {
//     res.send(
//         `<h2> welcome to students DB!</h2> 
//         <h3>Click to get to the <b><a href="/network/list">Database</a></b></h3>`
//     );
// });

//Excel import
app.get('/excel', (req, res) => {
    res.render(path.join(__dirname+'/views/network/index.hbs'));
});

//convert to csv
app.get('/convToCsv', (req, res) => {
    res.render(path.join(__dirname+'/views/network/convToCsv.hbs'));
});


app.get('/network/json', (req, res) => {

    
            const mongodb = require("mongodb").MongoClient;
            // let url = "mongodb://username:password@localhost:27017/";
            let url = "mongodb://localhost:27017/";
            csvtojson()
              .fromFile(__dirname+'/views/network/file.csv')
              .then(csvData => {
                console.log(csvData);
            
            mongodb.connect(
              url,
              { useNewUrlParser: true, useUnifiedTopology: true },
              (err, client) => {
                if (err) throw err;
                client
                  .db("NetworkDB")
                  .collection("networks")
                  .insertMany(csvData, (err, res) => {
                    if (err) throw err;
                    console.log(`Inserted: ${res.insertedCount} rows`);
                    client.close();
                  });
              }
            );
            });

    res.render(path.join(__dirname+'/views/network/convToCsv.hbs'));
});


// app.get('/network/search', async (req, res) => {
//     const { resName } = req.query;
//     res.render(path.join(__dirname+'/views/network/list'));
//     const restaurants = await Network.find({ $text: { $search: resName  } });
//     //res.render('restaurants', { restaurants });
//     console.log(resName,restaurants);
//     })

// app.get('/network/search/', async (req, res) => {

//     var regex = new RegExp(req.params.name,'i');
//     Network.find({ name: regex }).then((result) => {
//         res.status(200).json(result)})
//     });





app.set('views', path.join(__dirname,'/views/'));

app.engine('hbs', exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(handlebars),
    extname: 'hbs',
    defaultLayout: 'MainLayout',
    layoutsDir: __dirname + "/views/layouts/"
}));

app.set("view engine", "hbs");

app.listen(3000, () => {
    console.log("server started at port 3000");
});

app.use("/network", networkController);


