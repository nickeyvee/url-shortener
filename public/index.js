// add an event listener to the shorten button for when the user clicks it
$(document).ready(() => {
    let params;
    const regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    const request = (url) => {
        $.ajax({
            url: location.href,
            type: 'GET',
            dataType: 'string',
            async: true,
            data: url,
            success: (data) => {
                // display the shortened URL to the user that is returned by the server
                console.log("success");
            }
        })
    };

    const redirect = () => { location.href += "new/" + params };

    const validate = url => {
        if (regex.test(url)) {
            request(url);
            redirect();
        } else {
            //$("#user-msg").append("<p>Invalid Url. Make sure you follow the 'https://example.com' format.</p>");
            return console.log("INVALID URL");
        }
    };

    $('#submit-form').on('click', () => {
        params = $('#url-field').val();
        validate(params);
    });
});