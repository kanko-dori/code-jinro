import React from 'react';

import { Toolbar } from '@material-ui/core';
import Rule from '../components/Rule'

class Home extends React.Component {
  render(): JSX.Element {
    return (
      <div>
        <Toolbar />
        <Rule />
      </div>
    )
  };
}

export default Home;
