import React, {useState} from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import ColorList from './ColorList';
import Color from './Color';
import AddColorForm from './AddColorForm';

function App() {
  const [colors, setColors] = useState({red : "#FF0000",
                                        blue: "#00FF00" ,
                                        green : "#0000FF" });
  const addColor = color =>{
    setColors(colors => ({...colors, ...color}));
  }
    return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/colors" element={<ColorList colors={colors}/>} />
            <Route path='/colors/new' element={<AddColorForm addColor={addColor}/>}/>
            <Route path="/colors/:color" element={<Color colors={colors}/>}/> 
          </Routes>
        </BrowserRouter>
      </div>
    );
}

export default App;
