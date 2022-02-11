import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import Astronomy from "./astronomy.js";

// function getRandomElements(body) {
//   for (let i = 0; i < body.length; i++) {
//     $(".randomResult").append(`<img src= "${body[i].url}" alt="space image">`);
//   }
// }

function getElements(response) {
  if (response.photos.length > 0) {
    console.log(response.photos);
    $('.roverImages').append(`<div class="card mb-3"> <img class="card-img-top" src="${response.photos[0].img_src}"/>`);
  } else if (response.photos.length <= 0) {
    $('.showErrors').text(`There were no photots taken that day!`);
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}

async function roverApiCall(solDays) {
  const response = await Astronomy.getRoverImage(solDays);
  console.log(response);
  getElements(response);
}


$(document).ready(function() {
  $("#randomImageInput").submit(function(event) {
    event.preventDefault();
    const imageNumber = $('#numberOfImages').val();
    $('#numberOfImages').val("");
    let promise = Astronomy.randomImage(imageNumber);
    promise.then(function (response) {
      const body = JSON.parse(response);
      $('.randomResult').text('');
      for (let i=0; i < body.length; i++) {
        $(".randomResult").append(`<div class="card mb-3"> <img class="card-img-top" src="${body[i].url}" alt="space image"> <div class="card-body"> <p class="card-title title"> <strong> ${body[i].title}</strong> </p>  <p class="card-text explanation">${body[i].explanation}</p>
        </div>
        </div>`);
      
      }
    })
      .catch(function(error) {
        $('.showErrors').text(`There was an error processing your request: ${error}`);
      });


  });

  $("#marsImageInput").submit(function(event) {
    event.preventDefault();
    $(".roverHeader").show();
    const solDays = $('#solDays').val();
    $('#solDays').val("");
    $(".roverImages").text('');
    console.log(solDays);
    roverApiCall(solDays);
  });
});