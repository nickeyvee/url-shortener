// add an event listener to the shorten button for when the user clicks it
$(document).ready( () => {

//console.log( location.href );

$('#submit-form').on('click', () => {

  const params = $('#url-field').val();
  const redirect = () => { location.href += "new/" + params };
  
  $.ajax({
    url: location.href,
    type: 'GET',
    dataType: 'string',
    async: true,
    data: params,
    success: (data) => {
      // display the shortened URL to the user that is returned by the server
        console.log("success");
    }
  });
  redirect();
});

});
