const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoose = require('mongoose');
const mongoUrl = require("./mongolab").key;
const port = process.env.PORT || 3000;
// local files
const hash = require('./hash');
const shortUrls = require("./models/shortUrl");

const app = express();


mongoose.connect( mongoUrl, (err, db) => {
    if (err) {
        throw err;
    } else {
        console.log( "connected to mongoDB @ " + mongoUrl );

        app.listen( port , () => {
        console.log( "app listening on port" );
        }); 
    }
})

// tell express where to find files and use middleware.
app.use(bodyParser.json());
app.use(express.static(__dirname + "/public"));

app.get( "/", (req, res, next) => {
    console.log( "1st request recieved")
    res.end();
    next();
});

app.get( "/new/:original(*)", (req, res, next) => {
    console.log( "2nd request Recieved! ! !");

    const original = req.params.original; // same as const shorten = req.params.shorten;
    const shortened = hash.shorten();

    const props = {
        "original": original,
        "shortened": shortened
    };
    
    res.json({
        "original": original,
        "shortened": shortened
    });
    res.end();
});

