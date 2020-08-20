import React, { useState } from 'react';

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

const ReportForm: React.FC = () => {
  const [formText, setFormText] = useState<string>('');

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormText(e.target.value);
  };

  const sendReport = () => {
    console.log(formText);
    fetch(`/api/${process.env.NODE_ENV}/report`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        content: formText,
      }),
    }).then((res) => {
      if (res.ok) return;
      throw new Error(res.statusText);
    }).catch((err) => {
      console.error(err);
    });
  };

  return (
    <Card className={classes.container}>
      <form>
        <CardContent>
          <Typography variant="h5">バグ報告</Typography>
          <TextField label="Message" variant="outlined" multiline fullWidth rows={3} onChange={(e) => handleFormChange(e)} />
        </CardContent>
        <CardActions>
          <Spacer />
          <Button color="inherit" type="submit" onClick={() => sendReport()}>
            Send
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default ReportForm;
