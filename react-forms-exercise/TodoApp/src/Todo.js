import React from "react";

const Todo = ({id, item, removeTodo}) =>{
const remove = () =>removeTodo(id)
return (
    <li>
        {item}
        <button onClick={remove}>X</button>
    </li> 
)}
export default Todo;
