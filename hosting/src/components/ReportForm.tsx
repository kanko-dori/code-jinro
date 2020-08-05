import React from 'react';

import { TextField, Button, Card, Typography } from '@material-ui/core';

const ReportForm: React.FC = () => (
  <Card>
    <form>
      <Typography variant="h4">バグ報告</Typography>
      <TextField label="Message" variant="outlined" multiline />
      <Button
        variant="contained"
        color="primary"
        type="submit"
      >
        Send
      </Button>
    </form>
  </Card>
);

export default ReportForm;
