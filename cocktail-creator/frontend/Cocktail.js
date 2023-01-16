import React from "react"

const Cocktail = ({idDrink, strDrink, strDrinkThumb, strCateogry}) =>{
    return (
    <div className="CocktailCard">
        <p>Drink: {strDrink}</p>
        <p>Cateogry: {strCateogry}</p>
        <img src={{strDrinkThumb}}></img>
    </div>
    );
}
export default Cocktail