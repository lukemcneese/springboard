let arr = [1,2,3];
function double(arr) {
    return arr.map(function(val) {
      return val * 2;
    });
  }

let temp = arr => arr.map(val => val *2);



  function squareAndFindEvens(numbers){
    var squares = numbers.map(function(num){
      return num ** 2;
    });
    var evens = squares.filter(function(square){
      return square % 2 === 0;
    });
    return evens;
  }

  let temp2  = numbers => numbers.map(val => val ** 2).filter(square => square %2 === 0);