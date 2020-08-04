import React from 'react';

import { TextField, Button, Card } from '@material-ui/core';

const ReportForm: React.FC = () => (
  <Card>
    <form>
      <h3>バグ報告</h3>
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
