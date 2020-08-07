import React from 'react';

import { Toolbar, Link, Container } from '@material-ui/core';
import Rule from '../components/Rule';
import CreateRoom from '../components/CreateRoom';
import ReportForm from '../components/ReportForm';

const Home: React.FC = () => (
  <div>
    <Toolbar />
    <Container>
      <Rule />
      <CreateRoom />
      <ReportForm />
      <Link href="https://github.com/kanko-dori/code-jinro">GitHub</Link>
    </Container>
  </div>
);

export default Home;
