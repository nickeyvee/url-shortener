// add an event listener to the shorten button for when the user clicks it
$(document).ready( () => {
  let params;
  const Url = "^[A-Za-z]+://[A-Za-z0-9-_]+\\.[A-Za-z0-9-_%&\?\/.=]+$";
  const redirect = () => { location.href += "new/" + params };

  const validateUrl = arg => {
    if( Url.test(arg)) {
      redirect();
    } else {
      
    }
  };

$('#submit-form').on('click', () => {

  params = $('#url-field').val();


  
  
  console.log( params );
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
