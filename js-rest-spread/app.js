function filterOutOdds() {
  var nums = Array.prototype.slice.call(arguments);
  return nums.filter(function(num) {
    return num % 2 === 0
  });
}
let filterOutOdds2 = (...args) => args.filter(arg=> arg % 2===0);
//console.log(filterOutOdds2(1,2,3,4));


//console.log(findMin(1,4,12,-3)); // -3
//console.log(findMin(3,1)); // 1
//console.log(findMin(1,-1)); // -1
function findMin(...nums){
  return nums.reduce((accum, nextValue)=> accum < nextValue ? accum : nextValue);
}

//console.log(mergeObjects({a:1, b:2}, {c:3, d:4})); // {a:1, b:2, c:3, d:4}
function mergeObjects(obj1,obj2){
  return {...obj1, ...obj2};
}

//console.log(doubleAndReturnArgs([1,2,3],4,4)); // [1,2,3,8,8]
//console.log(doubleAndReturnArgs([2],10,4)); // [2, 20, 8]
function doubleAndReturnArgs(arr, ...args){
  args = args.map(x =>x*2);
  return arr.concat(args);
}



/** remove a random element in the items array
and return a new array without that item. */
//console.log(removeRandom([1,2,3,4,5,6]));

function removeRandom(items){
  let i = Math.floor(Math.random() * (items.length));
  return items.filter((currentValue,index) => index != i);
}
let removeRandom2 = items => {
  let i = Math.floor(Math.random() * (items.length));
  return [...items.slice(0,i), ...items.slice(i+1)];
}
console.log(removeRandom2([1,2,3,4,5,6]));


/** Return a new array with every item in array1 and array2. */
//console.log(extend([1,3,4],[2,4,7]));
function extend(array1, array2) {
   return [...array1, ...array2]; 
  }
let extend2 = (array1,array2) => [...array1, ...array2];


/** Return a new object with all the keys and values
from obj and a new key/value pair */
//console.log(addKeyVal({person: "micah"}, person: "micah"));

function addKeyVal(obj, key, val) {
  return {...obj, [`${key}`] :val};
}
let addKeyVal2 = (obj,key,val) => [{...obj, [`${key}`] : val}];


/** Return a new object with a key removed. */
//adapted from - https://stackoverflow.com/questions/56155922/how-to-delete-property-from-spread-operator
//console.log(removeKey({person: "micah", brother: "josiah"}, "brother"));
function removeKey(obj, key) {
  return  {...obj, [`${key}`] : undefined};
}
let removeKey2 = (obj,key) => [{...obj, [`${key}`] : undefined}];



/** Combine two objects and return a new object. */
//console.log(combine({person: "micah"}, {brother: "josiah"}));
function combine(obj1, obj2) {
  return {...obj1,...obj2};
}
let combine2 = (obj1,obj2) => [{...obj1,...obj2}];

/** Return a new object with a modified key and value. */
//console.log(update({person: "micah"}, "person" , "josiah"));
function update(obj, key, val) {
  return {...obj,[`${key}`]:val};
}
let update2 = (obj, key, val) => [{...obj,[`${key}`]:val}];