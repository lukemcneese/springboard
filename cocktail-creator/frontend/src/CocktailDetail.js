import React, {useState, useEffect} from "react"
import { useParams } from "react-router-dom";
import CocktailAPI from "./CocktailAPI";
import LoadingSpinner from "./LoadingSpinner";
import parse from "html-react-parser";
import 'bootstrap/dist/css/bootstrap.min.css';
import Rating from "./Rating";


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
        <div className="card justify-content-center" style={{width: '18rem'}}>
            <img src={`${cocktail.strDrinkThumb}`} alt={`${cocktail.strDrink}`} className="card-img-top"/>
            <div className="card-body">
                <h4 className="card-title">{cocktail.strDrink}</h4>
                <p className="card-text">Cateogry: {cocktail.strCategory}</p>
                <p className="card-text">Glass: {cocktail.strGlass}</p>
                <p className="card-text">{cocktail.strInstructions}</p>
                {parse(renderIngredients())}
                <br/>
                <Rating idDrink={cocktail.idDrink}/>
            </div>
        </div>
    );
}
export default CocktailDetail