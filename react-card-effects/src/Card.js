import React from "react";

const Card = ({code, image}) => {
  return (
    <img src={image} alt={code}/>
  );
};
export default Card;
