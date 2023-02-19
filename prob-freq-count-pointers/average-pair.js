// add whatever parameters you deem necessary
function averagePair(nums, targetAvg, left = 0, right = nums.length-1) {
    while(left < right){
        let avg = (nums[left] + nums[right])/2;
        if (avg === targetAvg) return true;
        else if (avg < targetAvg) left ++;
        else right --;
    }
    return false;
}
