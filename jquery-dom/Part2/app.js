$(document).ready(createForm());


//creates form with two inputs for a title and rating along wiht a submit button
function createForm(){
    $('div').append(`<h1> Movies App!</h1>`);
    $('div').append(`<form action=""id="movieRatings"></form>`);
    $('form').append(`<label for="movieTitle">Movie Title</label>`);
    $('form').append(`<input type="text" id="movieTitle"><br>`);
    $('form').append(`<label for="rating">Rating</label>`);
    $('form').append(`<input type="text" id="rating"><br>`);
    $('form').append(`<button type="button"id="submit">Submit Rating</button>`)
    $('div').append(`<ul id="movie-ratings"></ul>`);
    $('#submit').on("click", function(){
        $('#movie-ratings').append($("<li>").text($('#movieTitle').val() + " "+ $('#rating').val()).append(`<button type="button" id="x">X</button>`));
    });
    $('#movie-ratings').on("click", "#x",function(evt){
        evt.target.parentElement.remove();//how could i have done this in jquery?
    });
}
