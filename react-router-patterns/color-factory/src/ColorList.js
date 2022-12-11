import React from 'react'
import { Link } from "react-router-dom";

function ColorList({colors}) {
    const colorLinks = Object.keys(colors).map(colorName => (
        <li key={colorName}>
          <Link to={`/colors/${colorName}`}>{colorName}</Link>
        </li>));

  return (
    <div className="ColorList">
        <h1>Welcome to the Color Factory</h1>.
        <h2><Link to="/colors/new">Add a color</Link></h2>
        <h3>Please Select a Color</h3>
        <ul>{colorLinks}</ul>
    </div>
  );
}

export default ColorList;
