import React, { useState, useEffect } from "react";
import Main from "./components/Main";
import User from "./components/User";
import auth from "./services/authService";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const newUser = auth.getCurrentUser();
    if (newUser) setUser(newUser);
  }, []);
  return <div className="App">{user ? <Main user={user} /> : <User />}</div>;
}

export default App;
