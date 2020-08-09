import React from 'react';
import {
  Button, Card, CardContent, Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Room } from '../types/types';
import Spacer from './Spacer';

import classes from './CreateRoom.module.css';

type response = {
  room: Room,
  id: string
}

const CreateRoom: React.FC = () => {
  const history = useHistory();

  const handleClick = (e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    fetch(`https://us-central1-code-jinro.cloudfunctions.net/api/room/${process.env.NODE_ENV}`, { method: 'PUT' })
      .then((response) => response.json())
      .then((data: response) => {
        console.log(data);
        history.push(`/room/${data.id}`);
      }).catch((err) => {
        console.log('fetch failed: ', err);
      });
  };

  return (
    <Card>
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
