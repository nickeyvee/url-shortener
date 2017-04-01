const express = require('express');
const mongodb = require('mongodb');
const port = process.env.PORT || 3000;
const app = express();

// connect to mLab database..
const MongoClient = mongodb.MongoClient;
const url = process.env.MONGOLAB_URI;

MongoClient.connect( url, ( err, db ) => {
  if ( err ) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    console.log( "connection established to ", url );
  }
  db.close();
})

// request handlers.

app.use("/:url", ( req, res, next ) => {
    // search for proper parameters in the request object
    let parse = require('url-parse'),
        url = parse(req.originalUrl.slice(1), parse );
    let short_url = "https://" + req.headers.host;

    let randomInt = () => { return (Math.floor(Math.random() * (20 - 1)  + 1)).toString()};

    //console.log( url );

   url.set('href', randomInt() );


   res.write( JSON.stringify({
     'original_url': url,
     'short_url': short_url
   }))

   res.end();
}).listen( port , () => {
   console.log( "listening on port " + port )
});
