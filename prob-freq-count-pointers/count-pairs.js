// add whatever parameters you deem necessary
function countPairs(nums, targetSum,left=0,right=nums.length) {
    nums.sort((a,b) =>a-b);
    let count = 0;

    while (left < right){
        let sum = nums[left] + nums[right];
        if (sum === targetSum){
            count ++;
            left ++;
            right --;
        } 
        else if (sum < targetSum) left ++;
        else right --;
    }
    return count;    
}
