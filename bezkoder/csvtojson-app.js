const csvtojson = require("csvtojson");



const mongodb = require("mongodb").MongoClient;
// let url = "mongodb://username:password@localhost:27017/";
let url = "mongodb://localhost:27017/";
csvtojson()
  .fromFile("file.csv")
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