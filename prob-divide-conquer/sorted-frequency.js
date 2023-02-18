function sortedFrequency(array, num) {

    let first = findFirst(array,num);
    if (first === -1) return -1;
    let last = findLast(array,num);
    return last - first +1;
}

function findFirst(array, num, left = 0, right=array.length-1){
    if (right >= left){
        let mid = Math.floor((left+right)/2)
        if ((mid === 0 || num> array[mid-1]) && array[mid]===num){
            return mid;
        } else if(num> array[mid]){
            return findFirst(array, num, mid+1, right)
        } else{
            return findFirst(array, num, left, mid -1)
        }
    }
    return -1;
}
function findLast(array, num, left = 0, right=array.length-1){
    if (right >= left){
        let mid = Math.floor((left+right)/2)
        if ((mid === array.length-1 || num < array[mid+1]) && array[mid]===num){
            return mid;
        } else if(num < array[mid]){
            return findLast(array, num, left, mid -1)
        } else{
            return findLast(array, num, mid+1, right)
        }
    }
    return -1;
}

module.exports = sortedFrequency