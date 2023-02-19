// add whatever parameters you deem necessary
function twoArrayObject(keys, values) {
    let map = {};
    for(let i=0; i<keys.lenth; i++){
        map[keys[i]] = values[i] || null;
    }
    return map;
}
