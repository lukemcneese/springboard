function findRotatedIndex(array, num) {
 let pivot = findPivot(array)
 if (pivot > 0 && num >= array[0] && num <= array[pivot - 1]) {
    return binarySearch(array, num, 0, pivot - 1);
  } else {
    return binarySearch(array, num, pivot, array.length - 1);
  }
}

function binarySearch(array, num, left, right) {
    if (array.length === 0) return -1;
    if (num < array[left] || num > array[right]) return -1;
  
    while (left <= right) {
      var mid = Math.floor((left + right) / 2);
      if (array[mid] === num) {
        return mid;
      } else if (num < array[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    }
    return -1;
  }

  function findPivot(arr) {
    if (arr.length === 1 || arr[0] < arr[arr.length - 1]) return 0;
    var left = 0
    var right = arr.length - 1;
    while (left <= right) {
      var mid = Math.floor((left + right) / 2);
      if (arr[mid] > arr[mid + 1]) return mid + 1
      else if (arr[left] <= arr[mid]) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
  }



module.exports = findRotatedIndex