function findRotationCount(array, left=0, right = array.length-1) {
    if (right < left) return 0;
    if (right === left) return left;
    let mid = Math.floor((left + right)/2)
    
    if( mid < right && array[mid+1]< array[mid]){
        return mid + 1;
    }

    if (mid > left && array[mid] < array[mid-1]){
        return mid;
    }
    if (array[right]> array[mid]){
        return findRotationCount(array, left, mid-1);
    }
    return findRotationCount(array, mid+1, right);
  
}

module.exports = findRotationCount