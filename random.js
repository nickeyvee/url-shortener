// create a function that returns a string of 4 randomly selcted
// integers from the list of characters "char".
module.exports = {
  shorten: () => {
    const randomIndex = () => { return (Math.floor(Math.random() * (34 - 1)  + 1)) };
    const char = "123456789abcdefghijkmnopqrstuvwxyz";
    let shortUrl = [];
    let i = 4;

    while( i > 0 ) {
      shortUrl.push( char.charAt( randomIndex() ));
      i--;
    }
    return short_url = shortUrl.join("");
    console.log( "hash generated" );
  }
}
