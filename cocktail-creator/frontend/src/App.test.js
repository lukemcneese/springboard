import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';

import App from "./App";
//import TestNav from "./TestNav";
import Login from "./Login"

test("renders without crashing", async function() {
   render(<App/>);
});

// test("loads and displays", async () => {
//   render(<TestNav/>)
// })
