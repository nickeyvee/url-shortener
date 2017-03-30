const express = require('express');
const port = process.env.PORT || 3000;
const app = express();

app.use("/:url", ( req, res, next ) => {
    console.log( req.originalUrl , "===> Params")

   const url_encoded = encodeURIComponent(req.params.url) + "/" + req.url;
   //req.protocol = "";
   req.params.url = url_encoded;

   console.log( req.params.url, "===> URL is encoded! ! !");
   next();
});

app.get( "/:url" , ( req, res, next ) => {
  console.log( req.params , "===> GET RECIEVED");

  /*if ( req.url.indexOf("http/:") !== -1 || req.url.indexOf("https/:") !== -1 ) {
    res.write("Invalid URL");
  }
  //if( url.indexOf( ".com" ) !== -1 ) {};
  */
  res.end();
}).listen( port , () => {
   console.log( "listening on port " + port )
});
