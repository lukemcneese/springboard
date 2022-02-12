//console.log(new Set([1,1,2,2,3,4]));//set(4){1,2,3,4}
//console.log([...new Set("referee")].join(""));//ref

let m = new Map();
m.set([1,2,3], true);
m.set([1,2,3], false);
//console.log(m); //{[1,2,3] = true, [1,2,3] = false}

//Write a function called hasDuplicate which accepts an array and returns true or false if that array contains a duplicate
function hasDuplicate(arr){
  return arr.length != new Set(arr).size;
}

//console.log(hasDuplicate([1,3,2,1])); // true
//console.log(hasDuplicate([1,5,-1,4])); // false


//Write a function called vowelCount which accepts a string and returns a map where the keys are numbers and the values are the count of the vowels in the string.
function vowelCount(str){
  let vowelMap = new Map();
  for(let char of str){
    if("aeiou".includes(char)){
      if(vowelMap.has(char)){
        vowelMap.set(char,vowelMap.get(char)+1);
      }
      else{
        vowelMap.set(char,1);
      }
    }
  }
  return vowelMap;
}
console.log(vowelCount('awesome')); // Map { 'a' => 1, 'e' => 2, 'o' => 1 }
console.log(vowelCount('Colt')); // Map { 'o' => 1 }