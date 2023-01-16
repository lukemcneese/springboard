import React,{useState, useEffect} from "react";
import Cocktail from "./Cocktail";
import CocktailAPI from "./cocktailAPI";


function App() {
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    async function seedCocktail() {
      let cocktail = await.CocktailAPI.getRandom();
      setCocktail(cocktail);
      setIsLoading(false);
    }
    seedCocktail();
  }, [cocktail]);


  if (isLoading) {
    return <p>Loading page;</p>;
  }
  return (
    <div className="App">
      <Cocktail></Cocktail>
    </div>
  );
}

export default App;
