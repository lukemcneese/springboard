import React from "react";
import NavBar from "./NavBar";
import Candy from "./Candy";
import Chips from "./Chips";
import Soda from "./Soda";
import { BrowserRouter, Route } from "react-router-dom";

function VendingMachine() {
  return (
    <div className="VendingMachine">
      <h1>VendingMachine</h1>
      <img src="https://grid.gograph.com/vending-machine-mascot-vector-clipart_gg61615861.jpg"
           alt="VendingMachine"/>
      <BrowserRouter>
        <NavBar/>
      <Route exact path="/candy">
          <Candy/>
      </Route>
      <Route exact path="/chips">
          <Chips/>
      </Route>
      <Route exact path="/soda">
          <Soda/>
      </Route>
      </BrowserRouter>
    </div>
  );
}

export default VendingMachine;
