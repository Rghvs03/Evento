import React from "react";
import AppRouter from "./Router/AppRouter";
import Navigation from "./Router/Navigation";

const App = () => {
  return (
    <div>
      <Navigation />
      <AppRouter />
    </div>
  );
};

export default App;
