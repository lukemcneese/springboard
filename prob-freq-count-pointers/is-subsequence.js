// add whatever parameters you deem necessary
function isSubsequence(sub,str) {
    let subIdx = 0;
    let strIdx = 0;
    while (strIdx < str.length){
        if(str[strIdx] === sub[subIdx]) subIdx ++;
        if(subIdx === sub.length) return true;
        strIdx ++;
    }
    return false;
}
