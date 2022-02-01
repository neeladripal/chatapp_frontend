import Main from "./components/Main";
import User from "./components/User";
import "./App.css";
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  return <div className="App">{loggedIn ? <Main /> : <User />}</div>;
}

export default App;
