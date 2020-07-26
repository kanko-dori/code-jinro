import React from 'react';

import {
  AppBar,
  Toolbar,
  Typography
} from "@material-ui/core";

import "./Header.css";

function Header() {
  return (
    <AppBar>
      <Toolbar>
        <Typography variant="h6">
          <span className="title">Code JINRO</span>
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
