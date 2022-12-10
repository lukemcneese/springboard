import React, {useState} from "react";

const UserForm = () => {
const [username, setUsername] = useState("");
const handleChange = (e) =>{
    setUsername(e.target.value)
}
const handleSubmit = (e) =>{
    e.preventDefault();
    //setUsername(username);
    setUsername("");
}
return (
 <form onSubmit={handleSubmit} >
     <label htmlFor="username" >Username</label>
     <input id="username" type = "text" placeholder="username" value = {username} onChange={handleChange}/>
     <button onClick={handleSubmit}>Add me to the List!</button>
 </form>   
)
}
export default UserForm;