import React, {useState, useEffect} from "react";
import Cocktail from "./Cocktail"
import CocktailAPI from "./CocktailAPI";
import SearchForm from "./SearchForm";
import LoadingSpinner from "./LoadingSpinner"
import 'bootstrap/dist/css/bootstrap.min.css';

function Cocktails(){
    const [cocktails, setCocktails] = useState([])

    useEffect(function getCocktailsOnMount() {
        search();
    }, []);

    /** Triggered by search form submit; reloads Cocktails. */
    async function search(name) {
        let cocktails = await CocktailAPI.getCocktailsName(name);
        setCocktails(cocktails);
    }
    if (!cocktails) return <LoadingSpinner />;
     return (
        <>
            <SearchForm searchFor={search} />
             {cocktails.length
                ? 
                (<div className="container-fluid">
                    <div className="row">
                        {cocktails.map(({idDrink, strDrink, strDrinkThumb, strCategory}) =>(
                        <Cocktail
                            key={idDrink}
                            idDrink = {idDrink} 
                            strDrink={strDrink}
                            strDrinkThumb={strDrinkThumb}
                            strCategory={strCategory}
                        />
                        ))} 
                    </div>
                </div>) : <p> No Results Found</p>}
        </>
      );
  }
  export default Cocktails;