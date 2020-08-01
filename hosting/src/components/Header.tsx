import React from 'react';

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Share } from '@material-ui/icons';
import Spacer from './Spacer';
import { copyText } from '../utils/util';
import classes from './Header.module.css';

interface State {
  copySnackOpen: boolean;
  snackSeverity: 'success' | 'error';
  copyResultMsg: 'Copied URL!' | 'Failed copy.';
}

class Header extends React.Component<unknown, State> {
  constructor(props: unknown) {
    super(props);

    this.onShareClick = this.onShareClick.bind(this);
    this.onSnackClose = this.onSnackClose.bind(this);

    this.state = {
      copySnackOpen: false,
      snackSeverity: 'success',
      copyResultMsg: 'Copied URL!',
    };
  }

  onShareClick(): void {
    try {
      copyText(window.location.origin + window.location.pathname);
      this.setState({
        copySnackOpen: true,
        snackSeverity: 'success',
      });
    } catch (e) {
      this.setState({
        copySnackOpen: true,
        snackSeverity: 'error',
      });
    }
  }

  onSnackClose(): void {
    this.setState({
      copySnackOpen: false,
    });
  }

  render(): JSX.Element {
    return (
      <AppBar>
        <Toolbar variant="dense">
          <Typography variant="h6">
            <span className={classes.title}>Code JINRO</span>
          </Typography>
          <Spacer />
          <IconButton onClick={this.onShareClick}>
            <Share />
          </IconButton>
        </Toolbar>

        <Snackbar
          open={this.state.copySnackOpen}
          autoHideDuration={2000}
          onClose={this.onSnackClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert onClose={this.onSnackClose} severity={this.state.snackSeverity}>
            {this.state.copyResultMsg}
          </Alert>
        </Snackbar>
      </AppBar>
    );
  }
}

export default Header;
