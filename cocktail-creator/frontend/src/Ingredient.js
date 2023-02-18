import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const Ingredient = ({id,ingredient, quantity, handleClick}) =>{
    return (
        <div className="card" style={{width: '18rem'}}>
        <img src={`https://www.thecocktaildb.com/images/ingredients/${ingredient}-Medium.png`} alt={`${ingredient}`} className="card-img-top"/>
            <div className="card-body">
                <h4 className="card-title">{ingredient}</h4>
                <p className="card-text">Quantity: {quantity}</p>
                <div>
                    <button id={id} onClick={handleClick} type="submit" name={"add"} className="btn btn-success">Add</button>
                    <button id={id} onClick={handleClick} type="submit" name={"remove"} className="btn btn-danger">Remove</button>
                </div>
            </div>
        </div>
        
    );
}
export default Ingredient