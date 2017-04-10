// add an event listener to the shorten button for when the user clicks it
$(document).ready(() => {
    let params, msgLength = 0;
    const ErrMsg = $(".append");
    const MsgBox = $("#user-msg");
    const SubmitBtn = $("#submit-form");
    const Url = $('#url-field');
    const Regex = /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;

    // hide message when MsgBox input is manipulated.
    setInterval(() => {
        if (Url.val().length !== msgLength) {
           MsgBox.hide();
        }
    }, 100);

    const Request = (url) => {
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

    const Redirect = () => { location.href += "new/" + params };

    const Validate = url => {
        if (Regex.test(url)) {
            Request(url);
            Redirect();
        } else {
            MsgBox.show();
            msgLength = Url.val().length;
            return console.log("INVALID URL");
        }
    };

    SubmitBtn.on('click', () => {
        params = Url.val();
        Validate(params);
    });
});