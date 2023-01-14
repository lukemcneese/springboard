import React, {useState} from "react";
import {useNavigate} from "react-router-dom"

function Register({register}){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      email: ""
    });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt){
      evt.preventDefault();
      let result = await register(formData);
      if(result.success){
        navigate("/companies");
      } else{
        setFormErrors(result.errors);
      }
    }

    function handleChange(evt){
      const {name, value} = evt.target;
      setFormData(data => ({...data, [name]:value}))
    }
    return (
      <>
      <h1>Register</h1>
        <div>
         <form onSubmit={handleSubmit}>
           <label htmlFor="username">Username</label>
           <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
           /><br/>
           <label htmlFor="password">Password</label>
           <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
           /><br/>
          <label htmlFor="firstName">First Name</label>
           <input
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
           /><br/>
          <label htmlFor="lastName">Last Name</label>
           <input
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
           /><br/>
           <label htmlFor="email">Email</label>
           <input
              id="email"
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
           /><br/>
           {formErrors.length ? alert(formErrors) : null}
          <button>Login</button>
         </form> 
        </div>
      </>
    
    
    )
  }
  export default Register;