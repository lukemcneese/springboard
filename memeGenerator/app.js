const form = document.querySelector('#add-meme');
const image = document.querySelector('#image'); 
const topText = document.querySelector('#topText');
const botText = document.querySelector('#botText');
const body = document.querySelector('#body');
//https://www.w3schools.com/howto/howto_css_image_text.asp
form.addEventListener('submit',function(e){
    e.preventDefault();
    const newDiv = document.createElement('div');
    const newMeme = document.createElement('img');
    const removeBtn = document.createElement('button');
    const topDiv = document.createElement('div');
    const botDiv = document.createElement('div');
    removeBtn.innerText = 'Remove Meme'; 
    removeBtn.addEventListener('click', function(e){
        newDiv.remove();
    });
    //add image from url to image
    newMeme.setAttribute("src",image.value);
    newMeme.classList.add("image");
    //add topText
    topDiv.innerText = topText.value;
    topDiv.classList.add("topText");
    //add botText
    botDiv.innerText = botText.value;
    botDiv.classList.add("botText");

    //append the completed Meme to the image
    newDiv.classList.add("container");
    newDiv.appendChild(newMeme);
    newDiv.appendChild(topDiv);
    newDiv.appendChild(botDiv);
    newDiv.appendChild(removeBtn);
    //append to the end of the body
    body.appendChild(newDiv);

    //clear the inputs
    image.value = '';
    topText.value = '';
    botText.value = '';
});