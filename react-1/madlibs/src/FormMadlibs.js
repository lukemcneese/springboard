import React,{useState} from "react";

const FormMadlibs = ({addMadLib, toggleFormVisible}) =>{
    const INTIAL_STATE = {
        noun : "",
        noun2 : "",
        adjective : "",
        color : ""
    }
    const [formData, setFormData] = useState(INTIAL_STATE);

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setFormData(formData => ({
            ...formData,
            [name] : value
        }))
    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        addMadLib({...formData})
        setFormData(INTIAL_STATE);
        toggleFormVisible();
    }
    return (
        <form onSubmit={handleSubmit} style ={{padding: "20px"}}>
        <label htmlFor="noun">Noun</label>
            <input
                id = "noun"
                type= "text"
                name="noun"
                value={formData.noun}
                onChange={handleChange}
            /><br/>
            <label htmlFor="noun2">Noun2</label>
            <input
                id = "noun2"
                type="text"
                name="noun2"
                value={formData.noun2}
                onChange={handleChange}
            /><br/>
            <label htmlFor="adjective">Adjective</label>
            <input
                id = "adjective"
                type="text"
                name="adjective"
                value={formData.adjective}
                onChange={handleChange}
            /><br/>
            <label htmlFor="color">Color</label>
            <input
                id = "color"
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
            /><br/>
            <button>Show the Madlib!</button>
        </form>
    )}
    
export default FormMadlibs;