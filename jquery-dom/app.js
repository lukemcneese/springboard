$(document).ready(()=>console.log("Let’s get ready to party with jQuery!"))
$('article img').attr({"class" : "image-center"});
$('p:last').remove();
$('h1').css("fontSize", `${Math.floor(Math.random()*100)}px`);
$('ol').append('<li>Whatever you want.</li>');
$('aside').empty().append('<p>Sorry that list should have not existed</p>');
$('#red').change(function(){updateBackground()});
$('#blue').change(function(){updateBackground()});
$('#green').change(function(){updateBackground()});
$('img').on("click",function(){$('img').remove();});

function updateBackground(){
    $('body').css({"backgroundColor":`rgba(${$('#red').val()},${$('#blue').val()},${$('#green').val()})`});
}
