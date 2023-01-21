import React,{useState, useEffect} from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom"
import Cocktail from "./Cocktail";
import Cocktails from "./Cocktails";
import CocktailDetail from "./CocktailDetail";
import CocktailAPI from "./CocktailAPI";
import Home from "./Home";


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
    <BrowserRouter>
        <Cocktail 
          idDrink={rndCocktail.idDrink}
          strDrink={rndCocktail.strDrink}
          strDrinkThumb={rndCocktail.strDrinkThumb}
          strCategory={rndCocktail.strCategory}
        ></Cocktail>
        <Cocktails/>
        <main>
          <Routes>
            <Route path="/"element={<Home/>}/>
            <Route path="/cocktails/:idDrink" element={<CocktailDetail/>} cantFind="/cocktails" />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
