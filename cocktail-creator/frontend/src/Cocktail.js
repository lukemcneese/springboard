import React from "react"

const Cocktail = ({idDrink, strDrink, strDrinkThumb, strCategory}) =>{
    return (
    <div className="CocktailCard">
        <p>Drink: {strDrink}</p>
        <p>Cateogry: {strCategory}</p>
        <img src={`${strDrinkThumb}`} alt={{strDrink}} width="300px"/>
    </div>
    );
}
export default Cocktail