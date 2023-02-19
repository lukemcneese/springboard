// add whatever parameters you deem necessary
function separatePositive(nums, left = 0, right = nums.length-1, sorted=false) {
    
    while(!sorted){
        if(left === right) sorted = true;
        if(nums[left]>0) left++;
        else if(nums[right]<0) right--;
        else{//swap
            let temp = nums[left];
            nums[left] = nums[right];
            nums[right] = temp;
        }
    }
    

}
