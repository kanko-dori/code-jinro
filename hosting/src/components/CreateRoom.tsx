import React from 'react';

import { Button, Paper, Typography } from '@material-ui/core';

const CreateRoom: React.FC = () => (
  <Paper>
    <Typography variant="h5">ゲーム開始</Typography>
    <Button variant="contained">CreateRoom</Button>
  </Paper>
);

export default CreateRoom;
