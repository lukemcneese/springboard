import React from "react"
import {v4 as uuid} from "uuid";
import './DogList.css';

function DogList({defaultProps}) {
    const dogImgs = defaultProps.dogs.map((dog) =>
    <div key={uuid()} className="dog">
        <h4>{dog.name}</h4>
        <img className="previewImg" src={`../${dog.src}`} alt={dog.name}/>
    </div>
);
  return (
    <div className="dogList">
        {dogImgs}
    </div>
  );
}
export default DogList