import React,{useState, useEffect} from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Cocktails from "./Cocktails";
import Inventory from "./Inventory";
import CocktailDetail from "./CocktailDetail";
import CocktailAPI from "./CocktailAPI";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import UserContext from "./UserContext";
import useLocalStorage from "./useLocalStorage";
import jwt from "jsonwebtoken";
import NavigationBar from "./NavigationBar";

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = "cocktailCreator-token";



function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

    // Load user info from API. Until a user is logged in and they have a token,
  // this should not run. It only needs to re-run when a user logs out, so
  // the value of the token is a dependency for this effect.

  useEffect(function loadUserInfo() {
    console.debug("App useEffect loadUserInfo", "token=", token);

    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          // put the token on the Api class so it can use it to call the API.
          CocktailAPI.token = token;
          let currentUser = await CocktailAPI.getCurrentUser(username);
          setCurrentUser(currentUser);
        } catch (err) {
          console.error("App loadUserInfo: problem loading", err);
          setCurrentUser(null);
        }
      }
      setIsLoading(false);
    }

    // set isLoading to ture while async getCurrentUser runs; once the
    // data is fetched (or even if an error happens!), this will be set back
    // to true to control the spinner.
    setIsLoading(true);
    getCurrentUser();
  }, [token]);

   /** Handles site-wide logout. */
   function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  /** Handles site-wide register.
   *
   * Automatically logs them in (set token) upon register.
   *
   * Make sure you await this function and check its return value!
   */
  async function register(registerData) {
    try {
      let token = await CocktailAPI.signup(registerData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("register failed", errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.
   *
   * Make sure you await this function and check its return value!
   */
  async function login(loginData) {
    try {
      let token = await CocktailAPI.login(loginData);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("login failed", errors);
      return { success: false, errors };
    }
  }

  // useEffect(() => {
  //   async function seedRndCocktail() {
  //     let cocktail = await CocktailAPI.getRandom();
  //     console.log(cocktail);
  //     setRndCocktail(cocktail);
  //     setIsLoading(false);
  //   }
  //   setIsLoading(true);
  //   seedRndCocktail();
  // },[]);

  if (isLoading) {
    return <p>Loading page;</p>;
  }

  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value = {{currentUser, setCurrentUser}}>
          <NavigationBar logout={logout}/>
          <Routes>
            <Route path="/"element={<Home/>}/>
            <Route path="/login" element={<Login login={login}/>}/>
            <Route path="/register" element={<Register register={register}/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/cocktails/" element={<Cocktails/>}/>
            <Route path="/cocktails/:idDrink" element={<CocktailDetail/>} cantFind="/cocktails" />
            <Route path="/inventory/" element={<Inventory/>}/>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
