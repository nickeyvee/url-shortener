document.addEventListener("DOMContentLoaded", () => {

   const Button = document.getElementById('submit-form');
   const Url = document.getElementById('url-field');
   const MsgBox = document.getElementById("user-msg");

   const Redirect = () => location.href += `new/`;

   let UrlParam = "",
      msgLength = 0;

   setInterval(() => {
      if (Url.value.length !== msgLength) {
         MsgBox.style.display = "none";
      }
   }, 150);

   Button.addEventListener('click', function () {
      UrlParam = `/valid/${Url.value}`.toString();
      callback();
   });

   const callback = () => {
      const http = new XMLHttpRequest();
      http.onreadystatechange = () => {
         if (http.readyState == 4 && http.status == 200) {
            let data = JSON.parse(http.response);
            if (data.valid) {
               // console.log("VALID URL");
               Redirect();
            } else {
               // display error message here.
               MsgBox.style.display = "block";
               msgLength = Url.value.length;
            }
         } else if (http.status == 404) {
            console.log("error (not found)");
         }
      }
      http.open("GET", UrlParam, true);
      http.withCredentials = true;
      http.setRequestHeader('Content-Type', 'text/plain');
      http.send(null);
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