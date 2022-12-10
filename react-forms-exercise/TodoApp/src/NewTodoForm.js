import React,{useState} from "react";

const NewTodoForm = ({addTodo}) =>{
    const INTIAL_STATE = {item : ""}
    const [formData, setFormData] = useState(INTIAL_STATE)

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name] : value
        }))
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        addTodo({...formData})
        setFormData(INTIAL_STATE);
    }
return (
    <form onSubmit={handleSubmit} style ={{padding: "20px"}}>
    <label htmlFor="item">Item</label>
        <input
            id = "item"
            type= "text"
            name="item"
            value={formData.item}
            onChange={handleChange}
        />
        <button>Add Item</button>
    </form>
)}

export default NewTodoForm;