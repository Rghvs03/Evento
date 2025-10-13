import React, { useState, useEffect } from "react";
import AppRouter from "./Router/AppRouter";
import Navigation from "./Router/Navigation";
import { getUser } from "./services/Auth";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser()
      .then((u) => setUser(u))
      .catch(() => setUser(null));
  }, []);

  return (
    <div>
      <Navigation user={user} setUser={setUser} />
      {/* Pass user/setUser as props to AppRouter also */}
      <AppRouter user={user} setUser={setUser} />
    </div>
  );
};

export default App;
