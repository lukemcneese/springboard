import React, {useState, useContext} from "react";
import CocktailAPI from "./CocktailAPI";
import UserContext from "./UserContext";

  function Profile(){
    const {currentUser, setCurrentUser} = useContext(UserContext)
    const [formData, setFormData] = useState({
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      username: currentUser.username,
      password: "",
    });
    const [formErrors, setFormErrors] = useState([]);

    async function handleSubmit(evt) {
      evt.preventDefault();
  
      let profileData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
      };
      let username = formData.username;
      let updatedUser;
  
      try {
        updatedUser = await CocktailAPI.saveProfile(username, profileData);
      } catch (errors) {
        setFormErrors(errors);
        return;
      }
  
      setFormData(f => ({ ...f, password: "" }));
      setFormErrors([]);
      setCurrentUser(updatedUser);
    }
      function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(data => ({...data,[name]: value}));
        setFormErrors([]);
      }
      return(
        <>
        <h1>Update Profile</h1>
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
            <button>Update Profile</button>
           </form> 
          </div>
        </>
      )
  }
  export default Profile;