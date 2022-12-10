import React,{useState} from "react";

const NewBoxForm = ({addBox}) =>{
    const INTIAL_STATE = {
        color: "#FFA500",
        width: 150,
        height: 150
    }
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
        addBox({...formData})
        setFormData(INTIAL_STATE);
    }
return (
    <form onSubmit={handleSubmit} style ={{padding: "20px"}}>
    <label htmlFor="color">Color</label>
        <input
            id = "color"
            type= "color"
            name="color"
            value={formData.color}
            onChange={handleChange}
        /><br/>
        <label htmlFor="width">Width</label>
        <label htmlFor="width">: {formData.width}px</label>
        <input
            id = "width"
            type="range"
            name="width"
            step= {10}
            min= {25}
            max= {250}
            value={formData.width}
            onChange={handleChange}
        /><br/>
        <label htmlFor="height">Height</label>
        <label htmlFor="height">: {formData.height}px</label>
        <input
            id = "height"
            type="range"
            name="height"
            step={5}
            min= {20}
            max= {250}
            value={formData.height}
            onChange={handleChange}
        /><br/>
        <button>Add Box</button>
    </form>
)}

export default NewBoxForm;