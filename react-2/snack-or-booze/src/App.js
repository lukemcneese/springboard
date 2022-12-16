import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import SnackOrBoozeApi from "./Api";
import NavBar from "./NavBar";
import { Route, Switch } from "react-router-dom";
import Menu from "./Menu";
import FoodItem from "./FoodItem";
import Add from "./Add";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [snacks, setSnacks] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    async function getMenu() {
      let snacks = await SnackOrBoozeApi.get("snacks");
      setSnacks(snacks);
      let drinks = await SnackOrBoozeApi.get("drinks");
      setDrinks(drinks)
      setIsLoading(false);
    }
    getMenu();
  }, []);

  const addSnacks = snack =>{
    setSnacks(snacks => [...snacks, snack])
    SnackOrBoozeApi.set(snack, "snacks")
  }
  const addDrinks = drink =>{
    setDrinks(drinks => [...drinks, drink])
    SnackOrBoozeApi.set(drink, "drinks")
  }

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <main>
          <Switch>
            <Route exact path="/">
              <Home counts={{snacks: snacks.length, drinks: drinks.length}}/>
            </Route>
            <Route exact path="/snacks">
              <Menu items={snacks} menuType="snacks" title="Snacks" />
            </Route>
            <Route path="/snacks/:id">
              <FoodItem items={snacks} cantFind="/snacks" />
            </Route>
            <Route exact path="/drinks">
              <Menu items={drinks} menuType="drinks" title="Drinks" />
            </Route>
            <Route path="/drinks/:id">
              <FoodItem items={drinks} cantFind="/drinks" />
            </Route>
            <Route path="/add">
              <Add addDrinks={addDrinks} addSnacks={addSnacks} cantFind="/" />
            </Route>
            <Route>
              <p>Hmmm. I can't seem to find what you want.</p>
            </Route>
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
