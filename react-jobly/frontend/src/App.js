import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter} from "react-router-dom";
import useLocalStorage from "./useLocalStorage";
import Home from "./Home";
import NavBar from "./NavBar";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Jobs from "./Jobs"
import Companies from "./Companies"
import './App.css';
import JoblyApi from "./JoblyApi";
import jwt from "jsonwebtoken"
import ProtectedRoute from "./ProtectedRoute";
import UserContext from "./UserContext";


function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useLocalStorage("jobly-token");
  const [appIds, setAppIds] = useState(new Set([]));

  useEffect(() => {
    async function getCompaniesJobs() {
      let companies = '';
      setCompanies(companies);
      let jobs = "";
      setJobs(jobs)
      setIsLoading(false);
    }
    getCompaniesJobs();
  }, []);

  useEffect(()=>{
    async function getCurrentUser(){
      if (token){
        try{
          let {username} = jwt.decode(token);
          JoblyApi.token = token;
          let user = await JoblyApi.getCurrentUser(username);
          setCurrUser(user)
          //setAppIds(new Set(currUser.applications))
        } catch (error){
          setCurrUser(null);
        }
      }
      setIsLoading(false);
    }
    setIsLoading(true);
    getCurrentUser();
  }, [token])

  async function register(credentials) {
    try {
      let token = await JoblyApi.signup(credentials);
      setToken(token);
      return { success: true };
    } catch (errors) {
      console.error("register failed", errors);
      return { success: false, errors };
    }
  }

  async function login(credentials) {
    try {
      let token = await JoblyApi.login(credentials);
      setToken(token);
      return { success: true };
    } catch (errors) {
      return { success: false, errors };
    }
  }

  function logout() {
    setCurrUser(null);
    setToken(null);
  }

  function hasApplied(id){
    return appIds.has(id)
  }
  function applyToJob(id){
    if (hasApplied(id)) return;
    JoblyApi.applyToJob(currUser.username, id);
    setAppIds(new Set([...appIds, id]))
  }
  
  if (isLoading) {
    return <p>Loading page;</p>;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider value ={{currUser, setCurrUser, hasApplied, applyToJob}}>
        <NavBar logout={logout}/>
        <main>
          <Routes>
            <Route path="/"element={<Home/>}/>
            <Route path="/companies" element={<ProtectedRoute><Companies/></ProtectedRoute>}/>
            <Route path="/companies/:id" element={<ProtectedRoute><Companies companies={companies}/></ProtectedRoute>} cantFind="/companies" />
            <Route path="/jobs" element={<ProtectedRoute><Jobs jobs={jobs}/></ProtectedRoute>}/>
            <Route path="/jobs/:id"element={<ProtectedRoute><Jobs jobs={jobs}/></ProtectedRoute>} cantFind="/jobs" />
            <Route exact path="/profile" element={<Profile/>} cantFind="/" />
            <Route exact path="/login"element={<Login  login={login}/>} cantFind="/" />
            <Route exact path="/register"element={<Register register={register} />} cantFind="/" />
          </Routes>
        </main>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
