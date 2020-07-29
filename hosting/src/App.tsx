import React from 'react';

import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Room from './pages/Room';

import './App.css';

const theme = responsiveFontSizes(createMuiTheme({
  palette: {
    primary: {
      light: '#c8e3e9',
      main: '#86b3e0',
      dark: '#6f94cd',
    },
  },
}));

const App: React.FC = () => (
  <ThemeProvider theme={theme}>
    <Router>
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/room/:id" component={Room} />
        <Redirect to="/" />
      </Switch>
    </Router>
  </ThemeProvider>
);

export default App;
