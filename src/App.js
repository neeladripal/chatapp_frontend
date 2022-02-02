import Main from "./components/Main";
import User from "./components/User";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const newUser = {
    name: "Default",
    about: "ok",
    profilePic: "profile/avatar.png",
  };
  const [user, setUser] = useState(newUser);
  return <div className="App">{user ? <Main user={user} /> : <User />}</div>;
}

export default App;
