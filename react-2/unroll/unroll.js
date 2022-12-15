function unroll(squareArray) {
    let len = squareArray.length;
    let left = 0;
    const retArray = [];
    
    while(len>1){
        //get the top
        for (let i=left;i<len-1;i++){
            retArray.push(squareArray[left][i])
        }
        //get the right side
        for (let i=left;i<len-1; i++){
            retArray.push(squareArray[i][len-1])
        }
        //get the bottom 
        for (let i=len-1;i>left; i--){
            retArray.push(squareArray[len-1][i])
        }
        //get the left side
        for (let i=len-1; i>left; i--){
            retArray.push(squareArray[i][left])
        }
        //shrink the window that we are looking into inside the square
        len = len-1;
        left = left +1;
        //handle an odd length square which will leave you just one item in the center
        if(len === left-1){
            retArray.push(squareArray[len][len])
        }
    }
    return retArray
}

module.exports = unroll;
