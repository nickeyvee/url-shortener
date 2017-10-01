const express = require('express');
const bodyParser = require('body-parser');
const pug = require("pug");

const db = require('mongodb');
const MongoClient = db.MongoClient;

const url = process.env.MONGODB_URI;
const port = process.env.PORT || 3000;
const appUrl = process.env.APP_URL;

const Service = require('./service');
const Repo = require('./repository');

let shortened;
let original;

const app = express();

Repo.openConnection(url).then(() => {
   app.listen(port, () => {
      console.log("app listening on port", port);
   });
});

app.all('/', function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "X-Requested-With");
   console.log("allow cross-origin-request headers set");
   next();
});

// tell express where to find files and use middleware.
app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use(express.static(__dirname + "/views"));
app.use(express.static(__dirname + "/public"));


app.get("/valid/:original(*)", (req, res, next) => {
   original = req.params.original;

   console.log("GET recieved!", original)

   const Valid = Service.Validate(original);
   console.log("url is:" + Valid);

   if (Valid) {
      shortened = Service.shorten();

      Repo.insertNewURL({
         "original": original,
         "shortened": shortened
      }).then(res => {
         console.log('saved data to mongoDb');
      });
   }
   res.set('Content-Type', 'application/json');
   res.send(JSON.stringify({
      "valid": Valid
   }));
   res.end();
});


app.get("/new/", (req, res, next) => {
   res.render("output", {
      original: original,
      shortened: "http://" + req.headers.host + "/" + shortened
   });
})


//search database and redirct if match is found
app.get("/:newUrl", (req, res, next) => {
   const newUrl = req.params.newUrl;
   console.log("short url recieved!");

   if (newUrl !== "favicon.ico") {
      const Cb = function( err, data ) {
         if (err) return res.send("Error reading database");
         if (data.original.indexOf("http") && data.original.indexOf("http") === -1) {
            res.redirect(301, "https://" + data.original);
         } else {
            res.redirect(301, data.original);
         }
      }
      Repo.queryShortened(newUrl, Cb)
   };
})