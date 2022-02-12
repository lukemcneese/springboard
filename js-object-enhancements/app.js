function createInstructor(firstName, lastName){
  return {
    firstName: firstName,
    lastName: lastName
  }
}
/* Write an ES2015 Version */
function createInstructor(firstName, lastName){
  return {
    firstName,
    lastName
  };
}

var favoriteNumber = 42;
var instructor = {
  firstName: "Colt"
}
instructor[favoriteNumber] = "That is my favorite!"

/* Write an ES2015 Version */
var instructor ={
  firstName: "Colt",
  [favoriteNumber]: "That is my favorite!"
};


var instructor = {
  firstName: "Colt",
  sayHi: function(){
    return "Hi!";
  },
  sayBye: function(){
    return this.firstName + " says bye!";
  }
}
/* Write an ES2015 Version */
var instructor2 = {
  firstName: "Colt",
  sayHi(){return "Hi!"},
  sayBye(){return this.firstName +" says bye!"}
};

function createAnimal(species,verb,noise){
  return {
    species,
    [verb](){
      return noise;
    }
  }
}


const d = createAnimal("dog", "bark", "Woooof!")
// {species: "dog", bark: ƒ}
d.bark()  //"Woooof!"

const s = createAnimal("sheep", "bleet", "BAAAAaaaa")
// {species: "sheep", bleet: ƒ}
s.bleet() //"BAAAAaaaa"