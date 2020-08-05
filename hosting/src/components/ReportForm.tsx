import React from 'react';

import { TextField, Button, Card, Typography, CardContent, CardActions } from '@material-ui/core';

const ReportForm: React.FC = () => (
  <Card>
    <form>
      <CardContent>
        <Typography variant="h5">バグ報告</Typography>
        <TextField label="Message" variant="outlined" multiline />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          type="submit"
        >
          Send
      </Button>
      </CardActions>
    </form>
  </Card>
);

export default ReportForm;
