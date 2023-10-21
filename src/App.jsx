import React, { useState } from "react";
import NavBar from "./components/NavBar";
import DisplayPage from "./components/DisplayPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <div className="App">
      <NavBar />
      <DisplayPage />
    </div>
  );
}

export default App;
