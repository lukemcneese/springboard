const gameContainer = document.getElementById("game");
let selectedCards = 0;
let numberofColors = 10;
let COLORS = [];
//bankofColors from - https://stackoverflow.com/questions/1573053/javascript-function-to-convert-color-names-to-hex-codes
const bankOfcolors = [
  'aliceblue',
  'antiquewhite',
  'aqua',
  'aquamarine',
  'azure',
  'beige',
  'bisque',
  'black',
  'blanchedalmond',
  'blue',
  'blueviolet',
  'brown',
  'burlywood',
  'cadetblue',
  'chartreuse',
  'chocolate',
  'coral',
  'cornflowerblue',
  'cornsilk',
  'crimson',
  'cyan',
  'darkblue',
  'darkcyan',
  'darkgoldenrod',
  'darkgray',
  'darkgreen',
  'darkkhaki',
  'darkmagenta',
  'darkolivegreen',
  'darkorange',
  'darkorchid',
  'darkred',
  'darksalmon',
  'darkseagreen',
  'darkslateblue',
  'darkslategray',
  'darkturquoise',
  'darkviolet',
  'deeppink',
  'deepskyblue',
  'dimgray',
  'dodgerblue',
  'firebrick',
  'floralwhite',
  'forestgreen',
  'fuchsia',
  'gainsboro',
  'ghostwhite',
  'gold',
  'goldenrod',
  'gray',
  'green',
  'greenyellow',
  'honeydew',
  'hotpink',
  'indianred',
  'indigo',
  'ivory',
  'khaki',
  'lavender',
  'lavenderblush',
  'lawngreen',
  'lemonchiffon',
  'lightblue',
  'lightcoral',
  'lightcyan',
  'lightgoldenrodyellow',
  'lightgray',
  'lightgreen',
  'lightpink',
  'lightsalmon',
  'lightseagreen',
  'lightskyblue',
  'lightslategray',
  'lightsteelblue',
  'lightyellow',
  'lime',
  'limegreen',
  'linen',
  'magenta',
  'maroon',
  'mediumaquamarine',
  'mediumblue',
  'mediumorchid',
  'mediumpurple',
  'mediumseagreen',
  'mediumslateblue',
  'mediumspringgreen',
  'mediumturquoise',
  'mediumvioletred',
  'midnightblue',
  'mintcream',
  'mistyrose',
  'moccasin',
  'navajowhite',
  'navy',
  'oldlace',
  'olive',
  'olivedrab',
  'orange',
  'orangered',
  'orchid',
  'palegoldenrod',
  'palegreen',
  'paleturquoise',
  'palevioletred',
  'papayawhip',
  'peachpuff',
  'peru',
  'pink',
  'plum',
  'powderblue',
  'purple',
  'red',
  'rosybrown',
  'royalblue',
  'saddlebrown',
  'salmon',
  'sandybrown',
  'seagreen',
  'seashell',
  'sienna',
  'silver',
  'skyblue',
  'slateblue',
  'slategray',
  'snow',
  'springgreen',
  'steelblue',
  'tan',
  'teal',
  'thistle',
  'tomato',
  'turquoise',
  'violet',
  'wheat',
  'white',
  'whitesmoke',
  'yellow',
  'yellowgreen'
]

for(let i = 0; i<numberofColors; i++){
  newColor = bankOfcolors[(Math.floor(Math.random()*140))];
  COLORS.push(newColor);
  COLORS.push(newColor);
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let uid = 0;
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);

    //add a unique Identifier as an HTML ID to each div
    newDiv.setAttribute('id',uid);
    uid++;
  }
}
//How to handle clicking three or four cards? having the dom immidiately catchup?

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target); 
  //Users should only be able to change at most two cards at a time.

  updateScore("increase");

  if(selectedCards === 0){
    //Clicking a card should change the background color to be the color of the class it has.
    event.target.style.backgroundColor = event.target.className;
    selectedCards++;
  } 
  else if(selectedCards === 1){
    //Clicking a card should change the background color to be the color of the class it has.
    event.target.style.backgroundColor = event.target.className;
    let matchingColors = document.getElementsByClassName(event.target.className);
    //console.log(matchingColors);
    let match = 0;
    let uid = [];
    for(m of matchingColors){
      if(m.style.backgroundColor){
        match++;
        //console.log("Match "+ match);
      }
      uid.push(m.getAttribute('id'));
    }
    //Clicking on two matching cards should be a “match” — those cards should stay face up.
    if (match === 2 && uid[0] != uid[1]){
      selectedCards = 0;
      for(m of matchingColors){
        m.setAttribute("data-matched", true);
      }

    }
    else{
    //When clicking two cards that are not a match, they should stay turned over for at least 1 second before they hide the color again. You should make sure to use a setTimeout so that you can execute code after one second.
    selectedCards = 0;
    setTimeout(function(){
      let elements = gameContainer.children;
      for(e of elements){
        if(e.getAttribute("data-matched")=== null){
          e.removeAttribute("style");
        }

      }
    },1000)
    }
  }
  else{
    console.log("Selected Card Error");
  }
  //checking to see if you won
  //if the length of the arry with backgound colors equals the length all divs
  let a = document.getElementById('game').children.length;
  let b = document.querySelectorAll("[data-matched = true]").length;
  if (a === b){
    //alert("You win!");
    let score = parseInt(document.getElementById("score").getAttribute('data-score'));
    let bestScore = localStorage.getItem("score");
    if((score < bestScore) || (bestScore === null)){
        localStorage.setItem("score",score);
        let display = document.getElementById("bestScore")
        display.innerText = "Best Score: "+ score;
      }
    }
}
function updateScore(instructions){
  let score = document.getElementById("score");
  if(instructions === "reset"){
    score.innerText = 'Score: 0';
    score.setAttribute('data-score',0);
    let bestScore = document.getElementById("bestScore")
    let loadedScore = localStorage.getItem("score");
    if (loadedScore != null){
      bestScore.innerText = 'Best Score: ' + loadedScore;
    }

  }
  else if(instructions === "increase"){
    //get attribute turn into number increase and print it
    let num = parseInt(score.getAttribute('data-score'));
    num++;
    //score.innerText = 'Score ${num}'; what am i doing wrong with the string literals
    score.innerText = 'Score: ' + num; 
    score.setAttribute('data-score',num);
  }
  else{
    console.log("UpdateScore Error")
  }
}

// when the DOM loads
//createDivsForColors(shuffledColors);

//Start Button
const startButton = document.querySelector('#start');
startButton.addEventListener('click', function(){
  let game = document.getElementById("game");
  while(game.firstChild){
    game.firstChild.remove();
  }
  createDivsForColors(shuffledColors);
  updateScore("reset");
});
//Restart Button
//adapted from - https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
const restartButton = document.querySelector('#restart');
restartButton.addEventListener('click',function(){
  let game = document.getElementById("game");
  while(game.firstChild){
    game.firstChild.remove();
  }
  createDivsForColors(shuffledColors);
  updateScore("reset");
});