import React from 'react';

import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider
} from "@material-ui/core";
import Header from "./components/Header";
import Home from "./components/Home";
import Room from "./components/Room";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import './App.css';

const theme = responsiveFontSizes(createMuiTheme({
  palette: {
    primary: {
      light: '#c8e3e9',
      main: '#86b3e0',
      dark: '6f94cd',
    }
  }
}));

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header></Header>
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route path="/room/:id" component={Room}></Route>
          <Redirect to="/"></Redirect>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
