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
  },
  Validate: url => {
    const Regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    console.log( "Url to test " + url);
    if (Regex.test(url)) {
        console.log( url + " is valid!" );
        return true;
    } else {
        console.log("INVALID URL: " + url);
        return false;
    }
  }
}