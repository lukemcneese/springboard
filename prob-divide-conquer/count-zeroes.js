function countZeroes(array) {
  let left = 0;
  let right = array.length -1;
  let idx = findFirst(array, left, right)
  if (idx === -1) return 0;
  return array.length - idx;
}

function findFirst(array, left, right) {
    if (right >= left) {
      let mid = left + Math.floor((right - left) / 2)
      if ((mid === 0 || array[mid - 1] === 1) && array[mid] === 0) {
        return mid;
      } else if (array[mid] === 1) {
        return findFirst(array, mid + 1, right)
      }
      return findFirst(array, left, mid - 1)
    }
    return -1;
  }

module.exports = countZeroes