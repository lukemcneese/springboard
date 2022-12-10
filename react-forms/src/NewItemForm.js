import React,{useState} from "react";

const NewItemForm = () =>{
    const INTIAL_STATE = {
        name: "",
        qty: ""
    }
    const [formData, setFormData] = useState(INTIAL_STATE)
    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData.name,
            [name] : value
        }))
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        const {name, qty} = formData;
        //save 
        setFormData(INTIAL_STATE);
    }
return (
    <form>
        <label htmlFor="name">Product</label>
        <input
            id = "name"
            type="text"
            name="name"
            placeholder="Item Name"
            value={formData.name}
            onChange={handleChange}
        />
        <label htmlFor="qty">Qty</label>
        <input
            id = "qty"
            type="text"
            name="qty"
            placeholder="qty"
            value={formData.qty}
            onChange={handleChange}
        />
    </form>
)}

export default NewItemForm;