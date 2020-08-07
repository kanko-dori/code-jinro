import React from 'react';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

type AlertType = 'error' | 'warning' | 'info' | 'success';

interface Props {
  open: boolean;
  onClose: () => void;
  autoHideDuration?: number | null;
  severnity: AlertType;
  children: React.ReactNode;
  anchorOrigin?: { horizontal: 'center' | 'left' | 'right', vertical: 'bottom' | 'top' },
  color?: AlertType | undefined;
  variant?: 'filled' | 'outlined' | 'standard';
}

const Notification: React.FC<Props> = (props: Props) => (
  <Snackbar
    open={props.open}
    onClose={props.onClose}
    autoHideDuration={props.autoHideDuration}
    anchorOrigin={props.anchorOrigin}
  >
    <Alert
      onClose={props.onClose}
      severity={props.severnity}
      color={props.color}
      variant={props.variant}
    >
      {props.children}
    </Alert>
  </Snackbar>
);

Notification.defaultProps = {
  autoHideDuration: null,
  anchorOrigin: { vertical: 'bottom', horizontal: 'center' },
  color: undefined,
  variant: 'standard',
};

export default Notification;
