const express = require('express');
const port = process.env.PORT || 3000;
const app = express();


app.get( "/:url" , ( request, response ) => {

  const url_source = request.params;

  console.log( url.url, request.params );



  response.end();
}).listen( port , () => {
   console.log( "listening on port " + port )
});
