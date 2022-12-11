import React from 'react'
import { Link, useParams } from "react-router-dom";
import "./Color.css";


function Color({colors}) {
    const {color} = useParams();
    const hex = colors[color];

  return (
    <div className="Color" style={{backgroundColor: `${hex}`}}>
        <h4>{color}</h4>
        <p><Link to="/colors">Go back</Link></p>
    </div>
  );
}

export default Color;
