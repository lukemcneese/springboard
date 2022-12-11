import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DogList from "./DogList"
import DogDetails from "./DogDetails"
import Nav from "./Nav"
import './App.css';
import {defaultProps} from './DefaultDogs';
import React from "react"

function App() {
  const dogNames = defaultProps.dogs.map((dog) => dog.name)
  return (
    <div className="App">
      <BrowserRouter>
        <Nav dogNames={dogNames}/>
        <Routes>
          <Route path="/dogs" element={<DogList defaultProps={defaultProps}/>} />
          <Route path="/dogs/:name" element= {<DogDetails defaultProps={defaultProps}/>}/> 
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
