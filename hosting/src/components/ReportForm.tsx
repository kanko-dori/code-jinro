import React from 'react';

import {
  TextField,
  Button,
  Card,
  Typography,
  CardContent,
  CardActions,
} from '@material-ui/core';
import Spacer from './Spacer';
import classes from './ReportForm.module.css';

const ReportForm: React.FC = () => (
  <Card className={classes.container}>
    <form>
      <CardContent>
        <Typography variant="h5">バグ報告</Typography>
        <TextField label="Message" variant="outlined" multiline fullWidth rows={3} />
      </CardContent>
      <CardActions>
        <Spacer />
        <Button color="inherit" type="submit">
          Send
        </Button>
      </CardActions>
    </form>
  </Card>
);

export default ReportForm;
