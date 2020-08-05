import React from 'react';

import { Button, Paper, Typography } from '@material-ui/core';

const CreateRoom: React.FC = () => (
  <Paper>
    <Typography variant="h4">ゲーム開始</Typography>
    <Button variant="contained">CreateRoom</Button>
  </Paper>
);

export default CreateRoom;
