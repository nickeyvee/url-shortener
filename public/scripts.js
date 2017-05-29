document.addEventListener( "DOMContentLoaded", () => {

    const Button = document.getElementById('submit-form');
    const Url = document.getElementById('url-field');
    const MsgBox = document.getElementById("user-msg");

    const Redirect = () => location.href += `new/`;

    let UrlParam = "",
    msgLength = 0;

    // setInterval(() => {
    //     if (Url.val().length !== msgLength) {
    //        MsgBox.hide();
    //     }
    // }, 100);

    Button.addEventListener('click', function() {
        UrlParam = `/valid/${Url.value}`.toString();
        console.log( UrlParam );
        callback();
    });


    const callback = () => {

    const http = new XMLHttpRequest();

    http.onreadystatechange = () => {
        if( http.readyState == 4 && http.status == 200 ) {
            console.log("response recieved" );
            console.log( http );
            
            let data = JSON.parse( http.response );

            console.log( data )
            if( data.valid ) {
                console.log( "VALID URL");
                Redirect();
            } else {

            }

        } else if ( http.status == 404 ) {
            console.log("error (not found)");
        }
    }

    http.open("GET", UrlParam, true );
    http.send(null);
    console.log( UrlParam );
    }
})

/*
---- READYSTATES ----

0 - request not intialized
1 - request has been set up
2 - request hs been sent
3 - request is in process
4 - request is complete

*/