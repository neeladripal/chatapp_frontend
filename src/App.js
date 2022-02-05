import React, { Component } from "react";
import Main from "./components/Main";
import User from "./components/User";
import auth from "./services/authService";
import "./App.css";

class App extends Component {
  state = { user: null };

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return <div className="App">{user ? <Main user={user} /> : <User />}</div>;
  }
}

export default App;
