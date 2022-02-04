const form = document.querySelector('#add-todo');
const todo = document.querySelector('#todo');
const todoList = document.querySelector('#todo-list');
let workingList = [];
//let workingList = [{}];
//let workingList = new Array();


form.addEventListener('submit', function(e){
    e.preventDefault();
    const newTodo = document.createElement('li');
    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove Todo';

    newTodo.innerText = todo.value;
    newTodo.appendChild(removeBtn);
    todoList.appendChild(newTodo);

    //cleaning up {} out of the array
    if (workingList[0].strike === undefined){
        workingList.shift();
    }

    //save the item to the working array and into local storage
    const newListItem = {todoItem:todo.value, strike: false};
    workingList.push(newListItem);
    localStorage.setItem("savedList", JSON.stringify(workingList));
    
    //clear the input text box
    todo.value = '';
});

todoList.addEventListener('click', function(e){
    if(e.target.tagName === 'BUTTON'){
        e.target.parentElement.remove();
        //remove the element from the working list
        for(let w = 0; w < workingList.length; w++){
            console.log(workingList[w].todoItem);
            let removedString = e.target.parentElement.innerText;
            removedString = removedString.replace('Remove Todo',"");
            if( workingList[w].todoItem == removedString){
                workingList.splice(w,1);
                break;
            }
                
        }
        localStorage.setItem("savedList", JSON.stringify(workingList));
    }
    else if(e.target.tagName === 'LI'){
        e.target.setAttribute('class', 'strike');
        let crossedItem = e.target.innerText;
        crossedItem = crossedItem.replace('Remove Todo',"");//how could I have done this better?
        //find the object in the working list and set Stike to True
        for(let w of workingList){
            if (w.todoItem === crossedItem){
                w.strike = true;
            }
        }
        //save the updated working list to local storage
        localStorage.setItem("savedList", JSON.stringify(workingList));
        //console.log("Updated the Saved list");
    }
});
document.addEventListener('DOMContentLoaded', function(e){
    let savedList = JSON.parse(localStorage.getItem("savedList"));
    const body = document.querySelector('#body');
    console.log(savedList);
    //const restoredList = document.createElement('ul');

    if (savedList){
        console.log("dom loaded & Saved list is true")

        //cleaning up {} out of the array
        if (workingList[0].strike === undefined){
            workingList.shift();
        }
        //loop through the working list array of objects saved and add them to the list
        //updating the strikethrough and adding the remove button
        for(let s of savedList){
            if (s != undefined){
                const newTodo = document.createElement('li');
                const removeBtn = document.createElement('button');
                removeBtn.innerText = 'Remove Todo';
                newTodo.innerText = s.todoItem;
                newTodo.appendChild(removeBtn);
                todoList.appendChild(newTodo);
                if(s.strike === true){
                    newTodo.setAttribute('class', 'strike');
                }
                workingList.push(s);
                localStorage.setItem("savedList", JSON.stringify(workingList));
                //console.log(workingList);
            }
        }
        //body.appendChild(restoredList);
    }
    else{
        console.log("NoSavedList");
    }
   
});