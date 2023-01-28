import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom';

import App from "./App";

it("renders without crashing", function() {
   render(<App/>);
});

// test("loads and displays", async () => {
//   render(<TestNav/>)
// })
