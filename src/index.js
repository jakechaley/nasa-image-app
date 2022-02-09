import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Astronomy from "./astronomy.js";

// function getRandomElements(body) {
//   for (let i = 0; i <= body.length; i++) {
//     $(".randomResult").append(`<img src= "${body[i].url}" alt="space image">`);
//   }
// }



$(document).ready(function() {
  $("#randomImage").click(function() {
    const imageNumber = $('#numberOfImages').val();
    $('#numberOfImages').val("");
    let promise = Astronomy.randomImage(imageNumber);
    promise.then(function (response) {
      const body = JSON.parse(response);
      $('.randomResult').text('');
      for (let i=0; i < body.length; i++) {
        // console.log(body[i].url);
        $(".randomResult").append(`${body[i].title} <img src="${body[i].url}" alt="space image"> <br> <br> <br> `);
      }
    }, function(error) {
      $('.showErrors').text(`There was an error processing your request: ${error}`);
    });
  });
});