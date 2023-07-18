import React from "react";
// components
import Inputtodo from "./components/Inputtodo";
import Listtodo from "./components/Listtodo";

function App() {
  return (
    <div className="App">
      <div className="container">
        <Inputtodo />
        <Listtodo />
      </div>
    </div>
  );
}

export default App;
