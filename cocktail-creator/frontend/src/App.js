import React,{useState, useEffect} from "react";
import Cocktail from "./Cocktail";
import CocktailAPI from "./CocktailAPI";


function App() {
  const [rndCocktail, setRndCocktail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function seedRndCocktail() {
      let cocktail = await CocktailAPI.getRandom();
      setRndCocktail(cocktail);
      setIsLoading(false);
    }
    seedRndCocktail();
  },[]);

  if (isLoading) {
    return <p>Loading page;</p>;
  }
  return (
    <div className="App">
      <Cocktail 
        idDrink={rndCocktail.idDrink}
        strDrink={rndCocktail.strDrink}
        strDrinkThumb={rndCocktail.strDrinkThumb}
        strCategory={rndCocktail.strCategory}
      ></Cocktail>
    </div>
  );
}

export default App;
