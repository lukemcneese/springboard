//display details about a cocktail including preparation instructions, ingrediants with images
//maybe go into a cocktail creation mode that renders ingrediants with an onclick that removes
//them from the list or grays them out as you have used them.

import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import CocktailAPI from "./CocktailAPI";
import LoadingSpinner from "./LoadingSpinner";
import parse from "html-react-parser";

function CocktailDetail(){
    const {idDrink} = useParams();
    console.debug("CocktailDetail","idDrink=",idDrink)
    const [cocktail, setCocktail] = useState(null)

    useEffect(function getCocktailDetail(){
        async function getCocktailDetailfromDB(){
            setCocktail(await CocktailAPI.getCocktail(idDrink));
        }
        getCocktailDetailfromDB()
    },[cocktail, idDrink])

    function renderIngredients(){
        let ingredientHTML = "<table><tr><th>Ingredient</th><th>Measurement</th></tr>"
        for(let i = 1; i<16; i++){
            let ingredientKey = "strIngredient" + i;
            let measureKey = "strMeasure" + i;
            if (cocktail[ingredientKey] === null){break}
            ingredientHTML += "<tr>";
            ingredientHTML += `<td> ${cocktail[ingredientKey]}</td>`;
            ingredientHTML += `<td> ${cocktail[measureKey]}</td>`;
            ingredientHTML += "</tr>";
        }

        ingredientHTML += "</table>"
        return ingredientHTML;

    }

    if (!cocktail) return <LoadingSpinner />;

    return (
        <>
            <img src={`${cocktail.strDrinkThumb}`} alt={`${cocktail.strDrink}`} width="200px"/>
            <h4>{cocktail.strDrink}</h4>
            <p>Cateogry: {cocktail.strCategory}</p>
            <p>Glass: {cocktail.strGlass}</p>
            <p>{cocktail.strInstructions}</p>
            {parse(renderIngredients())}
        </>
    );
}
export default CocktailDetail