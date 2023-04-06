import "./App.scss";
import NavBar from "./components/NavBar";
import DisplayPage from "./components/DisplayPage";
import { useState } from "react";

function App() {
  return (
    <div className="App">
      <NavBar />
      <DisplayPage />
    </div>
  );
}

export default App;
