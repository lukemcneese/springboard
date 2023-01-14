import React, {useState} from "react";
import {useNavigate} from "react-router-dom"

  function Login({login}){
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
      username: "",
      password: ""
    });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt){
      evt.preventDefault();
      let result = await login(formData);
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
      <h1>Login</h1>
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
              type="text"
              name="password"
              value={formData.password}
              onChange={handleChange}
           /><br/>
           {formErrors.length ? alert(formErrors) : null}
          <button>Login</button>
         </form> 
        </div>
      </>
    
    
    )
  }
  export default Login;