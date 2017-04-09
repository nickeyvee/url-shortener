const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const mongoose = require('mongoose');
const mongoUrl = require("./mongolab").key;
const port = process.env.PORT || 3000;
const hash = require('./hash');
const shortUrl = require("./models/shortUrl");
const pug = require("pug");
let shortened, original;
const createShortUrl = () => {
    shortened = hash.shorten()
};

const app = express();


mongoose.connect(mongoUrl, (err, db) => {
    if (err) {
        console.log("cannot connect to mongoDB @ " + mongoUrl);
        throw err;
    } else {
        console.log("connected to mongoDB @ " + mongoUrl);

        app.listen(port, () => {
            console.log("app listening on port");
        });
    }
})

// tell express where to find files and use middleware.
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
    console.log("1st request recieved")
    res.send("Request recieved");
    res.end();
});

app.get("/new/:original(*)", (req, res) => {
    console.log("2nd request Recieved! ! !");
    original = req.params.original; // same as const shorten = req.params.shorten;
    // gerneate the random 4-char long base38 url
    createShortUrl();
    console.log(req.headers);

    // create new item using Schema in shortUrls.js
    const data = new shortUrl({
        "original": original,
        "shortened": shortened
    });
    // save to mongoDB
    data.save((err) => {
        if (err) return res.send("Error Saving to database")
    })
    res.render("output", {
        original:"http://" + original, 
        shortened: "http://" + req.headers.host + "/" + shortened
    });
    //res.json(data);
    res.end();
});

// search database and redirct if match is found
app.get("/:newUrl", (req, res) => {
    const newUrl = req.params.newUrl;

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



