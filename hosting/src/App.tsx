import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';

import Home from "./components/Home";
import Room from "./components/Room";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/rooms/:id" component={Room}></Route>
        <Redirect to="/"></Redirect>
      </Switch>
    </Router>
  );
}

export default App;
