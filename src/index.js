import React from "react";
import { render } from "react-dom";

import Autocomplete from "./Autocomplete";

require("./styles.css");

function App() {
  return (
    <div>
      <h1>React Animal Autocomplete Example</h1>
      <h2>Start typing and experience the autocomplete wizardry!</h2>
      <p>New! Autocomplete now suggests recently selected animals first.</p>
      <Autocomplete
        suggestions={[
          "Alligator",
          "Little Brown Bat",
          "Dog",
          "Bald Eagle",
          "Lion",
          "Red Panda",
          "Wyoming Toad"
        ]}
      />
    </div>
  );
}

const container = document.createElement("div");
document.body.appendChild(container);
render(<App />, container);
