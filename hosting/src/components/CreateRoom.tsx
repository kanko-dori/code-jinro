import React from 'react';
import {
  Button, Card, CardContent, Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Spacer from './Spacer';
import { functions } from '../utils/firebase';

import classes from './CreateRoom.module.css';

const CreateRoom: React.FC = () => {
  const history = useHistory();

  const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const createRoom = functions.httpsCallable('room');
    createRoom({
      stage: process.env.REACT_APP_STAGE,
    })
      .then((res: firebase.functions.HttpsCallableResult) => {
        console.log(res);
        history.push(`/room/${res.data.roomId}`);
      }).catch((err) => {
        console.log('fetch failed:', err);
      });
  };

  return (
    <Card className={classes.container}>
      <CardContent>
        <Typography variant="h4">ゲーム開始</Typography>
        <div className={classes.flex}>
          <Spacer />
          <Button variant="outlined" size="large" color="inherit" onClick={handleClick}>ルーム作成</Button>
          <Spacer />
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateRoom;
