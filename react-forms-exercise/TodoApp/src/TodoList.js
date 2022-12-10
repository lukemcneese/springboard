import React,{useState} from "react";
import Todo from "./Todo"
import NewTodoForm from "./NewTodoForm";
import {v4 as uuid} from "uuid";

const TodoList = () =>{
    const INTIAL_LIST = []
    const [Todos, setTodos] = useState(INTIAL_LIST)

    const addTodo = Todo =>{
        let newTodo = {...Todo, id :uuid()};
        setTodos(Todos => [...Todos, newTodo])
    }
    const removeTodo = id =>{
        setTodos(Todos => Todos.filter(Todo => Todo.id !== id));
    }
    return (
        <div>
            <h3>Todo</h3>
            <NewTodoForm addTodo={addTodo}/>
            <ul>
                {Todos.map(({id, item}) => <Todo id= {id} key={id} item={item} removeTodo= {removeTodo} />)}
            </ul>
        </div>
    )
    }
    export default TodoList;