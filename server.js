const express = require('express');
const mongodb = require('mongodb');
const path = require('path');
const port = process.env.PORT || 3000;
const MongoClient = mongodb.MongoClient;
const url = require("./mongolab").key;
const hash = require('./hash');
const app = express();
let encoded_id;
let db;

hash.shorten();

MongoClient.connect( url, ( err, database ) => {
  if ( err ) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    db = database;
    console.log( "connection established to ", url );

    app.listen( port , () => {
       console.log( "listening on port " + port )
       console.log( short_url );
    });
  }
});
// request handlers.

app.get( "/", ( req, res, next ) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
  res.sendFile(path.join(__dirname, 'views/index.js'));
});

app.use("/shorten/:url", ( req, res, next ) => {

  hash.shorten();

  let original_url = req.originalUrl.toString().slice(1);

  if( req.params.url === "http:" || req.params.url === "https:" ) {
    original_url = original_url.slice( req.params.url.length + 2, original_url.length );
  }

  req.params.encoded_id = short_url;

  let prop = {
    'original_url': "https://" + original_url ,
    'short_url': "https://" + req.headers.host + "/" + short_url
  };

  db.collection("url-pairs").insert({ prop }, ( err, docs ) => {
    if( err ) {
      throw err;
    }
  });
  console.log( req.params );

  res.write( JSON.stringify({ prop }))
  res.end();

  next();
 });
