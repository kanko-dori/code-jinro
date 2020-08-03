import React from 'react';

import { Toolbar } from '@material-ui/core';
import Rule from '../components/Rule';
import CreateRoom from '../components/CreateRoom';
import BugForm from '../components/BugForm';

class Home extends React.Component {
  render(): JSX.Element {
    return (
      <div>
        <Toolbar />
        <Rule />
        <CreateRoom />
        <BugForm />
        <a href="https://github.com/kanko-dori/code-jinro">GitHub</a>
      </div>
    )
  };
}

export default Home;
