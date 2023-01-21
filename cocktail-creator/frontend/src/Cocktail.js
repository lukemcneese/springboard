import React from "react";
import {Link} from "react-router-dom";

const Cocktail = ({idDrink, strDrink, strDrinkThumb, strCategory}) =>{
    return (
    <Link to={`/cocktails/${idDrink}`}>
        <div className="CocktailCard">
            <p>Drink: {strDrink}</p>
            <p>Cateogry: {strCategory}</p>
            <img src={`${strDrinkThumb}`} alt={{strDrink}} width="200px"/>
        </div>
    </Link>
    );
}
export default Cocktail