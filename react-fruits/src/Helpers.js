
function choice(items){
const itemIdx = Math.floor(Math.random() * items.length())
return items[itemIdx];
}

function remove(items, item){
return items.filter(function(value,index,arr){
    return value !== item;
})
}

export {choice, remove};