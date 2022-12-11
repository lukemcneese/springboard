import React from "react";
import { useParams } from "react-router-dom";

function DogDetails({defaultProps}) {
    const {name} = useParams();
    const dog = defaultProps.dogs.filter(dog => dog.name === name)[0]
  return (
      <div>
        <h1>Dog Details Page for : {dog.name} </h1>
        <h3>Age: {dog.age}</h3>
        <ul>
            <li>{dog.facts[0]}</li>
            <li>{dog.facts[1]}</li>
            <li>{dog.facts[2]}</li>
        </ul>
        <img className="previewImg" src={`../${dog.src}`} alt={dog.name}/>
    </div>
  );
}
export default DogDetails
