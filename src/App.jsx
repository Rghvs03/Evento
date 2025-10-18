import React, { useState, useEffect } from "react";
import AppRouter from "./Router/AppRouter";
import Navigation from "./Router/Navigation";
import { getUser } from "./services/Auth";
import { checkIsAdmin } from "./services/admin"; // Import admin check

const App = () => {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function fetchUserAndRole() {
      try {
        const u = await getUser();
        setUser(u);
        if (u?.email) {
          const admin = await checkIsAdmin(u.email);
          setIsAdmin(admin);
        } else {
          setIsAdmin(false);
        }
      } catch {
        setUser(null);
        setIsAdmin(false);
      }
    }
    fetchUserAndRole();
  }, []);

  return (
    <div>
      {/* Pass isAdmin prop here! */}
      <Navigation user={user} setUser={setUser} isAdmin={isAdmin} />
      <AppRouter user={user} setUser={setUser} />
    </div>
  );
};

export default App;
