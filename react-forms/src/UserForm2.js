import React, {useState} from "react";

const UserForm = () => {
    const [isInvalid, setIsInvalid] = useState(true)
    const [isTouched, setIsTouched] = usestate(false)
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        phone : "",
    });

    const handleChange = (e) => {
        setIsTouched(true)
        const {name, value} = e.target;
        if (value === ''){
            setIsInvalid(true); 
        } else {
            setIsInvalid(false);
        }
        setFormData(fData =>({
            ...fData,
            [name] : value
        }));

    }
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(!isInvalid){
            const {username, email, phone} = formData;
            //submit form data to api
            setFormData({
                username: "",
                email: "",
                phone : "",
            })
        }
    }
return (
 <form onSubmit={handleSubmit} >
     <label htmlFor="username" >Username</label>
     <input 
        id="username" 
        type = "text"
        name = "username"
        placeholder="username" 
        value = {formData.username} 
        onChange={handleChange}
    />
    <label htmlFor="email" >Email</label>
     <input 
        id="email" 
        type = "email" 
        name = "email"
        placeholder="email" 
        value = {formData.email} 
        onChange={handleChange}
    />
    {isInvalid && isTouched && <span>Email cannot be blank!</span>}
    <label htmlFor="phone" >Phone</label>
     <input 
        id="phone" 
        type = "text" 
        name = "phone"
        placeholder="phone" 
        value = {formData.phone} 
        onChange={handleChange}
    />
     <button onClick={handleSubmit}>Add me to the List!</button>
 </form>   
)
}
export default UserForm;