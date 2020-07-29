import React from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';

import classes from './Header.module.css';

const Header: React.FC = () => (
  <AppBar>
    <Toolbar variant="dense">
      <Typography variant="h6">
        <span className={classes.title}>Code JINRO</span>
      </Typography>
    </Toolbar>
  </AppBar>
);

export default Header;
