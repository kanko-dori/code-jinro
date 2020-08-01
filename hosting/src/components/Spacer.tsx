import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({ grow: { flexGrow: 1 } });

const Spacer: React.FC = () => {
  const { grow } = useStyles();
  return (
    <div className={grow} />
  );
};
export default Spacer;
