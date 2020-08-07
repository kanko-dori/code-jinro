import React from 'react';
import { Button } from '@material-ui/core';

import classes from './Stats.module.css';

interface Props {
  onReady: () => void
}

const Stats: React.FC<Props> = (props: Props) => (
  <div className={classes.container}>
    <Button
      fullWidth
      variant="contained"
      color="primary"
      size="large"
      onClick={props.onReady}
    >
      Ready
    </Button>
  </div>
);
export default Stats;
