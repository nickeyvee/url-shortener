const express = require('express');
const bodyParser = require('body-parser');
const pug = require("pug");

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

const mongoose = require('mongoose');
const mongoUrl = process.env.MONGODB_URI || require("./config/mlab").key;

const port = process.env.PORT || 3000;
const urlService= require('./url-shortener/urlShortener');
const appUrl = process.env.APP_URL;
const shortUrl = require("./models/shortUrl");


let shortened, 
original;

//const createShortUrl = () => { shortened = urlService.shorten() };

const app = express();


mongoose.connect(mongoUrl, (err, db) => {
    if (err) {
        console.log("cannot connect to mongoDB @ " + mongoUrl);
        throw err;
    } else {
        console.log("connected to mongoDB @ " + mongoUrl);

        app.listen(port, () => {
            console.log("app listening on port", port);
        });
    }
})

// tell express where to find files and use middleware.
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));


app.get("/valid/:original(*)", (req, res) => {
    original = req.params.original; // same as const shorten = req.params.shorten;
    // gerneate the random 4-char long base38 url
    console.log("GET recieved!", original)

    const Valid = urlService.Validate( original );
    console.log( "url is:" + Valid );

    if ( Valid ) {

        shortened = urlService.shorten();

        // create new item using Schema in shortUrls.js
        const data = new shortUrl({
            "original": original,
            "shortened": shortened
        });
        // save to mongoDB
        data.save((err) => {
            if (err) return res.send("Error Saving to database")
        })
    }
    res.set('Content-Type', 'application/json');
    res.send(JSON.stringify({ "valid": Valid }));
    res.end();
});


app.get("/new/", (req, res) => {
    res.render("output", {
        original: original, 
        shortened: "http://" + req.headers.host + "/" + shortened
    });
})


//search database and redirct if match is found
app.get("/:newUrl", (req, res) => {
    const newUrl = req.params.newUrl;

    console.log("short url recieved!");

    if (newUrl !== "favicon.ico") {

        shortUrl.findOne({
            "shortened": shortened
        }, (err, data) => {
            if (err) return res.send("Error reading database");
            if (data.original.indexOf("http") && data.original.indexOf("http") === -1) {
                res.redirect(301, "https://" + data.original);
            } else {
                res.redirect(301, data.original);
            }
        });
    };
})