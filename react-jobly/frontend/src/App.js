import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter} from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";
import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import Jobs from "./Jobs"
import Companies from "./Companies"
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [companies, setCompanies] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function getCompaniesJobs() {
      let companies = ''//await Api.get("companies");
      setCompanies(companies);
      let jobs = ""//await Api.get("jobs");
      setJobs(jobs)
      setIsLoading(false);
    }
    getCompaniesJobs();
  }, []);
  
  if (isLoading) {
    return <p>Loading page;</p>;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Routes>
            <Route path="/"element={<Home/>}/>
            <Route path="/companies" element={<Companies/>}/>
            <Route path="/companies/:id" element={<Companies companies={companies}/>} cantFind="/companies" />
            <Route path="/jobs" element={<Jobs jobs={jobs}/>}/>
            <Route path="/jobs/:id"element={<Jobs jobs={jobs}/>} cantFind="/jobs" />
            <Route exact path="/profile" element={<Profile/>} cantFind="/" />
            <Route exact path="/login"element={<Login/>} cantFind="/" />
            <Route exact path="/register"element={<Register/>} cantFind="/" />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
