console.log("Let's get this party started!");
$(document).ready(createForm());

async function getGiphy(searchTerm) {
    const apiURL = "http://api.giphy.com/v1/gifs/search";
    const params = {
        api_key : "KaMivVkv7xbKVoAev71LNJ1oIL3XuuNg",
        q: searchTerm,
        limit: 1,
        lang: "en"
    }
    try{
        const res = await axios.get(`${apiURL}?q=${params.q}&api_key=${params.api_key}&limit=1`);
        let imageObject = res.data.data[0];
        const imgURL = String(imageObject.images.fixed_height.url);
        $('#giphys').append(`<img src=${imgURL}></img>`);
    }
    catch(err){
        console.error("Error response:");
        console.error(err.response.data);
        console.error(err.response.status);
        console.error(err.response.headers)
    }
}

function createForm(){
    $('body').append(`<h1> Giphy Party</h1>`);
    $('body').append(`<form action=""id="giphyInput"></form>`);
    $('form').append(`<label for="searchGiphy">Search Term</label>`);
    $('form').append(`<input type="text" id="searchGiphy"><br>`);
    $('form').append(`<button type="button"id="search">Search Giphy!</button>`)
    $('#search').on("click", function(){
        getGiphy($('#searchGiphy').val());
    });
    $('form').append(`<button type="button"id="remove">Remove Images</button>`)
    $('body').append(`<div id="giphys"> </div>`)
    $('#remove').on("click", function(){
        $('#giphys').empty();
    });
}










