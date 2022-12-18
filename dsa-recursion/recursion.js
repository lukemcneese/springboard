/** product: calculate the product of an array of numbers. */

 

function product(nums) {

 

  function proudct_recursion(output, nums){

    //basecase

    if(nums.length() ===0) return output;

    output *=nums.pop();

    proudct_recursion(output).nums;

  }

 

}

 

/** longest: return the length of the longest word in an array of words. */

 

function longest(words) {

  function longest_recrursion(words, idx=0, currMax=0){

    if(idx === words.length()) return output

    if(words[idx].length() > currMax ) {currMax = words[idx].length()}

    longest_recrursion(words, idx+1, currMax)

  }

 

}

 

/** everyOther: return a string with every other letter. */

 

function everyOther(str) {

  function everyOther_recursion(str, idx=0, newStr=""){

    if(idx >= words.length()) return newStr

    newstr += str[idx];

    everyOther_recursion(str, idx, newStr)

  }

 

}

 

/** isPalindrome: checks whether a string is a palindrome or not. */

 

function isPalindrome(str) {

 

  function isPalindrome_recrursion(str, left, right){

    if(left === right || left === right -1) return true

    if(str[left] !== str[right]) return false

    isPalindrome_recrursion(str, left+1, right-1)

  }

 

}

 

/** findIndex: return the index of val in arr (or -1 if val is not present). */

 

function findIndex(arr, val) {

  function findIndex_recursion(arr, val, idx){

    if(idx >arr.length) return  -1;

    if(arr[idx] === val) return idx;

    findIndex_recursion(arr, val, idx+1);

 

  }

 

}

 

/** revString: return a copy of a string, but in reverse. */

 

function revString(str) {

  function revString_recursion(str, newStr){

    if(newStr.length === str.length) return newStr

    newstr +=str.pop();

  }

 

}

 

/** gatherStrings: given an object, return an array of all of the string values. */

 

function gatherStrings(obj) {

  //get the key value pairs

  const arr = Object.Values(obj)

  function gatherStrings_recurssion(arr, arrStr=[]){

    if(arr.length === 0) return (arrStr)

    let value = arr.pop();

    if(typeof(value) === String) arrStr.push(value)

    gatherStrings_recurssion(arr, arrStr);

  }

 

 

 

}

 

/** binarySearch: given a sorted array of numbers, and a value,

 * return the index of that value (or -1 if val is not present). */

 

function binarySearch(arr, val) {

 

  function binarySearch_recursion(arr, left=0, right=arr.length){

    if (left === right) return -1;

    if(arr[left] === val) return left;

    if(arr[right] === val) return right;

    let mid = Math.floor(right-left/2)

    if(arr[mid] === val) return mid;

    if(val > arr[mid]) binarySearch_recursion(arr, mid, right)

    if(val < arr[mid]) binarySearch_recursion(arr, left, mid)

  }

}

 

module.exports = {

  product,

  longest,

  everyOther,

  isPalindrome,

  findIndex,

  revString,

  gatherStrings,

  binarySearch

};

 

 

