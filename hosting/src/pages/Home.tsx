import React from 'react';

import { Toolbar, Link } from '@material-ui/core';
import Rule from '../components/Rule';
import CreateRoom from '../components/CreateRoom';
import BugForm from '../components/BugForm';

const Home: React.FC = () => (
  <div>
    <Toolbar />
    <Rule />
    <CreateRoom />
    <BugForm />
    <Link href="https://github.com/kanko-dori/code-jinro">GitHub</Link>
  </div>
);

export default Home;
