const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
// add mongoose
const mongoose = require('mongoose');
const mongoUrl = require("./mongolab").key;
// port
const port = process.env.PORT || 3000;
// local files
const hash = require('./hash');
const shortUrl = require("./models/shortUrl");


let shortened;
const createShortUrl = () => { shortened = hash.shorten() };

const app = express();


mongoose.connect( mongoUrl, (err, db) => {
    if (err) {
        console.log( "cannot connect to mongoDB @ " + mongoUrl );
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

    // gerneate the random 4-char long base38 url
    createShortUrl();

    // create new item using Schema in shortUrls.js
    const data = new shortUrl({
        "original": original,
        "shortened": shortened
    });
    // save to mongoDB
    data.save((err) => {
        if(err) return res.send("Error Saving to database")
    })

    res.json(data);
    res.end();
});

// search database and redirct if match is found
app.get( "/:newUrl" , (req, res) => {
    const newUrl = req.params.newUrl;
    
    shortUrl.findOne({"shortened" : shortened }, (err, data) => {

        if ( data.original.indexOf("http") &&  data.original.indexOf("http") === -1 ){
            res.redirect(301, "https://" + data.original);
        } else {
            res.redirect(301, data.original);
        }
    });
})


