const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoClient = require('mongodb').MongoClient;

const connectionUrl = "mongodb://admin:admin@ds127173.mlab.com:27173/angular-demo";

mongoClient.connect(connectionUrl, (err, database) => {
    if(!err)
      console.log("connected");
});
