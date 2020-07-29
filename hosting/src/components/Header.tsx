import React from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  MenuItem,
  IconButton,
} from '@material-ui/core';
import { Share } from '@material-ui/icons';
import Spacer from './Spacer';
import classes from './Header.module.css';

const Header: React.FC = () => (
  <AppBar>
    <Toolbar variant="dense">
      <Typography variant="h6">
        <span className={classes.title}>Code JINRO</span>
      </Typography>
      <Spacer />
      <MenuItem>
        <IconButton>
          <Share />
        </IconButton>
      </MenuItem>
    </Toolbar>
  </AppBar>
);

export default Header;
